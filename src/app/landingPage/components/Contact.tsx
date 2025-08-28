
"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { MessageCircle, Phone, Mail, Send, MapPin, Clock, Star, Play } from 'lucide-react';
import { LucideIcon } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetSubscription } from "@/features/editor/hooks/useGetSubscription";
import { useGetUser } from "@/features/editor/hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";


type ContactMethod = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  action: string;
};

export default function Contact() {
  const [ctaVisible, setCtaVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const mutation = useCreateProject();
  const session = useSession();
  const [contactVisible, setContactVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const{data: subscription, isLoading} = useGetSubscription()
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    method: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setContactVisible(true);
  }, []);

  const contactMethods = [
    {
      id: 'call',
      icon: Phone,
      title: 'Schedule Call',
      subtitle: 'We’ll reach out at your convenience',
      color: 'from-blue-500 to-cyan-600',
      action: 'Request Call'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Send Message',
      subtitle: 'Detailed inquiries',
      color: 'from-green-500 to-emerald-600',
      action: 'Send Message'
    }
  ];

  const handleMethodSelect = (method: ContactMethod) => {
    setSelectedMethod(method);
    setFormData({ ...formData, method: method.title });
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedMethod) return null
    setLoading(true);
    try {
      if (selectedMethod.id === "email") {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email, 
            message: formData.message,
          }),
        });

        if (res.ok) {
          toast.success(`Email initiated! We'll get back to you soon.`);
          setFormData({ name: "", message: "", method: "", email:"", phone:'' });
        } else {
          toast.error(" Failed to send message.");
        }
      } else  {
        if(formData.phone.length != 10){
          toast.error("Give 10 digits phone no.")
          return
        }
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: `${process.env.NEXT_PUBLIC_EMAIL}`, 
            message: `name:${formData.name}, phone:${formData.phone}, message:${formData.message}`,
          }),
        });

        if (res.ok) {
          toast.success(`Booking initiated! We'll get back to you soon.`);
          setFormData({ name: "", message: "", method: "", email:"", phone:'' });
        } else {
          toast.error(" Failed to send message.");
        }        
      }
    } catch{
      toast.error(" Something went wrong. Try again later.");
    } finally {
      setLoading(false);
      setSelectedMethod(null)
    }
  }  

  const onClick = async () => {
    if (!session.data?.user) {
      toast.error("Please login");
      return;
    }
    
    if(!isLoading && !isUserLoading && !subscription?.status && user?.totalProjects === 5){
      toast.error("You have reached the limit. Please upgrade to continue")
      return;
    } 
    mutation.mutate(
      {
        name: "Untitled Project",
        json: "",
        width: 500,
        height: 700,
      },
      {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCtaVisible(true), 400);
          setTimeout(() => setImageVisible(true), 600);
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 px-6 bg-white text-white text-center"
    >
      <div className=" flex items-center justify-center">
        <div className={` w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl p-8 mx-auto md:px-[10%] relative overflow-hidden transform transition-all duration-1000 ease-out ${
          contactVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-12 opacity-0 scale-95'
        }`}>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-blue-600/90 to-purple-600/90" />
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10 text-white">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg hover:scale-110 hover:bg-white/30 transition-all duration-300">
                  <MessageCircle className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Let&apos;s Connect
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Choose how you&apos;d like to reach out. We&apos;re here to help bring your ideas to life.
              </p>
            </div>

            {/* Contact Methods */}
            {!selectedMethod ? (
              <div className="grid sm:grid-cols-2 gap-6 mb-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className="group bg-white/10  backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                      onClick={() => handleMethodSelect(method)}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="w-full flex justify-center"> 
                        <div className={`size-10 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="size-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold ">{method.title}</h3>
                      <p className="text-white/70 mb-4">{method.subtitle}</p>
                      <Button variant="ghost" 
                        className=" border-2 w-full flex justify-center items-center hover:bg-white/50 hover:text-white transition-all duration-300"
                      >
                        {method.action}
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Selected Method Form */
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => setSelectedMethod(null)}
                    className="mr-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  >
                    <FaArrowLeftLong  className="size-5" />
                  </button>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedMethod.color} flex items-center justify-center mr-4`}>
                    <selectedMethod.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedMethod.title}</h3>
                    <p className="text-white/70">{selectedMethod.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    />
                  </div>
                  {selectedMethod?.id === "email" && (
                    <div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                  )}
                  {selectedMethod?.id === "call" && (
                    <div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          // Only allow digits
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          setFormData({ ...formData, phone: value });
                        }}
                        maxLength={10}
                        minLength={10}
                        inputMode="numeric"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                        placeholder="Enter 10 digit number"
                      />
                    </div>
                  )}
                  <div>
                    <textarea
                      placeholder={selectedMethod.id === 'call' ? 'What would you like to discuss?' : 'Your message...'}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className={`w-full py-3 cursor-pointer bg-gradient-to-r ${selectedMethod.color} rounded-lg font-bold text-white hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    {selectedMethod.action}
                    <selectedMethod.icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Clock className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <p className="text-sm">Response within</p>
                <p className="font-bold">24 hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm">5-star rated</p>
                <p className="font-bold">Support team</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <p className="text-sm">Available</p>
                <p className="font-bold">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t pt-20">
        <div className="flex flex-col md:mx-[5%] md:flex-row gap-5">
          <div 
            className={`max-w-4xl flex flex-col justify-center items-center mx-auto transform transition-all duration-1000 ease-out ${
              ctaVisible 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-8 opacity-0'
            }`}
          >
            <h1 className="text-4xl text-black md:text-left md:text-5xl font-bold leading-tight">
              Ready to start creating{" "}
              <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
                amazing designs?
              </span>
            </h1>
            
            <p className="mt-4 text-center md:text-left text-lg md:text-xl text-gray-500 md:mr-[15%]">
              Join millions of creators who trust PixelForge to bring their ideas to life. Start your free account today and discover what you can create.
            </p>
            
            <div className="mt-8 flex w-full justify-center md:justify-start gap-4">
              <Button 
                disabled={mutation.isPending}
                onClick={onClick}              
                className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Creating - it&apos;s free
              </Button>
              <Button 
                variant="outline" 
                className="text-black border-2 flex gap-2 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              >
                <Play size={16} /> Watch Demo
              </Button>
            </div>
          </div>
          
          <div 
            className={`mt-16 md:mt-0 flex justify-center transform transition-all duration-1000 ease-out ${
              imageVisible 
                ? 'translate-x-0 opacity-100 scale-100' 
                : 'translate-x-8 opacity-0 scale-95'
            }`}
          >
            <Image
              src="/images/laptop-bg.jpg"
              alt="PixelForge UI"
              width={1000}
              height={600}
              className="rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}