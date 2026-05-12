import Link from 'next/link';

interface NewsCardProps {
  slug: string;
  title: string;
  publishDate: string;
  summary: string;
}

export default function NewsCard({
  slug,
  title,
  publishDate,
  summary,
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
        {/* Date */}
        <p className="text-sm text-gray-500 mb-2">{publishDate}</p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {summary}
        </p>

        {/* Read More */}
        <div className="mt-3 text-blue-600 text-sm font-medium group-hover:underline">
          阅读全文 →
        </div>
      </article>
    </Link>
  );
}
