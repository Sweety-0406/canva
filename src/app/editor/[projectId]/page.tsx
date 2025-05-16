
"use client";

import { Editor } from "@/features/editor/components/editor";
import {  TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetProject } from "@/features/editor/hooks/useGetProject";
import Loader from "@/features/editor/components/loader"




interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
};

const EditorProjectIdPage = ({
  params,
}: EditorProjectIdPageProps) => {
  const {projectId} = useParams()
  
const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId || "";
  const { 
    data, 
    isLoading, 
    isError
  } = useGetProject(projectIdString);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-1 h-[70vh] justify-center  items-center">
          <div className=''>
              <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          Failed to fetch project
        </p>
        <Button asChild variant="secondary">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />
  // return (
  //   <div className="h-full flex flex-col items-center justify-center">
  //     <div className="flex flex-1 h-[70vh] justify-center  items-center">
  //       <div className=''>
  //           <Loader />
  //       </div>
  //     </div>
  //   </div>
  // );
};
 
export default EditorProjectIdPage;
