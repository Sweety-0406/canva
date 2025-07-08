import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

export const FloatingPage = ({
  items,
  desktopClassName,
}: {
  items: { title: string; icon: React.ReactNode; onClick: () => void }[];
  desktopClassName?: string;
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
          onClick={item.onClick} 
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
