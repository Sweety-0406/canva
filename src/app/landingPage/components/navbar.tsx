

"use client"

import Logo from "@/app/(dashboard)/logo"
import UserButton from "./userButton"
import Hint from "@/features/editor/components/hint"
import { Button } from "@/components/ui/button"
import { TiHomeOutline } from "react-icons/ti";
import Link from "next/link"
import { BsPatchQuestion } from "react-icons/bs";
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (session.status === "loading") {
    return (
      <div className="h-[68px] fixed top-0 left-0 w-full z-50 flex items-center justify-center bg-white/90 backdrop-blur-md">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      <div
        className={`h-[68px] fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 lg:px-8 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "backdrop-blur-md border-b border-white/20 "
        }`}
      >

        {!isScrolled && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10" />
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-[shimmer_3s_infinite]"
              style={{
                animation: "shimmer 3s infinite",
                transform: "translateX(-100%) skewX(-12deg)",
              }}
            />
          </>
        )}


        <div className="relative z-10 flex items-center">
          <Logo />
        </div>

        <nav className="hidden md:flex space-x-8 text-sm font-medium relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className="relative px-3 py-2 text-gray-700 hover:text-black transition-all duration-300 group"
              href={link.href}
            >
              {link.label}
              <span className="absolute rounded-full bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00c4cc] to-[#6420ff] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="relative z-10">
          {session.data ? (
            <div className="flex items-center gap-2">
              <Hint label="Home" side="bottom">
                <Button
                  onClick={() => router.push("/")}
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 p-0 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <TiHomeOutline className="size-5" />
                </Button>
              </Hint>

              <Hint label="Help" side="bottom">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 p-0 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <Link href="mailto:kiyaranandi02@gmail.com">
                    <BsPatchQuestion className="size-5" />
                  </Link>
                </Button>
              </Hint>

              <UserButton />
            </div>
          ) : (
            <div className="flex gap-3">
              <Button onClick={() => router.push("/sign-in")} variant="purple">
                Login
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                variant="purple"
                className="cursor-pointer"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
