import React from "react";
import { FloatingPage } from "./floatingPage";
import { projectJson } from "../types";
import { RxCross2 } from "react-icons/rx";


interface PageBarProps {
  pageData: projectJson[];
  activeInd: number;
  onClickPage: (i: number, id:string) => void;
  pageDeleteHandler: (i: number) => void;
  isDelete: boolean
}

export function PageBar({ pageData, activeInd, onClickPage, pageDeleteHandler, isDelete }: PageBarProps) {

  const links = pageData.map((page, i) => ({
    title: `Page ${i + 1}`,
    icon: (
      <div className="relative flex items-center justify-center">
        <div
          className={`
            h-10 w-10 flex items-center justify-center rounded-full bg-white text-lg font-semibold
            ${activeInd === i ? "text-[#8B3DFF] " : " text-neutral-600"}
          `}
        >
          {i + 1}
        </div>
        {(pageData.length > 1 && activeInd === i)&& (
          <button
            disabled={isDelete}
            onClick={async(e) => {
              e.stopPropagation();
              pageDeleteHandler(i);
            }}
            className="absolute top-1 font-bold right-0 text-white bg-red-500 rounded-full h-4 w-4  flex items-center justify-center transform translate-x-1 -translate-y-1"
            title="Delete page"
          >
            <RxCross2 size={13} />
          </button>
        )}
      </div>
    ),
    onClick: () => onClickPage(i, page.id),
  }));

  return (
    <FloatingPage items={links} desktopClassName="bg-transparent" />
  );
}

