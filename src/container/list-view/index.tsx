"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import "./style.css";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { AiOutlineFileSearch } from "react-icons/ai";
import { ClimbingBoxLoader } from "react-spinners";
import { IoIosEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import PopUp from "@/component/pop-up";
import { BiEdit } from "react-icons/bi";

const ListViewContainer = () => {
  const { jobList, loading, deleteJobApi,getJobListApi,currentPage,filter } = useContext(
    AdminContext
  ) as AdminContextType;

  const router = useRouter();
  const header = [
    "Job Title",
    "Company",
    "Status",
    "Type",
    "Applied Site",
    "Applied Date",
    "Actions",
  ];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [popUp, setPopUp] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string | null>(null);

  const handleDelete = (value: string) => {
    setDeleteID(value);
    setPopUp(true);
    setActiveMenuId(null);
  };

  const handlePopupStatus = (confirm: boolean) => {
    console.log("Deleted ID", deleteID);
    console.log("Cofirm =>", confirm);

    if (deleteID !== null && confirm) {
      console.log("Entered");

      //Api Call
      deleteJobApi(deleteID);

      //Resetting the states
      setPopUp(false);
      setDeleteID(null);
    }
    console.log("Canceled");
    setActiveMenuId(null);
    setPopUp(false);
    setDeleteID(null);
  };

  useEffect(() => {
    getJobListApi();
    // eslint-disable-next-line
  }, [currentPage, filter]);
  return (
    <div className="table-container">
      <table className="job-table">
        <thead>
          <tr>
            {header.map((data, index) => (
              <th key={index} className="table-header">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>
                <div className="table-loader-wrapper">
                  <ClimbingBoxLoader color="#007bff" size={15} />
                </div>
              </td>
            </tr>
          ) : jobList.length > 0 ? (
            jobList.map((data) => (
              <tr key={data.id} className="table-row">
                <td>{data.title}</td>
                <td>{data.company}</td>
                <td>
                  <span className={`status-badge status-${data.status}`}>
                    {data.status}
                  </span>
                </td>
                <td>{data.jobType}</td>
                <td>{data.appliedSite}</td>
                <td>{formatDate(data.date)}</td>
                <td>
                  {activeMenuId === data.id && (
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item view-action"
                        onClick={() => router.push(`/job/${data.id}`)}
                      >
                        <IoIosEye style={{ marginRight: "8px" }} />
                        <span>View</span>
                      </button>
                      <button
                        className="dropdown-item edit-action"
                        onClick={() => router.push(`/edit-job/${data.id}`)}
                      >
                        <BiEdit style={{ marginRight: "8px" }} />
                        <span>Edit</span>
                      </button>
                      <button
                        className="dropdown-item delete-action"
                        onClick={() => handleDelete(data.id)}
                      >
                        <MdDelete style={{ marginRight: "8px" }} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                  <button
                    className="action-button"
                    onClick={() =>
                      setActiveMenuId((prev) =>
                        prev === data.id ? null : data.id
                      )
                    }
                  >
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <div className={`no-data-content ${!loading ? "show" : ""}`}>
                  <AiOutlineFileSearch size={48} />
                  <span>No Data Found</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

export default ListViewContainer;
