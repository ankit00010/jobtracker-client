"use client";
import React, { useContext, useEffect, useState } from "react";
interface ViewJobContainerProps {
  id: string;
}
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";

import "./style.css";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import PopUp from "@/component/pop-up";
import { useRouter } from "next/navigation";
import { JobType } from "@/types/JOB/JobTypes";
const ViewJobContainer = ({ id }: ViewJobContainerProps) => {
  const { getJobByIdApi, deleteJobApi } = useContext(
    AdminContext
  ) as AdminContextType;

  const router = useRouter();
  const [jobData, setJobData] = useState<JobType>({
    title: "",
    company: "",
    status: "",
    appliedSite: "",
    jobType: "",
    date: "",
    salary: "",
    location:"",
    contactInfo:""
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const infoData = [
    {
      icon: <FaRegCalendar />,
      title: "Applied Date",
      iconColor: "#2563EB",
      iconBackgroundColor: "#DBEAFE",
      data: formatDate(jobData.date),
    },
    {
      icon: <IoBag />,
      title: "Job Type",
      iconColor: "#16A34A",
      iconBackgroundColor: "#DCFCE7",
      data: jobData.jobType,
    },
    {
      icon: <BsGlobe />,
      title: "Applied Through",
      iconColor: "#9333EA",
      iconBackgroundColor: "#F3E8FF",
      data: jobData.appliedSite,
    },
    {
      icon: <FiCreditCard />,
      title: "Expected Salary",
      iconColor: "#CA8A04",
      iconBackgroundColor: "#FEF9C3",
      data: jobData.salary ? jobData.salary : "-",
    },
  ];

  useEffect(() => {
    const fetchJob = async () => {
      const jobData = await getJobByIdApi(id);

      setJobData(jobData);
      console.log(jobData);
    };

    fetchJob();
    // eslint-disable-next-line
  }, [id]);
  const [popUp, setPopUp] = useState<boolean>(false);

  const handleDelete = () => {
    setPopUp(true);
  };

  const handlePopupStatus = (confirm: boolean) => {
    console.log("Cofirm =>", confirm);

    if (id !== null && confirm) {
      console.log("Entered");

      //Api Call
      deleteJobApi(id);
      router.push("/");
      //Resetting the states
      setPopUp(false);
    }
    console.log("Canceled");
    setPopUp(false);
  };

  return (
    <div className="viewjob-container">
      {/* Header Section */}
      <section className="viewjob-header">
        <div className="title-section">
          <span className="company-title">{jobData.title}</span>
          <span className="company-name">{jobData.company}</span>
        </div>
        <div className="actions-section">
          <div className="edit-section">
            <button onClick={() => router.push(`/edit-job/${id}`)}>
              <span>
                <FaRegEdit />
              </span>{" "}
              Edit
            </button>
          </div>

          <div className="delete-section">
            <button onClick={() => handleDelete()}>
              <span>
                <RiDeleteBinLine />
              </span>{" "}
              Delete
            </button>
          </div>
        </div>
      </section>
      <hr />

      {/* Info Section */}
      <div className="info-section">
        {infoData.map((data, index) => (
          <div className="info-first" key={index}>
            <span
              className="info-first-icon"
              style={{
                backgroundColor: `${data.iconBackgroundColor}`,
                color: `${data.iconColor}`,
              }}
            >
              {data.icon}
            </span>
            <div className="info-based-data">
              <span className="info-based-title">{data.title}</span>
              <span className="info-based-subtitle">{data.data}</span>
            </div>
          </div>
        ))}

        <div className="job-status">
          <span>Status</span>
          <span className={`job-status-data status-${jobData.status}`}>
            {jobData.status}
          </span>
        </div>

        <div className="context">
          <span className="context-title">Location</span>
          <span className="context-description">{jobData.location}</span>
        </div>

        <div className="context">
          <span className="context-title">Contact Information</span>
          <span className="context-description">{jobData.contactInfo}</span>
        </div>
      </div>
      <div>
        {popUp && (
          <div className="pop-up">
            <PopUp
              handleStatus={handlePopupStatus}
              message="Are you sure you want to delete?"
              action1="Yes"
              action2="No"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJobContainer;
