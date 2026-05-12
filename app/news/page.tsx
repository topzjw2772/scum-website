import { Metadata } from 'next';
import NewsCard from '@/components/NewsCard';
import { getCache, setCache } from '@/lib/cache';

export const metadata: Metadata = {
  title: '新闻公告 - SCUM 私服',
  description: 'SCUM 游戏服务器最新新闻和公告',
};

// ISR: 每 60 秒重新验证
export const revalidate = 60;

// 模拟新闻数据 - 实际应从飞书读取
const allNews = [
  {
    slug: 'server-update-001',
    title: '服务器更新 v1.2.0',
    publishDate: '2026-05-12',
    summary: '本次更新新增了多个地图区域，修复了已知的游戏问题，优化了服务器性能。',
  },
  {
    slug: 'maintenance-001',
    title: '服务器维护通知',
    publishDate: '2026-05-08',
    summary: '本周三上午将进行例行维护，预计持续 2 小时，届时服务器将暂时关闭。',
  },
  {
    slug: 'new-season-001',
    title: '新赛季开启公告',
    publishDate: '2026-05-01',
    summary: '全新赛季正式开始！新赛季加入了新地图、新装备和新玩法，奖励全面升级。',
  },
  {
    slug: 'anti-cheat-update-001',
    title: '反作弊系统升级',
    publishDate: '2026-04-25',
    summary: '为了维护公平的游戏环境，我们升级了反作弊系统，将严厉打击外挂使用者。',
  },
  {
    slug: 'activity-calendar-001',
    title: '五月活动日历发布',
    publishDate: '2026-04-20',
    summary: '五月精彩活动提前揭晓！PVP大赛、寻宝活动、制作大赛等多个活动等你参与。',
  },
  {
    slug: 'server-migration-001',
    title: '服务器迁移通知',
    publishDate: '2026-04-15',
    summary: '服务器将于本周末进行硬件升级迁移，届时可能会有短暂的服务中断。',
  },
];

export default async function NewsPage() {
  // 尝试从缓存获取
  let news = allNews;
  try {
    const cached = getCache<typeof allNews>('news:list');
    if (cached) {
      news = cached;
    } else {
      setCache('news:list', news, 60);
    }
  } catch (error) {
    console.error('Cache error:', error);
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
