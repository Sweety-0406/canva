"use client"

import { useGetTemplates } from "@/features/editor/hooks/useGetTemplates";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import TemplateCard from "./templateCard";
import { projectType, templateType } from "@/features/editor/types";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import usePaywall from "@/features/editor/hooks/usePaywall";
import Loader from "@/features/editor/components/loader";
interface TemplateSectionProps{
  page?:string,
  r?: string
}

const TemplateSection = ({page="10", r="100"}:TemplateSectionProps)=>{
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
        <div className="space-y-4">
          <h3 className="font-semibold text-3xl">
            Start from a template
          </h3>
          <div className="flex items-center justify-center h-32">
            <div className="flex flex-1  justify-center  items-center">
              <div className=''>
                  <Loader r={r}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    if (isError) {
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-3xl">
            Start from a template
          </h3>
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
      <div>
        <h3 className="font-semibold text-3xl mt-4 mb-4">
          Start from a template
        </h3>
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