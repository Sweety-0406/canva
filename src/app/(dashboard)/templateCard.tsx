"use client"

import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
};

const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  disabled,
  description,
  height,
  width,
  isPro
}: TemplateCardProps) => {
  return (
    <div
      onClick={onClick}
      // disabled={disabled}
      className={cn(
        "space-y-2 group text-left transition flex flex-col",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      )}
    >
      {/* <div
        style={{ aspectRatio: `${width/2}/${height/2}` }}
        className="relative rounded-xl h-full w-full overflow-hidden border"
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className=" object-cover transition transform group-hover:scale-105"
        />
        {isPro && (
          <div className="absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full -z[10]">
            <FaCrown className="size-5 fill-yellow-500 text-yellow-500" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute  inset-0  rounded-xl backdrop-filter ">
          <div className="absolute right-4 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="left-12 bg-black/50 hover:bg-black/60 text-white p-2 px-3 rounded-sm">
                <HiDotsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HiOutlinePencilSquare className="size-10" />
                  Customize this template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div> */}
      <div
  style={{
    aspectRatio: `${width}/${height}`, // keep the original aspect ratio
    width: "100%", // full width of parent container
    maxWidth: "250px", // limit size, you can adjust this
  }}
  className="relative rounded-xl overflow-hidden border group"
>
  <Image
    src={imageSrc}
    alt={title}
    fill
    className="object-cover transition-transform group-hover:scale-105"
  />
  {isPro && (
    <div className="absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full z-10">
      <FaCrown className="size-5 fill-yellow-500 text-yellow-500" />
    </div>
  )}
  <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 rounded-xl backdrop-filter">
    <div className="absolute right-4 top-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black/50 hover:bg-black/60 text-white p-2 px-3 rounded-sm">
          <HiDotsHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <HiOutlinePencilSquare className="size-10" />
            Customize this template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</div>

      <div className="space-y-1">
        <p className="text-sm font-medium">
          {title}
        </p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75 transition">
          {description}
        </p>
      </div>
    </div>
  )
}

export default TemplateCard