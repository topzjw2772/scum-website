# SCUM 私服官网

基于 Next.js 14 + 飞书文档的游戏服务器官方网站

## 🎮 项目简介

SCUM 私服官网用于展示游戏服务器信息、服规、活动和新闻公告。后台使用飞书文档作为 CMS，前端使用 Next.js 构建。

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式方案**: TailwindCSS
- **数据类型**: TypeScript
- **数据源**: 飞书文档 API
- **部署环境**: 阿里云服务器 + Nginx + PM2

## 📁 项目结构

```
scum-website/
├── app/                      # Next.js App Router 页面
│   ├── page.tsx             # 首页
│   ├── rules/               # 服规页
│   ├── events/              # 活动页
│   │   ├── page.tsx         # 活动列表
│   │   └── [slug]/          # 活动详情
│   ├── news/                # 新闻页
│   │   ├── page.tsx         # 新闻列表
│   │   └── [slug]/          # 新闻详情
│   └── contact/             # 联系我们
├── components/              # React 组件
│   ├── Header.tsx          # 导航栏
│   ├── Footer.tsx           # 页脚
│   ├── Hero.tsx             # 首屏区域
│   ├── FeatureCard.tsx      # 特色卡片
│   ├── ActivityCard.tsx     # 活动卡片
│   ├── NewsCard.tsx         # 新闻卡片
│   └── MarkdownRenderer.tsx # Markdown 渲染器
├── lib/                     # 工具库
│   ├── feishu.ts           # 飞书 API 封装
│   ├── cache.ts            # 缓存工具
│   └── types.ts            # 类型定义
├── public/                  # 静态资源
├── nginx.conf              # Nginx 配置
├── deploy.sh               # 部署脚本
└── package.json
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写飞书 API 配置：

```bash
cp .env.example .env.local
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📦 部署

### 阿里云服务器部署

1. **克隆代码到服务器**

```bash
cd /var/www
git clone https://github.com/topzjw2772/scum-website.git
```

2. **安装依赖**

```bash
cd scum-website
npm install
```

3. **配置环境变量**

```bash
cp .env.example .env.local
# 编辑 .env.local 填入飞书 API 配置
```

4. **构建项目**

```bash
npm run build
```

5. **使用 PM2 启动服务**

```bash
npm install -g pm2
pm2 start npm --name scum-website -- start
pm2 save
pm2 startup
```

6. **配置 Nginx**

```bash
sudo cp nginx.conf /etc/nginx/sites-available/scum-website
sudo ln -s /etc/nginx/sites-available/scum-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 使用部署脚本

```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

## ⚙️ 飞书 API 配置

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 创建应用，获取 App ID 和 App Secret
3. 配置应用权限：
   - `docx:document:readonly` - 读取文档
   - `drive:file:readonly` - 读取云盘文件
4. 安装应用到工作空间

## 🔄 ISR 缓存策略

| 页面 | 缓存时间 | 说明 |
|------|---------|------|
| 首页 | 5 分钟 | ServerInfo + 最新动态 |
| 服规 | 5 分钟 | 飞书文档内容 |
| 活动列表 | 1 分钟 | 活动列表 |
| 活动详情 | 5 分钟 | 单个活动内容 |
| 新闻列表 | 1 分钟 | 新闻列表 |
| 新闻详情 | 5 分钟 | 单条新闻内容 |

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
