import Link from "next/link";
import type { LucideIcon } from "lucide-react";
// import ReactIcon

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon | React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <div className={cn(
        "flex items-center px-3 py-[10px] rounded-lg bg-transparent hover:bg-white transition",
        isActive && "bg-white",
      )}>
        <Icon className="size-4 mr-2 stroke-2" />
        <span className="text-sm font-medium">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarItem
