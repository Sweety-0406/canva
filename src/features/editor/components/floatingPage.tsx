
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
// import {
//   AnimatePresence,
//   MotionValue,
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "motion/react";

// import { useRef, useState } from "react";

// export const FloatingPage = ({
//   items,
//   desktopClassName,
//   mobileClassName,
//   activeInd
// }: {
//   items: { title: string; icon: React.ReactNode;onClick:(i:number)=>void  }[];
//   desktopClassName?: string;
//   mobileClassName?: string;
//   activeInd: number
// }) => {
//   return (
//     <>
//       <FloatingDockDesktop items={items} className={desktopClassName} />
//       {/* <FloatingDockMobile items={items} className={mobileClassName} /> */}
//     </>
//   );
// };

// const FloatingDockMobile = ({
//   items,
//   className,
// }: {
//   items: { title: string; icon: React.ReactNode; href: string }[];
//   className?: string;
// }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className={cn("relative block md:hidden", className)}>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             layoutId="nav"
//             className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
//           >
//             {items.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: 10,
//                   transition: {
//                     delay: idx * 0.05,
//                   },
//                 }}
//                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}
//               >
//                 <a
//                   href={item.href}
//                   key={item.title}
//                   className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
//                 >
//                   <div className="h-4 w-4">{item.icon}</div>
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
//       >
//         <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
//       </button>
//     </div>
//   );
// };

// const FloatingDockDesktop = ({
//   items,
//   className,
//   onClick
// }: {
//   items: { title: string; icon: React.ReactNode;onClick:(i:number)=>void }[];
//   className?: string;
// }) => {
//   let mouseX = useMotionValue(Infinity);
//   return (
//     <motion.div
//       onMouseMove={(e) => mouseX.set(e.pageX)}
//       onMouseLeave={() => mouseX.set(Infinity)}
//     //   className={cn(
//     //     "mx-auto  h-16 items-end gap-4 rounded-lg bg-gray-50 px-4 pb-3 flex dark:bg-neutral-900",
//     //     className,
//     //   )}
//       className={cn(
//         "flex gap-2",
//         className,
//       )}
//     >
//       {items.map((item) => (
//         <IconContainer onClickHandler={onClick} mouseX={mouseX} key={item.title} {...item} />
//       ))}
//     </motion.div>
//   );
// };

// function IconContainer({
//   mouseX,
//   title,
//   icon,
//   onClickHandler
// //   href,
// }: {
//   mouseX: MotionValue;
//   title: string;
//   icon: React.ReactNode;
//   onClickHandler:(i:number)=>void
// //   href: string;
// }) {
//   let ref = useRef<HTMLDivElement>(null);

//   let distance = useTransform(mouseX, (val) => {
//     let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

//     return val - bounds.x - bounds.width / 2;
//   });

//   let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
//   let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

//   let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
//   let heightTransformIcon = useTransform(
//     distance,
//     [-150, 0, 150],
//     [20, 40, 20],
//   );

//   let width = useSpring(widthTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });
//   let height = useSpring(heightTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   let widthIcon = useSpring(widthTransformIcon, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });
//   let heightIcon = useSpring(heightTransformIcon, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   const [hovered, setHovered] = useState(false);

//   return (
//     <button onClick={onClickHandler}>
//       <motion.div
//         ref={ref}
//         style={{ width, height }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className={`
//             relative flex aspect-square items-center justify-center rounded-full bg-gray-200 
//         `}
//       >
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               initial={{ opacity: 0, y: 10, x: "-50%" }}
//               animate={{ opacity: 1, y: 0, x: "-50%" }}
//               exit={{ opacity: 0, y: 2, x: "-50%" }}
//               className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
//             >
//               {title}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.div
//           style={{ width: widthIcon, height: heightIcon }}
//           className="flex items-center justify-center"
//         >
//           {icon}
//         </motion.div>
//       </motion.div>
//     </button>
//   );
// }







import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

export const FloatingPage = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; onClick: () => void }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; onClick: () => void }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const[hovered, setHovered] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => {mouseX.set(Infinity), setHovered(false)}}
      className={cn(
        "flex gap-2", 
        hovered ? "w-full":"max-w-72 overflow-hidden  p-1",
        (items.length >6 && !hovered) ? "shadow-inner rounded-full":"",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          key={item.title}
          mouseX={mouseX}
          title={item.title}
          icon={item.icon}
          onClick={item.onClick} // Pass correct onClick
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val:any) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2; 
  });

//   const width = useSpring(useTransform(distance, [-150, 0, 150], [40, 80, 40]), {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   const height = useSpring(useTransform(distance, [-150, 0, 150], [40, 80, 40]), {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   const widthIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 40, 20]), {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   const heightIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 40, 20]), {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

const width = useSpring(useTransform(distance, [-150, 0, 150], [40, 55, 40]), {
  mass: 0.8,
  stiffness: 150,
  damping: 6,
});

const height = useSpring(useTransform(distance, [-150, 0, 150], [40, 55, 40]), {
  mass: 0.8,
  stiffness: 150,
  damping: 6,
});

const widthIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 28, 20]), {
  mass: 0.8,
  stiffness: 150,
  damping: 6,
});

const heightIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 28, 20]), {
  mass: 0.8,
  stiffness: 150,
  damping: 6,
});


  const [hovered, setHovered] = useState(false);

  return (
    <button onClick={onClick}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative bg-white rounded-full border flex aspect-square w-fit items-center justify-center  "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center aspect-square justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </button>
  );
}
