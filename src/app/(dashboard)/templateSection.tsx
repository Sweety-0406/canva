"use client"

import { useGetTemplates } from "@/features/editor/hooks/useGetTemplates";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import TemplateCard from "./templateCard";
import { projectType, templateType } from "@/features/editor/types";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import usePaywall from "@/features/editor/hooks/usePaywall";
import TemplateSkeleton from "./templateSkeleton";
import CategorySection from "./categorySection";
interface TemplateSectionProps{
  page?:string,
  show:boolean,
  templateNumber: number
}

const TemplateSection = ({page="10", show, templateNumber}:TemplateSectionProps)=>{
    const router = useRouter(); 
    const mutation = useCreateProject();
    const paywall = usePaywall()
  
    const { 
      data, 
      isLoading, 
      isError
    } = useGetTemplates("1",page);
  
    const onClick = (template: templateType["data"][0]) => {
      console.log(paywall.shouldBlock)
      if(template.isPro && paywall.shouldBlock){
        paywall.triggerPaywall()
        return;
      }
      mutation.mutate(
        {
          name: `${template.name} project`,
          json: template.json,
          width: template.width,
          height: template.height,
        },
        {
          onSuccess: ({ data }) => {
            router.push(`/editor/${data.id}`);
          },
        },
      );
    };
  
    if (isLoading) {
      return (
        <div className="space-y-4 mb-8">
          {show?(
            <h3 className="font-semibold text-3xl">
              Start from a template
            </h3>
          ):(
            <div className="text-xl font-semibold mt-4 mb-4">
              What&apos;s new
            </div>
          )}
          <TemplateSkeleton templateNumber={templateNumber} />
        </div>
      );
    }
  
    if (isError) {
      return (
        <div className="space-y-4 ">
          {show?(
            <h3 className="font-semibold text-3xl">
              Start from a template
            </h3>
          ):(
            <div className="text-xl font-semibold mt-4 mb-4">
              What&apos;s new
            </div>
          )}
          <div className="flex flex-col gap-y-4 items-center justify-center h-32">
            <TriangleAlert className="size-6 text-muted-foreground" />
            <p>
              Failed to load templates
            </p>
          </div>
        </div>
      );
    }
  
    if (!data?.length) {
      return (
        <div>no data</div>
      );
    }
  
    return (
      <div className="mb-4">
        {show? (
          <>
            <h3 className="font-bold text-3xl mt-4 mb-4">
              Templates
            </h3>
            <CategorySection />
            <h3 className="font-semibold text-2xl mt-4 mb-4">
              Start Exploring
            </h3>
          </>
        ):(
          <div className="text-xl font-semibold mt-4 mb-4">
            What&apos;s new
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
          {data?.map((template: projectType) => (
            <TemplateCard
              key={template.id}
              title={template.name}
              imageSrc={template.thumbnailUrl || ""}
              onClick={() => onClick(template)}
              disabled={mutation.isPending}
              description={`${template.width} x ${template.height} px`}
              width={template.width}
              height={template.height}
              isPro={template.isPro}
            />
          ))}
        </div>
      </div>
    );
}

export default TemplateSection