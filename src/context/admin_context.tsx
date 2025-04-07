"use client";
import { fetchService } from "@/services/fetch_services";
import { FilterType } from "@/types/JOB/FilterType";
import { JobListType } from "@/types/JOB/JobListType";
import { JobType } from "@/types/JOB/JobTypes";
import { UserType } from "@/types/UserTypes";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useState } from "react";

export interface AdminContextType {
  loginUser: () => Promise<void>;
  handleUserChange: (key: string, value: string) => void;
  user: UserType;
  registerUser: () => Promise<void>;

  //JOB
  jobData: JobType;
  handleUserJobChange: (key: string, value: string) => void;

  //ADD JOB API
  addJOBS: () => Promise<void>;

  //Filter Logic
  filter: FilterType;
  handleFilterChange: (key: string, value: string) => void;
  //Pagination
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  jobList: JobListType[];
  loading: boolean;
  resetFilters: () => void;

  //Delete APi
  deleteJobApi: (id: string) => Promise<void>;

  //Get Job Specific
  getJobByIdApi: (id: string) => Promise<JobType>;

  //Update Api
  updateJobApi: (id: string, data: Partial<JobType>) => Promise<void>;

  //search Api
  searchApi: (
    searchTerm: string
  ) => Promise<{ id: string; searchTerm: string }[]>;

  //isUserLogin
  isUserLogin: () => Promise<boolean>;

  //get job list api
  getJobListApi: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });

  const handleUserChange = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //Job

  const [jobData, setJobData] = useState<JobType>({
    title: "",
    company: "",
    appliedSite: "",
    salary: "",
    status: "Applied",
    jobType: "Full-time",
    date: "",
    location: "",
    contactInfo: "",
  });

  //Search's UseState

  const handleUserJobChange = (key: string, value: string) => {
    setJobData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const registerUser = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/auth/register",
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    const responseData = await response.data;

    if (response.code === 200) {
      //reset it
      setUser({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
      alert(responseData.message);
      localStorage.setItem("token", responseData.token);
      return;
    } else {
      alert(responseData.message);
      return;
    }
  };
  const loginUser = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/auth/login",
      data: {
        email: user.email,
        password: user.password,
      },
    });

    const responseData = await response.data;

    console.log(responseData);

    if (response.code === 200) {
      localStorage.setItem("token", responseData.token);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      router.push("/");
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  };

  //JOBS APIS

  //ADD JOBS

  //Get Job List
  const [filter, setFilter] = useState<FilterType>({
    statusFilter: "",
    jobTypeFilter: "",
  });

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const handleFilterChange = (key: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [jobList, setJobList] = useState<JobListType[]>([]);

  const getJobListApi = async () => {
    setLoading(true);
    const response = await fetchService({
      method: "GET",
      endpoint: `api/users/get-job-list?page=${currentPage}&limit=6&status=${
        filter.statusFilter || ""
      }&jobType=${filter.jobTypeFilter || ""}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.code === 200) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      const responseData = await response.data;
      setTotalPages(responseData.getList.totalPages);
      setJobList(responseData.getList.jobs);
    } else if (response.code === 403) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      router.push("/login");
      alert("Token expired");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setTotalPages(1);
      setJobList([]);

      console.log("Failed To retreive Data");
    }
  };

  const resetFilters = () => {
    if (filter.statusFilter || filter.jobTypeFilter) {
      setFilter({
        statusFilter: "",
        jobTypeFilter: "",
      });
    }
  };

  const addJOBS = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: "api/users/add-job",
      data: jobData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(await response.data);

    if (response.code === 200) {
      const responseData = await response.data;
      setJobData({
        title: "",
        company: "",
        appliedSite: "",
        salary: "",
        status: "Applied",
        jobType: "Full-time",
        date: "",
        location: "",
        contactInfo: "",
      });
      alert("Job added successfully!");
      getJobListApi();

      console.log(responseData);
    } else {
      console.log("Failed to Add JOB");
    }
  };

  const updateJobApi = async (id: string, data: Partial<JobType>) => {
    // console.log("Checking",data);

    const response = await fetchService({
      method: "PATCH",
      endpoint: `api/users/update-job/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    });

    if (response.code === 200) {
      alert("Job Updated Successfully!");
      getJobListApi();
    } else if (response.code === 403) {
      localStorage.clear();
      router.push("/login");
      alert("Token Expired");
    } else {
      console.log("Failed to Update!");
    }
  };

  const deleteJobApi = async (id: string) => {
    const response = await fetchService({
      method: "DELETE",
      endpoint: `api/users/delete-job/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.code === 200) {
      alert("Job Deleted Successfully!");
      getJobListApi();
    } else if (response.code === 403) {
      localStorage.clear();
      router.push("/login");
      alert("Token Expired");
    } else {
      console.log("Failed to Delete!");
    }
  };

  const getJobByIdApi = async (id: string) => {
    const response = await fetchService({
      method: "GET",
      endpoint: `api/users/get-job-list/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.code === 200) {
      const responseData = await response.data;

      console.log(responseData);
      return responseData.jobData;
    } else {
      alert("/Something went wrong while fetching the data");
      router.push("/");
      console.log("Failed to retrieve Data!");
    }
  };

  const searchApi = async (keyword: string) => {
    console.log("Called How Many Times");

    const response = await fetchService({
      method: "GET",
      endpoint: `api/users/search?searchTerm=${keyword}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.code === 200) {
      const responseData = await response.data;
      const result = responseData.data.map(
        (data: { id: string; title: string; company: string }) => ({
          id: data.id,
          searchTerm: `${data.title} - ${data.company}`,
        })
      );

      console.log(result);
      return result;
    } else {
      alert("/Something went wrong while fetching the data");
      router.push("/");
      console.log("Failed to retrieve Data!");
    }
  };

  //Is User Already Login

  const isUserLogin = async () => {
    const response = await fetchService({
      method: "GET",
      endpoint: "api/users/is-user-login",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responseData = await response.data;

    if (response.code === 200) {
      console.log(responseData);

      return true;
    } else {
      console.log(responseData);

      return false;
    }
  };
  const admin_context_value = {
    loginUser,
    handleUserChange,
    user,
    registerUser,

    //JOB
    jobData,
    handleUserJobChange,

    //ADD JOB API
    addJOBS,

    //Filter
    filter,
    handleFilterChange,

    //Pagination

    currentPage,
    setCurrentPage,
    totalPages,
    jobList,

    //Loading State
    loading,
    //ResetFilters
    resetFilters,

    //Delete Api
    deleteJobApi,
    getJobByIdApi,

    //UPdate Api.
    updateJobApi,

    //Search
    searchApi,

    //User Login Check
    isUserLogin,

    //getJoblist
    getJobListApi,
  };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
