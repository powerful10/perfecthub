import CopyButton from "@/components/CopyButton";

type CodeSnippetProps = {
  title: string;
  language: string;
  code: string;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCode(code: string, language: string) {
  let html = escapeHtml(code);
  const lang = language.toLowerCase();

  if (lang === "html") {
    html = html.replace(
      /(&lt;\/?[a-zA-Z0-9-]+)([^&]*?)(&gt;)/g,
      '<span class="text-sky-300">$1</span><span class="text-amber-200">$2</span><span class="text-sky-300">$3</span>',
    );
  } else if (lang === "css") {
    html = html
      .replace(
        /([.#]?[a-zA-Z0-9_-]+)\s*{/g,
        '<span class="text-sky-300">$1</span> {',
      )
      .replace(
        /([a-z-]+)(:\s*[^;]+;)/g,
        '<span class="text-amber-200">$1</span>$2',
      );
  } else {
    html = html
      .replace(
        /\b(const|let|var|function|return|if|else|switch|case|for|while|import|from|export|default|type|interface|class|extends|new|try|catch|async|await)\b/g,
        '<span class="text-fuchsia-300">$1</span>',
      )
      .replace(/(".*?"|'.*?'|`[\s\S]*?`)/g, '<span class="text-emerald-300">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-cyan-300">$1</span>');
  }

  return html;
}

export default function CodeSnippet({ title, language, code }: CodeSnippetProps) {
  return (
    <section className="section-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{language}</p>
        </div>
        <CopyButton text={code} label="Copy code" />
      </div>
      <pre className="overflow-x-auto bg-slate-900 p-5 text-sm leading-7 text-slate-100">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
      </pre>
    </section>
  );
}
