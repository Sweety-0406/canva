"use client"

interface ProjectSkeletonProps{
    projectNumber: number
}

const ProjectSkeleton = ({projectNumber}:ProjectSkeletonProps) => {
  return (
    <div className="divide-y">
      {[...Array(projectNumber)].map((_, idx) => (
        <div key={idx} className="flex items-center justify-between py-4 animate-pulse">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 rounded w-6 h-7" />
            <div className="bg-gray-300 rounded w-48 h-4" />
          </div>

          {/* Middle: Dimensions */}
          <div className="bg-gray-300 rounded w-20 h-4" />

          {/* Right: Timestamp */}
          <div className="bg-gray-300 rounded w-24 h-4" />
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
