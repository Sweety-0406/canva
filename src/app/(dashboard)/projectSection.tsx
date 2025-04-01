"use client"

import { useGetProjects } from "@/features/editor/hooks/useGetProjects"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {formatDistanceToNow} from "date-fns"
import { AlertTriangle, CopyIcon, FileIcon, Loader, MoreHorizontal, Search, Trash } from "lucide-react"
import React from "react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useDuplicateProject } from "@/features/editor/hooks/useDuplicateProject"
import { useDeleteProject } from "@/features/editor/hooks/useDeleteProject"
import useDeleteModal from "@/features/editor/hooks/useDeleteModal"
import DeleteModal from "./deleteModal"


const ProjectSection = ()=>{
    const router = useRouter()
    const duplicateMutation = useDuplicateProject()
    const deleteMutation = useDeleteProject()
    const deleteModal = useDeleteModal()


    const onCopy = (projectId:string)=>{
      duplicateMutation.mutate({projectId})
    }

    const onDelete = (projectId: string)=>{
      deleteMutation.mutate({projectId})
    }

    const {
      data,
      status,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
    } = useGetProjects() 

    if (status === "pending") {
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
              <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
          </div>
        )
    }
    
    if (status === "error") {
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
              <AlertTriangle className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Failed to load projects
              </p>
            </div>
          </div>
        )
    }
    
    if (!data.pages.length || !data.pages[0].data.length){
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
              <Search className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                No projects found
              </p>
            </div>
          </div>
        )
    }    

    return(
        <div className="space-y-3 mb-5">
          <DeleteModal isPending={deleteMutation.isPending} isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} onSubmit={()=>onDelete(deleteModal.projectId)} />
          <h3 className="font-semibold text-lg">Recent Projects</h3>
          <Table>
            <TableBody>
              {data.pages.map((group, i)=>(
                <React.Fragment key={i}>
                  {group.data.map((project)=>(
                    <TableRow key={project.id}>
                      <TableCell
                        onClick={()=> router.push(`/editor/${project.id}`)}
                        className="font-medium flex items-center gap-x-2 cursor-pointer"
                      >
                        <FileIcon className = "size-6"/>
                        {project.name}
                      </TableCell>
                      <TableCell
                        onClick={()=> router.push(`/editor/${project.id}`)}
                        className="hidden md:table-cell cursor-pointer"
                      >
                        {project.width} x {project.height} px
                      </TableCell>
                      <TableCell
                        onClick={()=> router.push(`/editor/${project.id}`)}
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