"use client"


import { useGetProjects } from "@/features/editor/hooks/useGetProjects"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {formatDistanceToNow} from "date-fns"
import { AlertTriangle, CopyIcon, FileIcon, MoreHorizontal, Trash } from "lucide-react"
import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useDuplicateProject } from "@/features/editor/hooks/useDuplicateProject"
import { useDeleteProject } from "@/features/editor/hooks/useDeleteProject"
import useDeleteModal from "@/features/editor/hooks/useDeleteModal"
import DeleteModal from "./deleteModal"
import useVerifyPrivateModal from "@/features/editor/hooks/useVerifyPrivateModal"
import VerifyPrivateModal from "@/features/editor/components/verifyPrivateModal"
import { RiInboxArchiveLine } from "react-icons/ri";
import axios from "axios"
import toast from "react-hot-toast"
import ProjectSkeleton from "./projectSkeleton";
import { useQueryClient } from "@tanstack/react-query"
import NotFoundData from "@/features/editor/components/not-found-data"
import ErrorPage from "@/features/editor/components/error"


interface ProjectSkeletonProps{
  projectNumber: number,
  show?:boolean,
  limitParam?:number
}

const ProjectSection = ({projectNumber, show, limitParam=5}:ProjectSkeletonProps)=>{
    const router = useRouter()
    const pathname = usePathname(); 
    const duplicateMutation = useDuplicateProject()
    const deleteMutation = useDeleteProject()
    const deleteModal = useDeleteModal()
    const verifyPrivateModal = useVerifyPrivateModal()
    const queryClient = useQueryClient();

    const onCopy = (projectId:string)=>{
      duplicateMutation.mutate({projectId})
    }

    const onDelete = (projectId: string)=>{
      deleteMutation.mutate({projectId})
    }

    const onClick = (isPrivate: boolean, projectId: string)=>{
      if(isPrivate){
        verifyPrivateModal.onOpen(projectId)
      }else{
        router.push(`/editor/${projectId}`)
      }
    }

    const onArchive = async(projectId: string)=>{
      const response = await axios.patch(`api/projects/${projectId}/makeArchive`)
      if(response.status==200){
        toast.success("Project is archived.")
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["archived-projects"] });
      }else{
        toast.error("Project is not archived.")
      }
    }

    const {
      data,
      status,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
    } = useGetProjects(limitParam) 

    if (status === "pending") {
        return (
          <div className="space-y-4 ">
            <h3 className="font-semibold text-xl">
              Recent Projects
            </h3>
            <div className="mb-4">
              <ProjectSkeleton projectNumber={projectNumber}/>
            </div>
            
          </div>
        )
    }
    
    if (status === "error") {
      return (
        <div className="space-y-4">
          {show ? (
            <h3 className="font-semibold text-3xl">Your Projects</h3>
          ) : (
            <h3 className="font-semibold text-xl">
              Recent Projects
            </h3>
          )}
          {pathname === "/projects"  ? (
            <div className="flex flex-col gap-y-4 items-center justify-center h-full">
              <ErrorPage />
            </div>
          ):(
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
              <AlertTriangle className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Failed to load projects
              </p>
            </div>
          )}
        </div>
      )
    }
    
    if (!data.pages.length || !data.pages[0].data.length){
        return (
          <div className="space-y-4">
            {show ? (
              <h3 className="font-semibold text-3xl">Your Projects</h3>
            ) : (
              <h3 className="font-semibold text-xl">
                Recent Projects
              </h3>  
            )}
            <div className="flex flex-col gap-y-4 items-center justify-center h-full">
              <NotFoundData title="No projects found" description="Please create your first project to get started." />
            </div>
          </div>
        )
    }    

    return(
        <div className="space-y-3 ">
          <VerifyPrivateModal />
          <DeleteModal isPending={deleteMutation.isPending} isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} onSubmit={()=>onDelete(deleteModal.projectId)} />
          {show ? (
            <h3 className="font-semibold text-3xl">Your Projects</h3>
          ) : (
            <h3 className="font-semibold text-xl">
              Recent Projects
            </h3>
          )}
          <Table>
            <TableBody>
              {data.pages.map((group, i)=>(
                <React.Fragment key={i}>
                  {group.data.map((project)=>(
                    <TableRow key={project.id}>
                      <TableCell
                        onClick={()=>onClick(project.isPrivate, project.id)}
                        className="font-medium flex items-center gap-x-2 cursor-pointer"
                      >
                        <FileIcon className = "size-6"/>
                        {project.name}
                      </TableCell>
                      <TableCell
                        onClick={()=>onClick(project.isPrivate, project.id)}
                        className="hidden md:table-cell cursor-pointer"
                      >
                        {project.width} x {project.height} px
                      </TableCell>
                      <TableCell
                        onClick={()=>onClick(project.isPrivate, project.id)}
                        className="hidden md:table-cell cursor-pointer"
                      >
                        {formatDistanceToNow(project.updatedAt, {addSuffix: true})}
                      </TableCell>
                      <TableCell className="flex items-center justify-end">
                        <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                          disabled={false}
                          size="icon"
                          variant="ghost"
                          >
                          <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60">
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            disabled={duplicateMutation.isPending}
                            onClick={() => onCopy(project.id)}
                            >
                            <CopyIcon className="size-4 mr-2" />
                            Make a copy
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            onClick={()=>onArchive(project.id)}
                            >
                            <RiInboxArchiveLine className="size-4 mr-2" />
                            Archive
                         </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-10 cursor-pointer"
                            disabled={deleteMutation.isPending}
                            onClick={() => deleteModal.onOpen(project.id)}
                            >
                            <Trash className="size-4 mr-2" />
                            Delete
                         </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))} 
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          {hasNextPage && ( 
              <div className="w-full flex items-center justify-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  Load more
                </Button>
              </div>
          )}

        </div>
    )
}

export default ProjectSection





