interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
