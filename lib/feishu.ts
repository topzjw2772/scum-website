// 飞书 API 封装
// 文档: https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/document/list

const FEISHU_APP_ID = process.env.FEISHU_APP_ID || 'cli_a921a1ecb1b8dbcd';
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || 'ryY7jYYjZIvySwbynRqrYfkYHEEL5Llq';
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';

// Token 缓存
let tokenCache: { token: string; expireAt: number } | null = null;

/**
 * 获取 tenant_access_token
 * 文档: https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant-access-token
 */
export async function getTenantAccessToken(): Promise<string> {
  // 检查缓存
  if (tokenCache && Date.now() < tokenCache.expireAt) {
    return tokenCache.token;
  }

  const response = await fetch(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get tenant access token: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  // 缓存 token，提前 5 分钟过期
  tokenCache = {
    token: data.tenant_access_token,
    expireAt: Date.now() + (data.expire - 300) * 1000,
  };

  return data.tenant_access_token;
}

/**
 * 读取文档内容
 * 文档: https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/document-content/get
 */
export async function getDocumentContent(docToken: string): Promise<{
  title: string;
  content: any[];
}> {
  const token = await getTenantAccessToken();

  const response = await fetch(`${FEISHU_API_BASE}/docx/v1/documents/${docToken}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get document: ${response.status}`);
  }

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  return {
    title: data.data.document.title || '',
    content: data.data.document.content || [],
  };
}

/**
 * 将飞书文档 blocks 转换为 Markdown
 */
export function blocksToMarkdown(blocks: any[], title: string): string {
  let markdown = `# ${title}\n\n`;

  for (const block of blocks) {
    markdown += blockToMarkdown(block);
  }

  return markdown;
}

function blockToMarkdown(block: any): string {
  const type = block.type;
  const content = block[type] || block;

  switch (type) {
    case 'paragraph':
      return `${richTextToMarkdown(content.rich_text || [])}\n\n`;
    
    case 'heading1':
    case 'heading_1':
      return `## ${richTextToMarkdown(content.rich_text || [])}\n\n`;
    
    case 'heading2':
    case 'heading_2':
      return `### ${richTextToMarkdown(content.rich_text || [])}\n\n`;
    
    case 'heading3':
    case 'heading_3':
      return `#### ${richTextToMarkdown(content.rich_text || [])}\n\n`;
    
    case 'bullet':
    case 'bullet_list_item':
      return `- ${richTextToMarkdown(content.rich_text || [])}\n`;
    
    case 'ordered':
    case 'ordered_list_item':
      return `1. ${richTextToMarkdown(content.rich_text || [])}\n`;
    
    case 'code':
      const language = content.language || '';
      return `\`\`\`${language}\n${richTextToMarkdown(content.rich_text || [])}\n\`\`\`\n\n`;
    
    case 'quote':
      return `> ${richTextToMarkdown(content.rich_text || [])}\n\n`;
    
    case 'divider':
      return `---\n\n`;
    
    case 'image':
      const imageToken = content.token || '';
      return `![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/v2/cover/${imageToken}/?height=400)\n\n`;
    
    case 'table':
      return handleTable(block) || '';
    
    default:
      // 尝试处理 rich_text
      if (content.rich_text) {
        return `${richTextToMarkdown(content.rich_text)}\n\n`;
      }
      return '';
  }
}

function richTextToMarkdown(richText: any[]): string {
  if (!Array.isArray(richText)) return '';

  return richText.map((item) => {
    const text = item.text?.content || item.content || '';
    const annotations = item.text?.annotations || item.annotations || {};

    let result = text;
    
    if (annotations.bold) result = `**${result}**`;
    if (annotations.italic) result = `*${result}*`;
    if (annotations.strikethrough) result = `~~${result}~~`;
    if (annotations.code) result = `\`${result}\``;
    
    return result;
  }).join('');
}

function handleTable(block: any): string {
  const rows = block.table?.rows || [];
  if (rows.length === 0) return '';

  let markdown = '';
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells || [];
    const cellTexts = cells.map((cell: any[]) => richTextToMarkdown(cell));
    markdown += `| ${cellTexts.join(' | ')} |\n`;
    
    // 添加表头分隔符
    if (i === 0) {
      markdown += `| ${cells.map(() => '---').join(' | ')} |\n`;
    }
  }

  return markdown + '\n';
}

/**
 * 列出云盘文件
 * 文档: https://open.feishu.cn/document/server-docs/docs/drive-v1/media/batch_query
 */
export async function listDriveFiles(folderToken?: string): Promise<any[]> {
  const token = await getTenantAccessToken();
  
  let url = `${FEISHU_API_BASE}/drive/v1/files?page_size=50`;
  if (folderToken) {
    url = `${FEISHU_API_BASE}/drive/v1/files?folder_token=${folderToken}&page_size=50`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list files: ${response.status}`);
  }

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  return data.data.files || [];
}

/**
 * 搜索文件
 */
export async function searchFiles(query: string): Promise<any[]> {
  const token = await getTenantAccessToken();

  const response = await fetch(`${FEISHU_API_BASE}/search/v1/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      search_type: 2, // 文档类型
      page_size: 50,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to search files: ${response.status}`);
  }

  const data = await response.json();

  if (data.code !== 0) {
    throw new Error(`Feishu API error: ${data.msg}`);
  }

  return data.data.files || [];
}

// 类型定义
export interface FeishuFile {
  token: string;
  name: string;
  type: string;
  created_time: string;
  updated_time: string;
}

export interface DocumentMeta {
  token: string;
  title: string;
  updatedTime: string;
}
