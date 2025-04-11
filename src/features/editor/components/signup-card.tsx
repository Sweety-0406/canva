"use client";


import Link from "next/link";
import toast from "react-hot-toast"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { TriangleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { RiLoader2Line } from "react-icons/ri";
import axios from "axios";

export const SignUpCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const register = async(e: React.FormEvent<HTMLFormElement>)=>{
    setIsLoading(true)
    e.preventDefault()
    try {
      const res = await axios.post('/api/register',{
        email,
        name,
        password
      });
      if (res.status === 200) {
        toast.success("Account created successfully!");
        signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/",
        });
      }
    } catch (error:any) {
       toast.error("Email already exists")
    }
    setIsLoading(false)
  }

  const onProviderSignUp = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" });
  };

  // const onCredentialSignUp = (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  //   setIsLoading(true)
  //   e.preventDefault();

  //   signIn("credentials", {
  //     email: email,
  //     password: password,
  //     callbackUrl: "/",
  //   });
  //   setIsLoading(true)
  // };

  return (
      <div>
        {/* <div className="flex justify-center lg:hidden ">
          <img
            src="/logo.png"
            alt="Logo"
            className="size-28  "
          />
        </div> */}
        <Card className="bg-purple-50  w-full lg:hidden block h-full p-8 shadow-md shadow-gray-500  ">
          <CardHeader className="px-0 pt-0">
          <CardTitle>
            Create an account
          </CardTitle>
          <CardDescription>
            Use your email or another service to continue with PixelForge (it’s free)!
          </CardDescription>
          </CardHeader>
          {/* {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="size-4" />
              <p>Invalid email or password</p>
            </div>
          )} */}
          <CardContent className="space-y-3 px-0 pb-0">
                <form onSubmit={register} className="space-y-2.5">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      type="name"
                      required
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      minLength={3}
                      maxLength={20}
                      required
                    />
                    <Button 
                      variant="purple"
                      type="submit" 
                      className={`
                      w-full 
                      text-white
                      ${isLoading? "cursor-not-allowed":"cursor-pointer"} 
                      `}
                      size="lg"
                    >
                      {isLoading ? (
                      <RiLoader2Line className=" animate-spin"/>
                      ):(
                      "Continue"
                      )}
                    </Button>
                </form>
                <Separator />
                <Button 
                  onClick={()=>onProviderSignUp('google')}
                  variant="outline"
                  type="submit" 
                  className={`
                  w-full 
                  text-white
                  ${isLoading? "cursor-not-allowed ":"cursor-pointer"} 
                  `}
                  size="lg"
                >
                  <div className="flex text-black gap-2">
                    <FcGoogle />
                    Continue with Google
                  </div>
                </Button>
                <Button 
                  onClick={()=>onProviderSignUp('github')}
                  variant="outline"
                  type="submit" 
                  className={`
                  w-full 
                  text-white
                  ${isLoading? "cursor-not-allowed ":"cursor-pointer"} 
                  `}
                  size="lg"
                >
                  <div className="flex text-black gap-2">
                    <FaGithub />
                    Continue with GitHub
                  </div>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Already have an account? <Link href="/sign-in"><span className="text-[#8B3DFF]  font-semibold hover:underline">Sign in</span></Link>
                </p>
           </CardContent>
        </Card>
        <div  className=" hidden w-full lg:grid grid-cols-2 gap-2">
          <div className="mt-10 ">
            <img
              src="/logo.png"
              alt="Logo"
              className="size-80 ml:[10%] lg:ml-[30%]  "
            />
          </div>
          <div className="col-span-1 ">
            <Card className="bg-purple-50 w-[420px] lg:w-[420px] h-full p-8 shadow-md shadow-gray-500  ">
            <CardHeader className="px-0 pt-0">
              <CardTitle>
                Create an account
              </CardTitle>
              <CardDescription>
                Use your email or another service to continue with PixelForge (it’s free)!
              </CardDescription>
            </CardHeader>
            {/* {!!error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                <TriangleAlert className="size-4" />
                <p>Invalid email or password</p>
              </div>
            )} */}
            <CardContent className="space-y-3 px-0 pb-0">
                <form onSubmit={register} className="space-y-2.5">
                    <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    type="name"
                    required
                    />
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                    />
                    <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                    />
                    <Button 
                    variant="purple"
                    type="submit" 
                    className={`
                        w-full 
                        text-white
                        ${isLoading? "cursor-not-allowed ":"cursor-pointer"} 
                    `}
                    size="lg"
                    >
                    {isLoading ? (
                        <RiLoader2Line  className=" animate-spin"/>
                    ):(
                        "Continue"
                    )}
                    </Button>
                </form>
                <Separator />
                <Button 
                  onClick={()=>onProviderSignUp('google')}
                  variant="outline"
                  type="submit" 
                  className={`
                  w-full 
                  text-white
                  ${isLoading? "cursor-not-allowed ":"cursor-pointer"} 
                  `}
                  size="lg"
                >
                  <div className="flex text-black gap-2">
                    <FcGoogle />
                    Continue with Google
                  </div>    
                </Button>
                <Button 
                  onClick={()=>onProviderSignUp('github')}
                  variant="outline"
                  type="submit" 
                  className={`
                  w-full 
                  text-white
                  ${isLoading? "cursor-not-allowed ":"cursor-pointer"} 
                  `}
                  size="lg"
                >
                  <div className="flex text-black gap-2">
                    <FaGithub />
                    Continue with GitHub
                  </div>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Already have an account? <Link href="/sign-in"><span className="text-[#8B3DFF]  font-semibold hover:underline">Sign in</span></Link>
                </p>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};
