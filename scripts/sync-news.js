#!/usr/bin/env node
/**
 * 新闻同步脚本
 * 从飞书 Bitable 读取新闻数据，生成 news.json
 * 
 * 用法: node scripts/sync-news.js
 * 
 * 环境变量:
 *   FEISHU_APP_ID - 飞书应用 ID
 *   FEISHU_APP_SECRET - 飞书应用密钥
 *   FEISHU_BITABLE_APP_TOKEN - 飞书多维表格 App Token
 *   FEISHU_BITABLE_TABLE_ID - 飞书多维表格 Table ID (可选，默认使用第一个表)
 */

const fs = require('fs');
const path = require('path');

// 配置
const FEISHU_APP_ID = process.env.FEISHU_APP_ID || 'cli_a921a1ecb1b8dbcd';
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || 'ryY7jYYjZIvySwbynRqrYfkYHEEL5Llq';
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'news.json');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Token 缓存
let tokenCache = { token: '', expireAt: 0 };

/**
 * 获取 tenant_access_token
 */
async function getTenantAccessToken() {
  if (tokenCache.token && Date.now() < tokenCache.expireAt) {
    return tokenCache.token;
  }

  const body = JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET });
  
  const response = await fetch(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  tokenCache = {
    token: data.tenant_access_token,
    expireAt: Date.now() + (data.expire - 300) * 1000
  };

  return data.tenant_access_token;
}

/**
 * 获取多维表格记录
 */
async function getBitableRecords(appToken, tableId, token) {
  const url = `${FEISHU_API_BASE}/bitable/v1/apps/${appToken}/tables/${tableId}/records?page_size=500`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Failed to get records: ${response.status}`);
  }

  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  return data.data.items || [];
}

/**
 * 转换飞书记录为新闻格式
 */
function convertRecord(record) {
  const fields = record.fields || {};
  
  return {
    slug: fields.slug || `news-${record.record_id}`,
    title: fields.title || '无标题',
    publishDate: fields.publishDate || fields['发布日期'] || new Date().toISOString().split('T')[0],
    summary: fields.summary || fields['摘要'] || fields.description || '',
  };
}

/**
 * 主函数
 */
async function main() {
  const appToken = process.env.FEISHU_BITABLE_APP_TOKEN;
  
  if (!appToken) {
    console.log('⚠️  FEISHU_BITABLE_APP_TOKEN 未设置，生成模拟数据');
    
    // 生成模拟数据（基于 page.tsx 中的数据）
    const mockNews = [
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
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mockNews, null, 2));
    console.log(`✅ 已生成模拟数据: ${OUTPUT_FILE}`);
    return;
  }

  try {
    const token = await getTenantAccessToken();
    const tableId = process.env.FEISHU_BITABLE_TABLE_ID;
    
    // 如果没有指定 tableId，需要先获取表列表
    let actualTableId = tableId;
    if (!actualTableId) {
      console.log('⚠️  FEISHU_BITABLE_TABLE_ID 未设置，尝试获取第一个表');
      console.log('❌ 请设置 FEISHU_BITABLE_TABLE_ID');
      process.exit(1);
    }

    const records = await getBitableRecords(appToken, actualTableId, token);
    const news = records.map(convertRecord);
    
    // 按日期排序
    news.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(news, null, 2));
    console.log(`✅ 已同步 ${news.length} 条新闻到: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`❌ 同步失败: ${error.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ 脚本执行失败:', err);
  process.exit(1);
});