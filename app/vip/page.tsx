import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '赞助会员 - SCUM 私服',
  description: '赞助会员 · 累计充值升级 累计赞助达到对应金额即可升级，无需每月续费',
};

const vipLevels = [
  {
    level: 'VIP1',
    amount: '10元',
    daily: ['牛奶 x1', '牛肉水饺 x1', '绷带 x2'],
    color: 'from-blue-500 to-blue-600',
    tag: '铜',
  },
  {
    level: 'VIP5',
    amount: '200元',
    daily: ['每日低价绿卡购买权'],
    color: 'from-purple-500 to-purple-600',
    tag: '银',
  },
  {
    level: 'VIP7',
    amount: '500元',
    daily: ['永久血衣', '1私人传送点'],
    color: 'from-amber-500 to-amber-600',
    tag: '金',
  },
  {
    level: 'VIP9',
    amount: '1000元',
    daily: ['免费定制称号', '3私人传送点'],
    color: 'from-orange-500 to-orange-600',
    tag: '钻',
  },
  {
    level: 'SVIP1',
    amount: '2000元',
    daily: ['2小时建家权限', '永久皮卡一辆'],
    color: 'from-red-500 to-red-600',
    tag: '星',
  },
  {
    level: '至尊VIP',
    amount: '5000元',
    daily: ['5小时建家权限', '皮卡两辆', '自选载具两辆', 'RPG10发'],
    color: 'from-rose-600 to-rose-700',
    tag: '尊',
  },
];

export default function VipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[480px] mx-auto px-4 pt-20 pb-10 md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1200px]">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            赞助会员 · 累计充值升级
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            累计赞助达到对应金额即可升级，无需每月续费
          </p>
        </div>

        {/* 赞助说明 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-8">
          <h2 className="font-bold text-amber-800 mb-2">💡 赞助说明</h2>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 累计充值达到对应金额即自动升级，无需额外操作</li>
            <li>• 升级后享受对应等级的全部特权</li>
            <li>• 赞助金额永久累计，关服前均可享受会员权益</li>
            <li>• 所有特权仅限本人使用，不可转让</li>
          </ul>
        </div>

        {/* VIP 卡片列表 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vipLevels.map((vip) => (
            <div
              key={vip.level}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* 卡片头部 */}
              <div className={`bg-gradient-to-r ${vip.color} p-4 text-white relative`}>
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold">
                  {vip.tag}标
                </div>
                <div className="text-2xl font-bold mb-1">{vip.level}</div>
                <div className="text-sm opacity-90">累计赞助 {vip.amount}</div>
              </div>

              {/* 每日礼包 */}
              <div className="p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  每日礼包
                </h3>
                <ul className="space-y-1.5">
                  {vip.daily.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* 赞助按钮 */}
                <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  立即赞助
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>如有疑问请联系客服 Q 群：590570803</p>
        </div>
      </div>
    </div>
  );
}