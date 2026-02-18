import CodeSnippet from "@/components/renderers/CodeSnippet";

type CodeBlockProps = {
  title: string;
  language: string;
  code: string;
};

export default function CodeBlock({ title, language, code }: CodeBlockProps) {
  return <CodeSnippet title={title} language={language} code={code} />;
}
