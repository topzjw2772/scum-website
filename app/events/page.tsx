import { Metadata } from 'next';
import Link from 'next/link';
import ActivityCard from '@/components/ActivityCard';
import { getCache, setCache } from '@/lib/cache';

export const metadata: Metadata = {
  title: '活动中心 - SCUM 私服',
  description: 'SCUM 游戏服务器最新活动',
};

// ISR: 每 60 秒重新验证
export const revalidate = 60;

// 模拟活动数据 - 实际应从飞书读取
const allActivities = [
  {
    slug: 'pvp-contest-001',
    title: 'PVP 大赛 - 周末争霸赛',
    date: '2026-05-18',
    description: '周末 PVP 争霸赛，奖励丰厚，包括游戏道具和现金奖励。参与即有机会获得稀有装备！',
  },
  {
    slug: 'treasure-hunt-001',
    title: '寻宝活动 - 探索遗迹',
    date: '2026-05-15',
    description: '在规定时间内寻找藏宝图碎片，兑换珍贵道具。地图随机刷新，寻找你的幸运之地！',
  },
  {
    slug: 'craft-competition-001',
    title: '装备制作大赛',
    date: '2026-05-10',
    description: '展示你的装备制作技巧，评选最佳工匠。入围作品将在官网展示，还有实物奖励！',
  },
  {
    slug: 'survival-challenge-001',
    title: '生存挑战赛',
    date: '2026-05-05',
    description: '极限生存挑战，在规定时间内看谁收集资源最多。考验你的生存技能和资源管理能力！',
  },
  {
    slug: 'base-design-001',
    title: '基地设计大赛',
    date: '2026-04-28',
    description: '发挥你的建筑才能，设计最独特的基地。获奖作品将获得游戏内货币奖励。',
  },
  {
    slug: 'scavenger-hunt-001',
    title: ' scavenger hunt',
    date: '2026-04-20',
    description: '根据线索在地图上寻找指定物品，考验你的探索能力和对地图的熟悉程度。',
  },
];

export default async function EventsPage() {
  // 尝试从缓存获取
  let activities = allActivities;
  try {
    const cached = getCache<typeof allActivities>('events:list');
    if (cached) {
      activities = cached;
    } else {
      setCache('events:list', activities, 60);
    }
  } catch (error) {
    console.error('Cache error:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">🎉 活动中心</h1>
          <p className="text-purple-100">参与活动，赢取丰厚奖励</p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.slug}
              slug={activity.slug}
              title={activity.title}
              date={activity.date}
              description={activity.description}
            />
          ))}
        </div>

        {/* Empty State */}
        {activities.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📭</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">暂无活动</h2>
            <p className="text-gray-600">敬请期待，即将推出更多精彩活动！</p>
          </div>
        )}
      </div>

      {/* Past Events CTA */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            更多往期活动回顾，请关注我们的 QQ 群公告
          </p>
          <a
            href="https://qm.qq.com/cgi-bin/qm/qr?k=placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            加入 QQ 群获取第一手活动资讯 →
          </a>
        </div>
      </div>
    </div>
  );
}
