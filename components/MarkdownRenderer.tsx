import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-600">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg shadow-md max-w-full h-auto my-4"
            />
          ),
          hr: () => <hr className="border-gray-300 my-8" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-gray-100 px-4 py-2 text-left font-semibold border-b border-gray-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-b border-gray-200">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
