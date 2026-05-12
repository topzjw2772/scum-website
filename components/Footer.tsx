import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">关于服务器</h3>
            <p className="text-sm leading-relaxed">
              SCUM 私服是一个专注于为玩家提供优质游戏体验的私人服务器。
              24小时在线，原版玩法，公平竞技。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-white transition-colors">
                  服务器规则
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  最新活动
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  新闻公告
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">联系我们</h3>
            <p className="text-sm mb-2">QQ 群: 590570803</p>
            <p className="text-sm">
              如有问题或建议，欢迎加入QQ群联系我们。
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {currentYear} SCUM 私服. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
            本网站仅供展示，不提供游戏下载
          </p>
        </div>
      </div>
    </footer>
  );
}
