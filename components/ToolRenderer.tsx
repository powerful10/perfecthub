import ToolCalculator from "@/components/tools/ToolCalculator";
import type { ToolType } from "@/lib/content";

type ToolRendererProps = {
  toolType?: ToolType;
};

export default function ToolRenderer({ toolType }: ToolRendererProps) {
  return <ToolCalculator toolType={toolType} />;
}
