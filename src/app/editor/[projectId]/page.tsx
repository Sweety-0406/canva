
"use client";

import { Editor } from "@/features/editor/components/editor";
import {  TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetProject } from "@/features/editor/hooks/useGetProject";
import EditorSkeleton from "./editorSkeleton";
import ErrorPage from "@/features/editor/components/error";



// interface EditorProjectIdPageProps {
//   params: {
//     projectId: string;
//   };
// };

const EditorProjectIdPage = () => {
  const {projectId} = useParams()
  
const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId || "";
  const { 
    data, 
    isLoading, 
    isError
  } = useGetProject(projectIdString);

  if (isLoading || !data) {
    return (
      <EditorSkeleton />
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen justify-center items-center content-center overflow-hidden mx-[10%] lg:mx-[20%]">
        <ErrorPage />
      </div>
    );
  }

  return <Editor initialData={data} />

};
 
export default EditorProjectIdPage;
