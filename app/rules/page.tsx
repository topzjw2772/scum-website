import { Metadata } from 'next';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getDocumentContent, blocksToMarkdown } from '@/lib/feishu';
import { getCache, setCache } from '@/lib/cache';

export const metadata: Metadata = {
  title: '服务器规则 - SCUM 私服',
  description: 'SCUM 游戏服务器规则说明',
};

// ISR: 每 5 分钟重新验证
export const revalidate = 300;

// 默认服规内容（当飞书 API 不可用时使用）
const defaultRules = `# SCUM 私服服务器规则

## 一、总则

欢迎来到 SCUM 私服！为了给大家提供一个公平、有序的游戏环境，请所有玩家仔细阅读并遵守以下规则。

## 二、游戏规则

### 2.1 禁止行为

- 🚫 使用任何形式的外挂、作弊程序或脚本
- 🚫 利用游戏 bug 获得不公平优势，发现 bug 请及时举报
- 🚫 恶意卡位、卡视角等影响其他玩家的行为
- 🚫 恶意击杀新手玩家（入门前 24 小时）
- 🚫 在游戏中进行任何形式的诈骗

### 2.2 许可行为

- ✅ 正常的 PVP 和 PVE 游戏
- ✅ 建造基地和防御设施
- ✅ 交易和资源交换
- ✅ 组队合作

## 三、处罚措施

| 违规类型 | 第一次 | 第二次 | 第三次 |
|---------|-------|-------|-------|
| 使用外挂 | 封禁 30 天 | 永久封禁 | - |
| 恶意 PK | 警告 | 封禁 7 天 | 永久封禁 |
| 言语攻击 | 警告 | 封禁 1 天 | 永久封禁 |

## 四、申诉流程

如果认为被错误处罚，可以通过以下方式申诉：

1. 加入 QQ 群：590570803
2. 联系管理员说明情况
3. 等待审核结果

## 五、免责声明

- 服务器不对玩家因游戏造成的任何损失负责
- 玩家需对自己的游戏行为负责
- 管理员有权根据实际情况做出裁决

---

**最后更新：2026年5月12日**
`;

export default async function RulesPage() {
  let content = defaultRules;
  
  try {
    const cached = getCache<string>('rules:content');
    if (cached) {
      content = cached;
    } else {
      const doc = await getDocumentContent('YHKCd9Yk2ozLZ4xG1mPcfVoPnfe');
      content = blocksToMarkdown(doc.content, doc.title);
      setCache('rules:content', content, 300);
    }
  } catch (error) {
    console.error('Failed to fetch rules from Feishu:', error);
    // 使用默认规则
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">服务器规则</h1>
          <p className="text-blue-100">请在加入服务器前仔细阅读以下规则</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <MarkdownRenderer content={content} />
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">
            对规则有疑问？联系我们
          </p>
          <a
            href="https://qm.qq.com/cgi-bin/qm/qr?k=placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            加入 QQ 群: 590570803
          </a>
        </div>
      </div>
    </div>
  );
}
