import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import ProjectSection from "./projectSection";
import TemplateSection from "./templateSection";
import DashboardCategorySection from "./dashboardCategorySection";
import Heading from "./heading";
// import { NamedTemplateModal } from "@/features/editor/components/namedTemplateModal";

export default async function Home() {
  await protectServer()
  return (
    <div className="flex flex-col space-y-4 max-w-screen-xl mx-auto px-5 pt-5 pb-10">
      <Heading />
      <Banner />
      <DashboardCategorySection />
      <TemplateSection page="4" show={false} templateNumber={4}/>
      <ProjectSection projectNumber={5}  />
      
    </div>
  );
}
