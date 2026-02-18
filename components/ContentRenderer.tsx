import GuideRenderer from "@/components/renderers/GuideRenderer";
import TemplateRenderer from "@/components/renderers/TemplateRenderer";
import PromptRenderer from "@/components/renderers/PromptRenderer";
import CodeBlock from "@/components/CodeBlock";
import type { ContentRecord } from "@/lib/content";

type ContentRendererProps = {
  item: ContentRecord;
};

export default function ContentRenderer({ item }: ContentRendererProps) {
  if (item.category === "prompts") {
    return <PromptRenderer prompts={Array.isArray(item.prompts) ? item.prompts : []} />;
  }

  if (item.category === "templates") {
    return (
      <TemplateRenderer templateText={item.templateText} sections={item.sections} />
    );
  }

  if (item.category === "guides") {
    return <GuideRenderer sections={item.sections} />;
  }

  if (item.category === "code") {
    return (
      <div className="space-y-6">
        {(item.codeBlocks ?? []).map((block) => (
          <CodeBlock
            key={`${block.title}-${block.language}`}
            title={block.title}
            language={block.language}
            code={block.code}
          />
        ))}
      </div>
    );
  }

  return <GuideRenderer sections={item.sections} />;
}
