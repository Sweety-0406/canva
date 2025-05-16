import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import ProjectSection from "./projectSection";
import TemplateSection from "./templateSection";

export default async function Home() {
  await protectServer()
  return (
    <div className="flex flex-col space-y-4 max-w-screen-xl mx-auto px-5 pt-5 pb-10">
      <Banner />
      <TemplateSection page="4" />
      <ProjectSection />
    </div>
  );
}
