

"use client"


import { useGetProjects } from "@/features/editor/hooks/useGetProjects"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {formatDistanceToNow} from "date-fns"
import { AlertTriangle, CopyIcon, FileIcon, MoreHorizontal, Search, Trash } from "lucide-react"
import React from "react"
import { useRouter } from "next/navigation"
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


interface ProjectSkeletonProps{
  projectNumber: number,
  show?:boolean,
  limitParam?:number
}

const ProjectSection = ({projectNumber, show, limitParam=5}:ProjectSkeletonProps)=>{
    const router = useRouter()
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
            {show ? (
              <h3 className="font-semibold text-3xl">Your Projects</h3>
            ) : (
              <h3 className="font-semibold text-xl">
                Recent Projects
              </h3>  
            )}
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






// "use client"

// import { useGetProjects } from "@/features/editor/hooks/useGetProjects"
// import { formatDistanceToNow } from "date-fns"
// import { 
//   AlertTriangle, 
//   CopyIcon, 
//   FileIcon, 
//   MoreHorizontal, 
//   Search, 
//   Trash,
//   Eye,
//   Lock,
//   Grid3X3,
//   Calendar
// } from "lucide-react"
// import React, { useState } from "react"
// import { useRouter } from "next/navigation"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { useDuplicateProject } from "@/features/editor/hooks/useDuplicateProject"
// import { useDeleteProject } from "@/features/editor/hooks/useDeleteProject"
// import useDeleteModal from "@/features/editor/hooks/useDeleteModal"
// import DeleteModal from "./deleteModal"
// import useVerifyPrivateModal from "@/features/editor/hooks/useVerifyPrivateModal"
// import VerifyPrivateModal from "@/features/editor/components/verifyPrivateModal"
// import { RiInboxArchiveLine } from "react-icons/ri"
// import axios from "axios"
// import toast from "react-hot-toast"
// import ProjectSkeleton from "./projectSkeleton"
// import { useQueryClient } from "@tanstack/react-query"

// interface ProjectSkeletonProps {
//   projectNumber: number
//   show?: boolean
// }

// const ProjectSection = ({ projectNumber, show }: ProjectSkeletonProps) => {
//   const router = useRouter()
//   const duplicateMutation = useDuplicateProject()
//   const deleteMutation = useDeleteProject()
//   const deleteModal = useDeleteModal()
//   const verifyPrivateModal = useVerifyPrivateModal()
//   const queryClient = useQueryClient()

//   const onCopy = (projectId: string) => {
//     duplicateMutation.mutate({ projectId })
//   }

//   const onDelete = (projectId: string) => {
//     deleteMutation.mutate({ projectId })
//   }

//   const onClick = (isPrivate: boolean, projectId: string) => {
//     if (isPrivate) {
//       verifyPrivateModal.onOpen(projectId)
//     } else {
//       router.push(`/editor/${projectId}`)
//     }
//   }

//   const onArchive = async (projectId: string) => {
//     const response = await axios.patch(`api/projects/${projectId}/makeArchive`)
//     if (response.status === 200) {
//       toast.success("Project is archived.")
//       queryClient.invalidateQueries({ queryKey: ["projects"] })
//       queryClient.invalidateQueries({ queryKey: ["archived-projects"] })
//     } else {
//       toast.error("Project is not archived.")
//     }
//   }

//   const {
//     data,
//     status,
//     fetchNextPage,
//     isFetchingNextPage,
//     hasNextPage
//   } = useGetProjects()

//   if (status === "pending") {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           {show ? (
//             <h3 className="font-semibold text-3xl">Your Projects</h3>
//           ) : (
//             <h3 className="font-semibold text-xl">
//               Recent projects
//             </h3>  
//           )}
//         </div>
//         <ProjectSkeleton projectNumber={projectNumber} />
//       </div>
//     )
//   }

//   if (status === "error") {
//     return (
//       <div className="space-y-6">
//         {show ? (
//           <h3 className="font-semibold text-3xl">Your Projects</h3>
//         ) : (
//           <h3 className="font-semibold text-xl">
//             Recent projects
//           </h3>  
//         )}
//         <div className="flex flex-col gap-y-4 items-center justify-center h-64 bg-gray-50 rounded-lg">
//           <AlertTriangle className="size-12 text-red-500" />
//           <p className="text-gray-600 text-lg font-medium">Failed to load projects</p>
//           <p className="text-gray-500 text-sm">Please try refreshing the page</p>
//         </div>
//       </div>
//     )
//   }

//   if (!data.pages.length || !data.pages[0].data.length) {
//     return (
//       <div className="space-y-6">
//         {show ? (
//           <h3 className="font-semibold text-3xl">Your Projects</h3>
//         ) : (
//           <h3 className="font-semibold text-xl">
//             Recent projects
//           </h3>  
//         )}
//         <div className="flex flex-col gap-y-4 items-center justify-center h-64 bg-gray-50 rounded-lg">
//           <div className="bg-blue-100 p-4 rounded-full">
//             <Search className="size-12 text-blue-600" />
//           </div>
//           <p className="text-gray-600 text-lg font-medium">No projects found</p>
//           <p className="text-gray-500 text-sm">Create your first project to get started</p>
//         </div>
//       </div>
//     )
//   }

//   const ProjectCard = ({ project }: { project: any }) => (
//     <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300">
//       <CardContent className="p-0">
//         {/* Preview Image */}
//         <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-6xl text-gray-300 opacity-50">
//               <FileIcon />
//             </div>
//           </div>
          
//           {/* Private Badge */}
//           {project.isPrivate && (
//             <Badge className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
//               <Lock className="size-3 mr-1" />
//               Private
//             </Badge>
//           )}
          
//           {/* Actions Menu */}
//           <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//             <DropdownMenu modal={false}>
//               <DropdownMenuTrigger asChild>
//                 <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
//                   <MoreHorizontal className="size-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-48">
//                 <DropdownMenuItem
//                   className="cursor-pointer"
//                   onClick={() => onClick(project.isPrivate, project.id)}
//                 >
//                   <Eye className="size-4 mr-2" />
//                   Open
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer"
//                   disabled={duplicateMutation.isPending}
//                   onClick={() => onCopy(project.id)}
//                 >
//                   <CopyIcon className="size-4 mr-2" />
//                   Duplicate
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer"
//                   onClick={() => onArchive(project.id)}
//                 >
//                   <RiInboxArchiveLine className="size-4 mr-2" />
//                   Archive
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="cursor-pointer text-red-600"
//                   disabled={deleteMutation.isPending}
//                   onClick={() => deleteModal.onOpen(project.id)}
//                 >
//                   <Trash className="size-4 mr-2" />
//                   Delete
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-4">
//           <h4 
//             className="font-semibold text-lg mb-2 truncate cursor-pointer hover:text-blue-600 transition-colors"
//             onClick={() => onClick(project.isPrivate, project.id)}
//           >
//             {project.name}
//           </h4>
          
//           <div className="space-y-2">
//             <div className="flex items-center text-sm text-gray-600">
//               <Grid3X3 className="size-4 mr-2" />
//               <span>{project.width} × {project.height} px</span>
//             </div>
            
//             <div className="flex items-center text-sm text-gray-600">
//               <Calendar className="size-4 mr-2" />
//               <span>{formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}</span>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )

//   return (
//     <div className="space-y-6 pb-8">
//       <VerifyPrivateModal />
//       <DeleteModal 
//         isPending={deleteMutation.isPending} 
//         isOpen={deleteModal.isOpen} 
//         onClose={deleteModal.onClose} 
//         onSubmit={() => onDelete(deleteModal.projectId)} 
//       />
      
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         {show ? (
//           <h3 className="font-semibold text-3xl">Your Projects</h3>
//         ) : (
//           <h3 className="font-semibold text-xl">
//             Recent projects
//           </h3>  
//         )}
//       </div>

//       {/* Projects Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {data.pages.map((group, i) => (
//           <React.Fragment key={i}>
//             {group.data.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Load More */}
//       {hasNextPage && (
//         <div className="flex justify-center pt-8">
//           <Button
//             variant="outline"
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//             className="px-8 py-2"
//           >
//             {isFetchingNextPage ? "Loading..." : "Load More Projects"}
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ProjectSection