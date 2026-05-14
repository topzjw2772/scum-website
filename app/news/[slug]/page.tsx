import { Metadata } from 'next';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

// ISR: 每 5 分钟重新验证
export const revalidate = 300;

// 模拟新闻数据 - 实际应从飞书读取
const newsData: Record<string, {
  title: string;
  publishDate: string;
  content: string;
}> = {
  'server-update-001': {
    title: '服务器更新 v1.2.0',
    publishDate: '2026-05-12',
    content: `# 服务器更新 v1.2.0

## 更新简介

本次更新为服务器带来了多项重要改进，包括新地图区域、装备平衡调整和问题修复。

## 新增内容

### 🗺️ 新地图区域

- **北部森林**：新增一片茂密的森林区域，适合潜行和伏击
- **废弃工厂**：工业风格的建筑群，适合据点防守
- **海边小镇**：提供丰富的海上资源和船只

### ⚔️ 新装备

- 新型突击步枪及配件
- 战术防弹背心
- 医疗用品更新

## 平衡调整

1. 近战武器伤害上调 10%
2. 装甲耐久度调整
3. 资源采集效率优化

## 问题修复

- 修复了服务器崩溃的 bug
- 修复了物品消失的问题
- 优化了网络延迟

## 服务器信息

- 游戏版本：v1.2.0
- 更新大小：约 500MB
- 更新时间：2026年5月12日 08:00

---

**如遇到问题，请通过 QQ 群联系我们。**`,
  },
  'maintenance-001': {
    title: '服务器维护通知',
    publishDate: '2026-05-08',
    content: `# 服务器维护通知

## 维护时间

**2026年5月10日 00:00 - 06:00**（预计6小时）

## 维护内容

1. **硬件升级**：服务器硬盘扩容，提高读写性能
2. **系统更新**：操作系统安全补丁更新
3. **网络优化**：带宽升级，降低延迟
4. **数据备份**：完整数据备份

## 注意事项

- 维护期间服务器将完全关闭
- 请提前做好下线准备
- 维护时间可能根据实际情况调整

## 补偿方案

维护结束后，所有在线玩家将获得：
- 游戏货币 1000
- 经验加成卡 x1（24小时）

---

**感谢您的耐心等待！**`,
  },
  'new-season-001': {
    title: '新赛季开启公告',
    publishDate: '2026-05-01',
    content: `# 新赛季开启公告

## Season 3：荒野求生

全新的赛季正式开启！这一次，我们将带你进入更加残酷的荒野世界。

## 新赛季特色

### 🌟 赛季专属奖励

- 限定角色皮肤
- 稀有装备套装
- 专属称号

### 📊 赛季积分系统

通过参与活动和 PVP 获得积分，提升赛季等级，解锁丰厚奖励。

### 🎯 新玩法

- 动态事件系统
- 每周挑战任务
- 赛季专属地图

## 赛季时间

- 开始时间：2026年5月1日
- 结束时间：2026年7月31日
- 时长：约 3 个月

## 继承规则

上赛季的积分将按照一定比例继承到新赛季。

---

**新赛季，新挑战！祝你玩得开心！**`,
  },
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = newsData[slug];
  
  if (!news) {
    return {
      title: '新闻不存在 - SCUM 私服',
    };
  }

  return {
    title: `${news.title} - SCUM 私服`,
    description: news.content.slice(0, 100),
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = newsData[slug];

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center text-green-100 hover:text-white mb-4"
          >
            ← 返回新闻列表
          </Link>
          <h1 className="text-4xl font-bold mb-2">{news.title}</h1>
          <p className="text-green-100">
            发布日期: {news.publishDate}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <MarkdownRenderer content={news.content} />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            返回新闻列表
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(newsData).map((slug) => ({
    slug,
  }));
}
