import EditJobContainer from "@/container/edit-job";
import React from "react";
interface EditProps {
  params: { id: string };
}
const Page = ({ params }: EditProps) => {
  return <EditJobContainer id={params.id} />;
};

export default Page;
