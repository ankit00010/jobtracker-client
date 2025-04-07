"use client";
import React, { useContext, useState, useRef } from "react";
import "./style.css";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { AdminContext, AdminContextType } from "@/context/admin_context";
const Header: React.FC = () => {
  const { searchApi } = useContext(AdminContext) as AdminContextType;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<
    { id: string; searchTerm: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const pathName = usePathname();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear existing debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Debounce API call
    debounceTimeout.current = setTimeout(async () => {
      if (query.trim() === "") {
        setFilteredJobs([]);
      } else {
        try {
          const results = await searchApi(query);
          setFilteredJobs(results);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Search API error:", error);
        }
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredJobs.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < filteredJobs.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        const selectedJob = filteredJobs[selectedIndex];
        router.push(`/job/${selectedJob.id}`);
        setFilteredJobs([]);
        setSearchQuery("");
      }
    }
  };

  const handleSelect = (job: { id: string; searchTerm: string }) => {
    router.push(`/job/${job.id}`);
    setSearchQuery("");
    setFilteredJobs([]);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {pathName !== "/login" && pathName !== "/register" && (
        <div className="header">
          <h2 className="job-logo" onClick={() => router.push("/")}>
            Job Tracker
          </h2>
          <div className="search-container">
            <input
              className="search"
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {filteredJobs.length > 0 && (
              <ul className="search-dropdown">
                {filteredJobs.map((job, index) => (
                  <li
                    key={job.id}
                    className={index === selectedIndex ? "selected" : ""}
                    onClick={() => handleSelect(job)}
                  >
                    {job.searchTerm}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <RxCross1 size={24} color="white" />
            ) : (
              <IoIosMenu size={24} color="white" />
            )}
          </div>
          <div className={`button-group ${isMenuOpen ? "open" : ""}`}>
            <button
              className="list-view-btn btn"
              onClick={() => router.push("/")}
            >
              List View
            </button>
            <button
              className="add-job-btn btn"
              onClick={() => router.push("/add-job")}
            >
              + Add Job
            </button>
            <button className="logout-btn btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
