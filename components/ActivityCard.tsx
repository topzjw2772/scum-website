import Link from 'next/link';

interface ActivityCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export default function ActivityCard({
  slug,
  title,
  date,
  description,
  image,
}: ActivityCardProps) {
  return (
    <Link href={`/events/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-5xl">🎉</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Date Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
            {date}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-3">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
