"use client"

import Logo from "@/features/editor/components/logo";

export default function EditorSkeleton() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Navbar */}
      <div className="h-12 py-1  w-full bg-white border-b flex justify-between items-center px-4 gap-4">
        <Logo />
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-white border-r flex flex-col items-center py-4 gap-6">
          {[...Array(7)].map((_, i) => (
            <div key={i}>
              <div
                className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"
              />
              <div className="w-7 h-2 mt-1 bg-gray-200 rounded-xl"/>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
        
          {/* Canvas area */}
          <div className="flex-1 flex items-center justify-center p-8 my-10 ">
            <div className="bg-gray-200 w-[300px] h-[400px] border shadow-md animate-pulse" />
          </div>

          {/* Bottom toolbar */}
          <div className="h-10 w-full border-t flex justify-end items-center px-4 gap-4 bg-white">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
