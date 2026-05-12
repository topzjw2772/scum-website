# SCUM 服务器官网 PRD

## 1. 项目概述

### 1.1 项目背景
- **域名**: scum.starord.com
- **项目类型**: 游戏服务器宣传展示官网
- **核心用途**: 展示 SCUM 服务器私服介绍、服务器规则、活动发布、新闻公告
- **内容管理**: 后台使用飞书文档，前端自建展示站

### 1.2 技术架构

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 前端框架 | Next.js 14 (App Router) | SSR/ISR 支持，SEO 友好 |
| 样式方案 | TailwindCSS | 原子化 CSS，快速开发 |
| 数据源 | 飞书文档 API | 文档作为 CMS |
| 部署环境 | 阿里云服务器 + Nginx | 静态托管 + 反向代理 |
| SSL | Let's Encrypt / 阿里云证书 | HTTPS 支持 |

---

## 2. 页面结构设计

### 2.1 页面清单

| 页面 | 路由 | 描述 |
|------|------|------|
| 首页 | `/` | 服务器介绍、最新动态入口 |
| 服规页 | `/rules` | 服务器规则展示 |
| 活动页 | `/events` | 活动列表与详情 |
| 新闻页 | `/news` | 新闻/公告列表 |
| 联系我们 | `/contact` | 联系方式 |

### 2.2 页面结构详解

#### 2.2.1 首页 (`/`)

**Hero 区域**
- 服务器名称: SCUM 私服
- 版本号: v1.0.0
- 一句话介绍
- 服务器状态按钮 (在线/离线指示)
- 开始游戏按钮

**服务器特点**
- 4-6 个特色卡片展示 (低配友好/原版体验/活动频繁/新手友好等)

**最新动态**
- 最近 3 条活动/新闻混排展示
- 卡片形式，点击跳转详情

**服规预览**
- 简要服规列表
- "查看完整服规" 按钮

#### 2.2.2 服规页 (`/rules`)

- 从飞书文档 `YHKCd9Yk2ozLZ4xG1mPcfVoPnfe` 读取内容
- Markdown 渲染
- ISR 定时刷新 (建议 5 分钟)
- 锚点导航 (可选)

#### 2.2.3 活动页 (`/events`)

- 活动列表 (分页，每页 6-9 条)
- 活动卡片: 标题、日期、图片、简要描述
- 点击跳转活动详情
- 活动时间排序 (最新优先)

#### 2.2.4 新闻页 (`/news`)

- 新闻列表 (分页，每页 10 条)
- 新闻卡片: 标题、发布时间、摘要
- 按时间倒序排列

#### 2.2.5 联系我们 (`/contact`)

- 客服 Q 群: 590570803
- 点击复制 / 一键跳转 QQ 群链接
- 其他联系方式 (可选)

---

## 3. 飞书文档结构设计

### 3.1 云盘文件夹结构

```
scum/                          # 根目录
├── index.md                   # 首页内容 (服务器介绍文案)
├── rules.md                   # 服规文档 (token: YHKCd9Yk2ozLZ4xG1mPcfVoPnfe)
├── events/                    # 活动目录
│   ├── event-001.md           # 活动1
│   └── event-002.md           # 活动2
└── news/                      # 新闻目录
    ├── news-001.md            # 新闻1
    └── news-002.md            # 新闻2
```

### 3.2 文档内容格式

#### 首页内容 (`index.md`)
```markdown
# SCUM 私服

## 服务器介绍
服务器版本: v1.0.0
开放时间: 24小时

## 服务器特点
- 低配优化
- 原版体验
- 公平竞技
```

#### 活动文档格式 (`events/event-001.md`)
```markdown
# 活动标题

- 日期: 2024-01-15
- 奖励: 1000金币
- 参与方式: 报名参加

## 活动详情
活动描述内容...
```

#### 新闻文档格式 (`news/news-001.md`)
```markdown
# 新闻标题

发布日期: 2024-01-10

## 新闻内容
新闻正文...
```

---

## 4. 功能详细设计

### 4.1 首页模块

| 功能 | 描述 | 数据来源 |
|------|------|---------|
| Hero 展示 | 服务器名称、版本、介绍 | 飞书 index.md |
| 状态指示 | 在线/离线状态 (可硬编码或 API) | 配置文件 |
| 最新动态 | 最近 3 条活动/新闻 | 飞书活动+新闻目录 |

### 4.2 服规模块

| 功能 | 描述 |
|------|------|
| 内容渲染 | 读取飞书文档，转换为 Markdown 渲染 |
| 缓存策略 | ISR，每 5 分钟重新验证 |
| 文档 Token | `YHKCd9Yk2ozLZ4xG1mPcfVoPnfe` |

### 4.3 活动模块

| 功能 | 描述 |
|------|------|
| 活动列表 | 读取 `scum/events/` 目录下所有 .md 文件 |
| 列表排序 | 按文档内日期字段倒序 |
| 分页 | 每页 6 条，URL 分页 (`?page=2`) |
| 活动详情 | 读取单个活动文档全部内容 |

### 4.4 新闻模块

| 功能 | 描述 |
|------|------|
| 新闻列表 | 读取 `scum/news/` 目录下所有 .md 文件 |
| 列表排序 | 按发布日期倒序 |
| 分页 | 每页 10 条 |

### 4.5 联系我们模块

| 功能 | 描述 |
|------|------|
| QQ 群展示 | 590570803 |
| QQ 群跳转 | `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=590570803&card_type=group` |
| 一键复制 | 点击复制群号 |

---

## 5. 技术实现方案

### 5.1 项目结构

```
scum-website/
├── app/
│   ├── page.tsx              # 首页
│   ├── rules/page.tsx        # 服规页
│   ├── events/
│   │   ├── page.tsx          # 活动列表
│   │   └── [slug]/page.tsx   # 活动详情
│   ├── news/
│   │   ├── page.tsx          # 新闻列表
│   │   └── [slug]/page.tsx   # 新闻详情
│   ├── contact/page.tsx      # 联系我们
│   └── layout.tsx            # 根布局
├── components/
│   ├── Header.tsx            # 导航栏
│   ├── Footer.tsx            # 页脚
│   ├── Hero.tsx              # Hero 区域
│   ├── ActivityCard.tsx      # 活动卡片
│   ├── NewsCard.tsx          # 新闻卡片
│   └── MarkdownRenderer.tsx  # Markdown 渲染器
├── lib/
│   ├── feishu.ts             # 飞书 API 封装
│   └── cache.ts             # 缓存工具
├── public/
│   └── icons/               # 图标资源
├── tailwind.config.ts       # Tailwind 配置
├── next.config.js            # Next.js 配置
└── package.json
```

### 5.2 飞书 API 集成

**认证方式**
- tenant_access_token
- 缓存 token，每 1.5 小时刷新

**关键 API**

| 功能 | API | 文档 |
|------|-----|------|
| 读取文件列表 | `GET /drive/v1/files` | 飞书云文档 API |
| 读取文件内容 | `GET /docx/v1/documents/{token}` | 飞书文档 API |
| 搜索文件 | `GET /search/v1/files` | 飞书搜索 API |

### 5.3 缓存策略

| 页面 | 策略 | revalidate |
|------|------|------------|
| 首页 | ISR | 300 秒 (5分钟) |
| 服规 | ISR | 300 秒 |
| 活动列表 | ISR | 60 秒 |
| 活动详情 | ISR | 300 秒 |
| 新闻列表 | ISR | 60 秒 |

### 5.4 部署方案

**构建**
```bash
npm run build
npm run start
```

**Nginx 配置**
```nginx
server {
    listen 80;
    server_name scum.starord.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name scum.starord.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 6. SEO 与性能

### 6.1 SEO 配置

- 每页面独立 `generateMetadata`
- Open Graph / Twitter Card
- Sitemap 生成 (`next-sitemap`)
- Robots.txt

### 6.2 性能目标

| 指标 | 目标 |
|------|------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

### 6.3 优化手段

- 图片: Next.js Image 优化
- 字体: next/font 本地化
- 缓存: 飞书 API 响应缓存

---

## 7. 响应式设计

### 7.1 断点

| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | 640px | 手机横屏 |
| md | 768px | 平板 |
| lg | 1024px | 小屏电脑 |
| xl | 1280px | 桌面 |

### 7.2 移动端优先

- 基础样式针对手机
- `@media (min-width: 768px)` 平板及以上适配

---

## 8. 交付物

### Phase 1: PRD (本文档)
- [x] 功能设计
- [x] 页面结构设计
- [x] 飞书文档结构建议
- [x] 技术方案

### Phase 2: 代码开发
- [ ] Next.js 项目初始化
- [ ] 组件开发
- [ ] 飞书 API 集成
- [ ] 页面开发
- [ ] 部署脚本
- [ ] Nginx 配置
- [ ] 部署文档

---

## 9. 风险与注意事项

1. **飞书 API 限流**: 考虑添加本地缓存层，避免频繁调用
2. **文档 Token 暴露**: 建议通过环境变量存储
3. **移动端适配**: 重点测试服规页的 Markdown 渲染在移动端表现
4. **图片加载**: 飞书文档内图片需通过飞书 CDN 访问，注意外链限制

---

*文档版本: v1.0*
*创建日期: 2026-05-12*
