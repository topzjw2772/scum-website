import { Metadata } from 'next';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

// ISR: 每 5 分钟重新验证
export const revalidate = 300;

// 模拟活动数据 - 实际应从飞书读取
const eventsData: Record<string, {
  title: string;
  date: string;
  content: string;
}> = {
  'pvp-contest-001': {
    title: 'PVP 大赛 - 周末争霸赛',
    date: '2026-05-18',
    content: `# PVP 大赛 - 周末争霸赛

## 活动简介

周末 PVP 争霸赛是本月最盛大的活动！来自各个服务器的顶尖玩家将齐聚一堂，争夺最后的荣耀。

## 活动时间

- **报名时间**: 2026年5月15日 - 5月17日
- **比赛时间**: 2026年5月18日 14:00 - 18:00

## 活动规则

1. 参赛者需在活动开始前 30 分钟进入准备区
2. 采用单淘汰赛制
3. 每次对战限时 5 分钟，超时则血量高者获胜
4. 禁止使用任何道具和药品

## 奖励设置

| 名次 | 奖励 |
|-----|------|
| 冠军 | 稀有武器箱 x3 + 游戏货币 5000 |
| 亚军 | 稀有武器箱 x1 + 游戏货币 3000 |
| 季军 | 游戏货币 2000 |
| 参与奖 | 游戏货币 500 |

## 报名方式

1. 加入 QQ 群：590570803
2. 联系管理员报名
3. 提供你的游戏 ID

## 注意事项

- 请确保比赛期间网络稳定
- 服从裁判判决，如有异议赛后申诉
- 最终解释权归服务器所有

---

**祝你取得好成绩！**`,
  },
  'treasure-hunt-001': {
    title: '寻宝活动 - 探索遗迹',
    date: '2026-05-15',
    content: `# 寻宝活动 - 探索遗迹

## 活动简介

古老的遗迹中隐藏着无尽的宝藏！参与寻宝活动，收集藏宝图碎片，兑换珍贵道具。

## 活动时间

2026年5月15日 全天

## 活动规则

1. 在地图各区域寻找藏宝图碎片
2. 收集 10 个碎片可兑换一个宝箱
3. 每人每天最多兑换 3 个宝箱

## 奖励

- 藏宝图碎片：地图随机位置刷新
- 宝箱内容：游戏道具、货币、稀有装备

---

**探索未知，发现惊喜！**`,
  },
  'craft-competition-001': {
    title: '装备制作大赛',
    date: '2026-05-10',
    content: `# 装备制作大赛

## 活动简介

展示你的工匠技艺！参加装备制作大赛，评选最佳装备设计师。

## 活动时间

作品提交：2026年5月5日 - 5月9日
评选时间：2026年5月10日

## 参赛要求

1. 制作任意一件装备（武器、防具、工具等）
2. 拍摄清晰的游戏内截图
3. 附上简短说明（制作材料、工匠思路）

## 奖励

- 最佳工匠：限定称号 + 稀有材料包
- 优秀作品：游戏货币 2000
- 参与奖：游戏货币 500

---

**展现你的创意和技艺！**`,
  },
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData[slug];
  
  if (!event) {
    return {
      title: '活动不存在 - SCUM 私服',
    };
  }

  return {
    title: `${event.title} - SCUM 私服`,
    description: event.content.slice(0, 100),
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = eventsData[slug];

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center text-purple-100 hover:text-white mb-4"
          >
            ← 返回活动列表
          </Link>
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <p className="text-purple-100">
            活动日期: {event.date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <MarkdownRenderer content={event.content} />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/events"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            返回活动列表
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(eventsData).map((slug) => ({
    slug,
  }));
}
