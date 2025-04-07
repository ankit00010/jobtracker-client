import ViewJobContainer from "@/container/view-job";
import React from "react";

interface ViewJobProps {
  params: { id: string };
}

const ViewJob = ({params}:ViewJobProps) => {
    return <ViewJobContainer id={params.id} />; 
};

export default ViewJob;
