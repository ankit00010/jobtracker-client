"use client";
import React, { useContext } from "react";
import "./style.css";
import DropDownInput from "@/component/input/dropDown";
import Pagination from "@/component/pagination";
import { AdminContext, AdminContextType } from "@/context/admin_context";

const HomeFooter = () => {
  const {
    filter,
    handleFilterChange,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters, // Now accessed directly from context
  } = useContext(AdminContext) as AdminContextType;

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

  return (
    <div className="home-footer-container">
      <div className="home-footer-filters">
        <DropDownInput
          label="Filter By Status"
          options={statusOptions}
          value={filter.statusFilter}
          onChange={(value) => handleFilterChange("statusFilter", value)}
          style="filter-dropdown"
          isLabel={false}
        />

        <DropDownInput
          label="Filter By JobType"
          options={jobTypeOptions}
          value={filter.jobTypeFilter}
          onChange={(value) => handleFilterChange("jobTypeFilter", value)}
          style="filter-dropdown"
          isLabel={false}
        />
        <div className="clear-filters-container">
          <button onClick={resetFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default HomeFooter;
