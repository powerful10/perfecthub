import ContentRenderer from "@/components/ContentRenderer";
import BuildPromptPackRenderer from "@/components/renderers/BuildPromptPackRenderer";
import GuideRenderer from "@/components/renderers/GuideRenderer";
import ToolRenderer from "@/components/ToolRenderer";
import type { ContentRecord } from "@/lib/content";

type CategoryContentRendererProps = {
  item: ContentRecord;
};

export default function CategoryContentRenderer({
  item,
}: CategoryContentRendererProps) {
  if (item.category === "tools") {
    return (
      <div className="space-y-6">
        <ToolRenderer toolType={item.toolType} />
        {item.sections?.length ? <GuideRenderer sections={item.sections} /> : null}
      </div>
    );
  }

  if (item.category === "build") {
    return (
      <div className="space-y-6">
        <BuildPromptPackRenderer
          prompts={!Array.isArray(item.prompts) ? item.prompts : undefined}
          inspiredBy={item.inspiredBy}
        />
        {item.sections?.length ? <GuideRenderer sections={item.sections} /> : null}
      </div>
    );
  }

  return <ContentRenderer item={item} />;
}
