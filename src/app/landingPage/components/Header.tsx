'use client';
// import Logo from "@/app/(dashboard)/logo";
import { Button } from "@/components/ui/button";
import Logo from "@/features/editor/components/logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div >
          <Logo/> 
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link href="/signin" className="text-sm font-semibold">Sign In</Link>
          <Button className="bg-[#6366f1] text-white rounded-xl hover:bg-[#4f46e5] transition">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
