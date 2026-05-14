import { Metadata } from 'next';
import NewsCard from '@/components/NewsCard';
import { getCache, setCache } from '@/lib/cache';

export const metadata: Metadata = {
  title: '新闻公告 - SCUM 私服',
  description: 'SCUM 游戏服务器最新新闻和公告',
};

// ISR: 每 60 秒重新验证
export const revalidate = 60;

interface NewsItem {
  slug: string;
  title: string;
  publishDate: string;
  summary: string;
}

export default async function NewsPage() {
  // 尝试从缓存获取
  let news: NewsItem[] = [];
  try {
    const cached = getCache<NewsItem[]>('news:list');
    if (cached) {
      news = cached;
    } else {
      // 从静态 JSON 文件获取
      const res = await fetch('/data/news.json', { next: { revalidate: 60 } });
      if (res.ok) {
        news = await res.json();
        setCache('news:list', news, 60);
      }
    }
  } catch (error) {
    console.error('News fetch error:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">📰 新闻公告</h1>
          <p className="text-green-100">了解服务器最新动态</p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <NewsCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              publishDate={item.publishDate}
              summary={item.summary}
            />
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📭</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">暂无新闻</h2>
            <p className="text-gray-600">敬请期待更多精彩内容！</p>
          </div>
        )}
      </div>
    </div>
  );
}