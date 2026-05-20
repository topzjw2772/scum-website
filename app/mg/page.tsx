import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商城 - SCUM 私服',
  description: 'SCUM 私服商城 - 购买游戏道具、会员特权',
};

const products = [
  { id: 1, name: '绿卡 (月卡)', price: '30元', desc: '每日可低价购买一次商品', tag: '热门' },
  { id: 2, name: '红卡 (月卡)', price: '80元', desc: '每周可低价购买三次商品', tag: '推荐' },
  { id: 3, name: '牛奶 x10', price: '10元', desc: '恢复少量生命值', tag: '' },
  { id: 4, name: '绷带 x10', price: '10元', desc: '基础医疗物品', tag: '' },
  { id: 5, name: '牛肉罐头 x5', price: '25元', desc: '恢复大量饱腹度', tag: '' },
  { id: 6, name: '私人传送点', price: '100元', desc: '设置一个私人传送点', tag: '实用' },
  { id: 7, name: '血衣 (永久)', price: '200元', desc: '永久防弹衣，属性优异', tag: '稀有' },
  { id: 8, name: '皮卡 (永久)', price: '500元', desc: '永久载具，防护优秀', tag: '稀有' },
  { id: 9, name: '建家权限 1小时', price: '50元', desc: '允许在建家服建造', tag: '' },
  { id: 10, name: '定制称号', price: '150元', desc: '自定义角色称号', tag: '个性' },
  { id: 11, name: 'RPG 10发', price: '300元', desc: '重型火箭筒弹药', tag: '' },
  { id: 12, name: '自选载具', price: '800元', desc: '从载具列表中自选一辆', tag: '尊贵' },
];

export default function MgPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[480px] mx-auto px-4 pt-20 pb-10 md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1200px]">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            商城
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            精选游戏道具，会员特权优惠购
          </p>
        </div>

        {/* 商城说明 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="font-bold text-blue-800 mb-2">💡 购物说明</h2>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 绿卡会员每日可低价购买一次商品</li>
            <li>• 红卡会员每周可低价购买三次商品</li>
            <li>• 所有商品不支持退换，请确认后再购买</li>
            <li>• 有疑问请联系客服 Q 群：590570803</li>
          </ul>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* 商品图片占位 */}
              <div className="bg-gray-200 border-b border-gray-100 flex items-center justify-center" style={{ height: '120px' }}>
                <span className="text-gray-400 text-3xl">📦</span>
              </div>

              {/* 商品信息 */}
              <div className="p-4">
                {product.tag && (
                  <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full mb-2">
                    {product.tag}
                  </span>
                )}
                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-rose-600">{product.price}</span>
                  <button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors">
                    购买
                  </button>
                </div>
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