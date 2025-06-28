"use client"

import React from 'react';

interface SkeletonCardProps{
  templateNumber: number
}

const SkeletonCard = () => (
  <div className="animate-pulse rounded overflow-hidden shadow px-2 pt-2">
    <div className="bg-gray-300 h-40 w-full rounded"/>
    <div className="my-2 px-1">
      <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"/>
    </div>
  </div>
);

const TemplateSkeleton = ({templateNumber}:SkeletonCardProps)=>{
  return (
    <div className="px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {Array.from({ length: templateNumber }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default TemplateSkeleton