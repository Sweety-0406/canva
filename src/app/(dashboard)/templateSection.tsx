"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetTemplates } from "@/features/editor/hooks/useGetTemplates";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import usePaywall from "@/features/editor/hooks/usePaywall";

import TemplateCard from "./templateCard";
import TemplateSkeleton from "./templateSkeleton";
import CategorySection from "./categorySection";
import { projectType, templateType } from "@/features/editor/types";
import NotFoundData from "@/features/editor/components/not-found-data";
import ErrorPage from "@/features/editor/components/error";

interface TemplateSectionProps {
  page?: string;
  show: boolean;
  templateNumber: number;
  templateName?: string;
}

const TemplateSection = ({ page = "10", show, templateNumber, templateName }: TemplateSectionProps) => {
  const router = useRouter();
  const mutation = useCreateProject();
  const paywall = usePaywall();

  const { data, isLoading, isError } = useGetTemplates("1", page);
  const [filteredData, setFilteredData] = useState<projectType[]>([]);

  const onClick = (template: templateType["data"][0]) => {
    console.log(data)
    if (template.isPro && paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }
    mutation.mutate(
      {
        name: `${template.name} copy`,
        json: template.jsons[0].json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  useEffect(() => {
    if (templateName && data) {
      const filtered = data.filter((d: projectType) =>
        d.tag?.toLowerCase().includes(templateName.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [templateName, data]);

  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        {show ? (
          <h3 className="font-semibold text-3xl">Start from a template</h3>
        ) : (
          <div className="text-xl font-semibold mt-4 mb-4">What&apos;s new</div>
        )}
        <TemplateSkeleton templateNumber={templateNumber} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        {show ? (
          <h3 className="font-semibold text-3xl">Start from a template</h3>
        ) : (
          <div className="text-xl font-semibold mt-4 mb-4">What&apos;s new</div>
        )}
        <ErrorPage isShow={false}/>
      </div>
    );
  }

  if (!data?.length) {
    return <NotFoundData title="No templates found" description="Try adjusting your filters or check back later for new templates." />;
  }

  if (templateName  && !filteredData?.length) {
    return <NotFoundData title="No templates found" description="Try adjusting your filters or check back later for new templates." />;
  }

  const templatesToRender = templateName ? filteredData : data;

  return (
    <div className="mb-4">
      {show && (
        <>
          <h3 className="font-bold text-3xl mt-4 mb-4">Templates</h3>
          <CategorySection />
          <h3 className="font-semibold text-2xl mt-4 mb-4">Start Exploring</h3>
        </>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 pb-4 mt-4 gap-4">
        {templatesToRender.map((template: projectType) => (
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
};

export default TemplateSection;
