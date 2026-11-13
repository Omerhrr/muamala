import ReactMarkdown from "react-markdown";

/** Styled markdown renderer for CMS-authored pages and news bodies. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        components={{
          h1: (props) => (
            <h1 className="mt-10 font-serif text-3xl font-bold text-brand-900 first:mt-0" {...props} />
          ),
          h2: (props) => (
            <h2 className="mt-10 font-serif text-2xl font-bold text-brand-900 first:mt-0" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-8 text-lg font-bold text-brand-900 first:mt-0" {...props} />
          ),
          p: (props) => <p className="mt-4 leading-relaxed text-foreground/85" {...props} />,
          strong: (props) => <strong className="font-bold text-brand-900" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
          ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />,
          li: (props) => <li className="leading-relaxed text-foreground/85" {...props} />,
          a: (props) => (
            <a className="font-semibold text-brand-700 underline hover:text-gold-600" {...props} />
          ),
          hr: () => <hr className="mt-8 border-border" />,
          blockquote: (props) => (
            <blockquote
              className="mt-6 border-l-4 border-gold-400 bg-gold-50 px-5 py-3 text-sm italic text-brand-900"
              {...props}
            />
          ),
          table: (props) => (
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: (props) => <thead className="bg-brand-800 text-white" {...props} />,
          th: (props) => (
            <th className="border-b border-border px-4 py-2.5 text-left font-bold" {...props} />
          ),
          td: (props) => <td className="border-b border-border px-4 py-2.5" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
