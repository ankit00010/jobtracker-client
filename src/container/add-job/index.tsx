"use client";
import React, { useContext, useState } from "react";
import DropDownInput from "@/component/input/dropDown";
import DateInput from "@/component/input/dateInput";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import Input from "@/component/input/inputText";
import { JobErrorType } from "@/types/JOB/JobErrorTypes";

const AddJobContainer = () => {
  const { jobData, handleUserJobChange, addJOBS } = useContext(
    AdminContext
  ) as AdminContextType;

  const statusOptions = [
    "Applied",
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
    contact_info_error: "",
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

    if (!jobData.title.trim()) {
      newErrors.title_error = "Title is required";
      isValid = false;
    }

    if (!jobData.company.trim()) {
      newErrors.company_error = "Company is required";
      isValid = false;
    }

    if (!jobData.status.trim()) {
      newErrors.status_error = "Status is required";
      isValid = false;
    }

    if (!jobData.jobType.trim()) {
      newErrors.jobType_error = "Job type is required";
      isValid = false;
    }

    if (!jobData.date.trim()) {
      newErrors.date_error = "Date is required";
      isValid = false;
    }
    if (!jobData.appliedSite.trim()) {
      newErrors.applied_site_error = "Enter applied site";
      isValid = false;
    }
    if (!jobData.location.trim()) {
      newErrors.location_site_error = "Enter Location";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Going to add jobs");
      
      addJOBS();
    }
  };
  return (
    <div className="page-container">
      <div className="addjob-container">
        <h2>Add New Job</h2>
    <form>
        <div className="form-grid">
          <Input
            labelName="Job Title*"
            value={jobData.title}
            onChange={(value) => handleUserJobChange("title", value)}
            type="text"
            arialLabel="e.g. Backend Developer"
            error={errors.title_error}
          />
          <Input
            labelName="Company*"
            value={jobData.company ?? ""}
            onChange={(value) => handleUserJobChange("company", value)}
            type="text"
            arialLabel="e.g. google.com"
            error={errors.company_error}
          />
          <DropDownInput
            label="Status*"
            options={statusOptions}
            value={jobData.status}
            onChange={(value) => handleUserJobChange("status", value)}
          />
          <DropDownInput
            label="Job Type*"
            options={jobTypeOptions}
            value={jobData.jobType}
            onChange={(value) => handleUserJobChange("jobType", value)}
          />
          <DateInput
            labelName="Date Applied*"
            value={
              jobData.date
                ? new Date(jobData.date).toISOString().slice(0, 16)
                : ""
            }
            onChange={(value) => handleUserJobChange("date", value)}
            error={errors.date_error}
          />
          <Input
            labelName="Applied Site*"
            value={jobData.appliedSite ?? ""}
            onChange={(value) => handleUserJobChange("appliedSite", value)}
            type="text"
            arialLabel="e.g. LinkedIn"
            error={errors.applied_site_error}
          />
          <Input
            labelName="Location*"
            value={jobData.location ?? ""}
            onChange={(value) => handleUserJobChange("location", value)}
            type="text"
            arialLabel="e.g.remote"
          />
          <Input
            labelName="Salary (Optional)"
            value={jobData.salary ?? ""}
            onChange={(value) => handleUserJobChange("salary", value)}
            type="text"
            arialLabel="e.g. $80,000"
          />
          <Input
            labelName="Contact Info (Optional)"
            value={jobData.contactInfo ?? ""}
            onChange={(value) => handleUserJobChange("contactInfo", value)}
            type="text"
            arialLabel="e.g. hr@example.com"
          />
        </div>

        <div className="addjob-btn-container">
          <button className="job-btn cancel-btn">Cancel</button>
          <button type="submit" className="job-btn save-btn" onClick={(e)=>handleSave(e)}>
            Save Job
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobContainer;
