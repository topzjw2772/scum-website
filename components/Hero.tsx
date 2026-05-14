interface HeroProps {
  serverName?: string;
  version?: string;
  description?: string;
  isOnline?: boolean;
}

export default function Hero({
  serverName = 'SCUM 私服',
  version = 'v1.0.0',
  description = '24小时在线 | 原版体验 | 公平竞技',
  isOnline = true,
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Server Icon */}
          <div className="mb-6 inline-block">
            <span className="text-7xl">🎮</span>
          </div>

          {/* Server Name */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {serverName}
          </h1>

          {/* Version Badge */}
          <div className="inline-block mb-6">
            <span className="bg-gray-700 text-gray-200 px-4 py-1 rounded-full text-sm font-medium">
              {version}
            </span>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Status and CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <span
                className={`w-3 h-3 rounded-full ${
                  isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}
              ></span>
              <span className="text-sm font-medium">
                服务器 {isOnline ? '在线' : '离线'}
              </span>
            </div>

            {/* Play Button */}
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg shadow-blue-600/30"
            >
              开始游戏
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}
