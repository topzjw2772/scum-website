import Link from 'next/link';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import ActivityCard from '@/components/ActivityCard';
import NewsCard from '@/components/NewsCard';
import { getDocumentContent, blocksToMarkdown } from '@/lib/feishu';
import { getCache, setCache } from '@/lib/cache';

// ISR: 每 5 分钟重新验证
export const revalidate = 300;

const features = [
  { icon: '⚡', title: '低配优化', description: '专为低配置主机优化，让更多玩家能够流畅游戏' },
  { icon: '🎮', title: '原版体验', description: '保留原版游戏内容，提供最纯正的游戏体验' },
  { icon: '🏆', title: '公平竞技', description: '严格的反作弊系统，保证公平的游戏环境' },
  { icon: '🎉', title: '活动频繁', description: '定期举办各类活动，奖励丰厚，玩法多样' },
  { icon: '👶', title: '新手友好', description: '新手教程完善，老玩家耐心指导，快速融入游戏' },
  { icon: '🕐', title: '24小时在线', description: '服务器全天候运行，随时随地进入游戏世界' },
];

// 模拟数据 - 实际应从飞书读取
const latestActivities = [
  {
    slug: 'pvp-contest-001',
    title: 'PVP 大赛 - 周末争霸赛',
    date: '2026-05-18',
    description: '周末 PVP 争霸赛，奖励丰厚，包括游戏道具和现金奖励。',
  },
  {
    slug: 'treasure-hunt-001',
    title: '寻宝活动 - 探索遗迹',
    date: '2026-05-15',
    description: '在规定时间内寻找藏宝图碎片，兑换珍贵道具。',
  },
  {
    slug: 'craft-competition-001',
    title: '装备制作大赛',
    date: '2026-05-10',
    description: '展示你的装备制作技巧，评选最佳工匠。',
  },
];

const latestNews = [
  {
    slug: 'server-update-001',
    title: '服务器更新 v1.2.0',
    publishDate: '2026-05-12',
    summary: '本次更新新增了多个地图区域，修复了已知的游戏问题。',
  },
  {
    slug: 'maintenance-001',
    title: '服务器维护通知',
    publishDate: '2026-05-08',
    summary: '本周三上午将进行例行维护，预计持续 2 小时。',
  },
];

export default async function HomePage() {
  // 尝试从飞书读取服规预览
  let rulesPreview = '';
  try {
    const cached = getCache<string>('home:rules-preview');
    if (cached) {
      rulesPreview = cached;
    } else {
      // 读取飞书文档 - 使用示例 token
      const doc = await getDocumentContent('YHKCd9Yk2ozLZ4xG1mPcfVoPnfe');
      const markdown = blocksToMarkdown(doc.content, doc.title);
      rulesPreview = markdown.slice(0, 500) + '...';
      setCache('home:rules-preview', rulesPreview, 300);
    }
  } catch (error) {
    console.error('Failed to fetch rules:', error);
    rulesPreview = '服务器规则加载中...';
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">服务器特色</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              为什么选择我们的服务器？这里有你想要的一切
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">最新活动</h2>
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部活动 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestActivities.map((activity) => (
              <ActivityCard
                key={activity.slug}
                slug={activity.slug}
                title={activity.title}
                date={activity.date}
                description={activity.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">新闻公告</h2>
            <Link
              href="/news"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部新闻 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.map((news) => (
              <NewsCard
                key={news.slug}
                slug={news.slug}
                title={news.title}
                publishDate={news.publishDate}
                summary={news.summary}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rules Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">服规预览</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              请在加入服务器前仔细阅读服务器规则
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 max-w-3xl mx-auto mb-8">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {rulesPreview}
            </pre>
          </div>
          
          <div className="text-center">
            <Link
              href="/rules"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
            >
              查看完整服规
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
