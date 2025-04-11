"use client";
import React, { useContext, useEffect, useState } from "react";
import DropDownInput from "@/component/input/dropDown";
import DateInput from "@/component/input/dateInput";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import Input from "@/component/input/inputText";
import { JobErrorType } from "@/types/JOB/JobErrorTypes";
import { JobType } from "@/types/JOB/JobTypes";
interface EditJobContainerProps {
  id: string;
}
const EditJobContainer = ({ id }: EditJobContainerProps) => {
  const { updateJobApi, getJobByIdApi } = useContext(
    AdminContext
  ) as AdminContextType;
  const [changedData, setChangedData] = useState({});

  const [formData, setFormData] = useState<JobType>({
    title: "",
    company: "",
    status: "",
    appliedSite: "",
    jobType: "",
    date: "",
    salary: "",
    location: "",
    contactInfo: "",
  });
  const statusOptions = [
    "Applied",
    "Viewed",
    "Interview",
    "Offer",
    "Rejected",
    "Completed",
  ];
  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
    "Freelance",
  ];
  const [errors, setErrors] = useState<JobErrorType>({
    title_error: "",
    company_error: "",
    status_error: "",
    jobType_error: "",
    date_error: "",
    salary_error: "",
    applied_site_error: "",
    location_site_error: "",
  });
  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      title_error: "",
      company_error: "",
      url_error: "",
      status_error: "",
      jobType_error: "",
      date_error: "",
      salary_error: "",
      applied_site_error: "",
      location_site_error: "",
    };

    if (!formData.title.trim()) {
      newErrors.title_error = "Title is required";
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company_error = "Company is required";
      isValid = false;
    }

    if (!formData.status.trim()) {
      newErrors.status_error = "Status is required";
      isValid = false;
    }

    if (!formData.jobType.trim()) {
      newErrors.jobType_error = "Job type is required";
      isValid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date_error = "Date is required";
      isValid = false;
    }
    if (!formData.appliedSite.trim()) {
      newErrors.applied_site_error = "Enter applied site";
      isValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location_site_error = "Enter Location";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const updatedData = () => {
    if (Object.keys(changedData).length === 0) {
      alert("No Data was updated");
      return false;
    }
    return true;
  };
  const handleUpdateChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setChangedData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm() && updatedData()) {
      updateJobApi(id, changedData);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      const jobData = await getJobByIdApi(id);

      setFormData(jobData);
      // console.log(jobData);
    };

    fetchJob();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="page-container">
      <div className="addjob-container">
        <h2>Update Job</h2>
        <form>
          <div className="form-grid">
            <Input
              labelName="Job Title"
              value={formData.title}
              onChange={(value) => handleUpdateChange("title", value)}
              type="text"
              arialLabel="e.g. Backend Developer"
              error={errors.title_error}
            />
            <Input
              labelName="Company"
              value={formData.company ?? ""}
              onChange={(value) => handleUpdateChange("company", value)}
              type="text"
              arialLabel="e.g. google.com"
              error={errors.company_error}
            />
            <DropDownInput
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(value) => handleUpdateChange("status", value)}
            />
            <DropDownInput
              label="Job Type"
              options={jobTypeOptions}
              value={formData.jobType}
              onChange={(value) => handleUpdateChange("jobType", value)}
            />
            <DateInput
              labelName="Date Applied*"
              value={
                formData.date
                  ? new Date(formData.date).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(value) => handleUpdateChange("date", value)}
              error={errors.date_error}
            />
            <Input
              labelName="Applied Site"
              value={formData.appliedSite ?? ""}
              onChange={(value) => handleUpdateChange("appliedSite", value)}
              type="text"
              arialLabel="e.g. LinkedIn"
              error={errors.applied_site_error}
            />
            <Input
              labelName="Location*"
              value={formData.location ?? ""}
              onChange={(value) => handleUpdateChange("location", value)}
              type="text"
              arialLabel="e.g.remote"
            />
            <Input
              labelName="Salary (Optional)"
              value={formData.salary ?? ""}
              onChange={(value) => handleUpdateChange("salary", value)}
              type="text"
              arialLabel="e.g. $80,000"
            />
            <Input
              labelName="Contact Info (Optional)"
              value={formData.contactInfo ?? ""}
              onChange={(value) => handleUpdateChange("contactInfo", value)}
              type="text"
              arialLabel="e.g. hr@example.com"
            />
          </div>

          <div className="addjob-btn-container">
            <button className="job-btn cancel-btn">Clear</button>
            <button
              className={`job-btn save-btn ${
                Object.keys(changedData).length === 0 && "inactive"
              }`}
              onClick={(e) => handleSave(e)}
              disabled={!Object.keys(changedData).length}
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobContainer;
