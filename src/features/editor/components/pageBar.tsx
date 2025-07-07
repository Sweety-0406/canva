// import React from "react";
// import { FloatingDock } from "@/components/ui/floating-dock";
// import { FloatingPage } from "./floatingPage";

// interface PageBarProps {
//   pageData: any[];
//   activeInd: number;
//   onClickPage: (i: number) => void;
// }

// export function PageBar({ pageData, activeInd, onClickPage }: PageBarProps) {
  
//   const links = pageData.map((_, i) => ({
//     title: `Page ${i + 1}`,
//     icon: (
//       <div className={`
//         h-full  w-full flex items-center border  justify-center 
//         ${activeInd === i ? "text-[#8B3DFF] bg-white border border-[#8B3DFF]" : "text-neutral-500"}
//        `}>
//         {i + 1}
//       </div>
//     ),
//     // href: "#",
//     onClick: () => onClickPage(i),
//   }));

//   return (
//     <FloatingPage
//       mobileClassName="translate-y-20 "
//       items={links}
//       desktopClassName="bg-transparent "
//       activeInd={activeInd}
//     />
//   );
// }




import React from "react";
import { FloatingPage } from "./floatingPage";
import { IconFileText } from "@tabler/icons-react";

interface PageBarProps {
  pageData: any[];
  activeInd: number;
  onClickPage: (i: number) => void;
}

export function PageBar({ pageData, activeInd, onClickPage }: PageBarProps) {

  const links = pageData.map((_, i) => ({
    title: `Page ${i + 1}`,
    icon: (
        <div className={`
            h-full w-full flex items-center justify-center bg-white rounded-full text-2xl  
            ${activeInd === i ? "text-[#8B3DFF]  " : "text-neutral-500  "}
       `}>
            {i + 1}
        </div>
    ),
    onClick: () => onClickPage(i),  // Correctly pass index
  }));

  return (
    <FloatingPage
      mobileClassName="translate-y-20"
      items={links}
      desktopClassName="bg-transparent"
    />
  );
}
