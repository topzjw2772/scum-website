'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const qqGroupNumber = '590570803';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qqGroupNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openQQGroup = () => {
    // 尝试打开QQ群链接
    window.open(`https://qm.qq.com/cgi-bin/qm/qr?k=placeholder&wv=10221776`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">📞 联系我们</h1>
          <p className="text-orange-100">有问题或建议？我们随时为你服务</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* QQ Group Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-5xl mr-4">💬</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">QQ 群</h2>
              <p className="text-gray-600">获取第一手资讯，参与社区讨论</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">群号码</p>
                <p className="text-3xl font-bold text-gray-900">{qqGroupNumber}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {copied ? '✓ 已复制' : '📋 复制群号'}
            </button>

            {/* Join Button */}
            <button
              onClick={openQQGroup}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ➡️ 加入群聊
            </button>
          </div>
        </div>

        {/* Other Contact Methods */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">其他联系方式</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl mr-4">📧</span>
              <div>
                <p className="text-sm text-gray-500">邮箱</p>
                <p className="text-gray-900">contact@scum-server.com</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl mr-4">🌐</span>
              <div>
                <p className="text-sm text-gray-500">官方网站</p>
                <p className="text-gray-900">https://scum.starord.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">常见问题</h2>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg font-medium">
                <span>如何加入服务器？</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 p-4 text-gray-600">
                在游戏内添加服务器地址即可加入。我们的服务器地址可在 QQ 群公告中获取。
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg font-medium">
                <span>服务器对电脑配置要求高吗？</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 p-4 text-gray-600">
                我们的服务器已经过低配优化，主流配置均可流畅运行。推荐配置：GTX 1050 / 8GB 内存。
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg font-medium">
                <span>可以使用外挂吗？</span>
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 p-4 text-gray-600">
                严格禁止使用任何外挂或作弊程序。一经发现，将立即永久封禁。
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
