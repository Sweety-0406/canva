// "use client"

// import Link from "next/link";
// import type { LucideIcon } from "lucide-react";

// import { cn } from "@/lib/utils";

// interface SidebarItemProps {
//   icon: LucideIcon | React.ElementType;
//   label?: string;
//   href: string;
//   isActive?: boolean;
//   onClick?: () => void;
// };

// const SidebarItem = ({
//   icon: Icon,
//   label,
//   href,
//   isActive,
//   onClick,
// }: SidebarItemProps) => {
//   return (
//     <Link href={href} onClick={onClick}>
//       <div className={cn(
//         "flex items-center px-3 py-[10px]  rounded-lg bg-transparent hover:text-[#8b3dff]  hover:bg-[#a570ff33] transition",
//         isActive && "bg-[#a570ff33] text-[#8b3dff]",
//       )}>
//         {label?(
//           <div className="flex">
//             <Icon  className={`size-4 mr-2 stroke-2 `} />
//             <span className={`text-sm font-medium `}>
//               {label}
//             </span>
//           </div>
//         ):(
//           <Icon size={6} className={`size-4 stroke-2 `} />
//         )}
        
//       </div>
//     </Link>
//   );
// };

// export default SidebarItem


"use client"

import React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: LucideIcon | React.ElementType
  label?: string
  href: string
  isActive?: boolean
  onClick?: () => void
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ icon: Icon, label, href, isActive, onClick, className, ...props }, ref) => {
    return (
      <Link href={href} legacyBehavior passHref>
        <a
          ref={ref}
          onClick={onClick}
          className={cn(
            "flex items-center px-3 py-[10px] rounded-lg bg-transparent hover:text-[#8b3dff] hover:bg-[#a570ff33] transition",
            isActive && "bg-[#a570ff33] text-[#8b3dff]",
            className
          )}
          {...props}
        >
          {label ? (
            <div className="flex">
              <Icon className="size-4 mr-2 stroke-2" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ) : (
            <Icon className="size-4 stroke-2" />
          )}
        </a>
      </Link>
    )
  }
)

SidebarItem.displayName = "SidebarItem"

export default SidebarItem
