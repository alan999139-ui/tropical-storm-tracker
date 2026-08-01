// 多语种翻译字典
// 支持语言: en (英语), zh (中文), fr (法语), ja (日语)
// 用法: 在页面中 import { t, lang } from '../i18n/dict'
//       const lang = 'en' 或 'zh'
//       t('nav.home') → "Home" / "首页"

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    htmlLang: 'en',
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    htmlLang: 'zh-CN',
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    htmlLang: 'fr',
  },
  ja: {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    htmlLang: 'ja',
  },
};

export const defaultLang = 'en';

export const dict = {
  // 导航
  'nav.home': { en: 'Home', zh: '首页', fr: 'Accueil', ja: 'ホーム' },
  'nav.storms': { en: 'Storms', zh: '风暴', fr: 'Tempêtes', ja: '暴風' },
  'nav.map': { en: 'Live Map', zh: '实时地图', fr: 'Carte Live', ja: 'リアルマップ' },
  'nav.preparedness': { en: 'Preparedness', zh: '防灾指南', fr: 'Préparation', ja: '防災ガイド' },
  'nav.about': { en: 'About', zh: '关于', fr: 'À propos', ja: '概要' },
  'nav.alerts': { en: 'Alerts', zh: '预警', fr: 'Alertes', ja: 'アラート' },
  'nav.signIn': { en: 'Sign In', zh: '登录', fr: 'Connexion', ja: 'ログイン' },
  'nav.signUp': { en: 'Get Started', zh: '免费注册', fr: 'S\'inscrire', ja: '登録' },

  // 品牌名
  'brand.name': { en: 'StormTracker', zh: '风暴追踪', fr: 'StormTracker', ja: 'ストームトラッカー' },
  'brand.tagline': {
    en: 'Real-Time Storm Tracking & Alerts',
    zh: '实时风暴追踪与预警',
    fr: 'Suivi et Alertes de Tempêtes en Temps Réel',
    ja: 'リアルタイム暴風追跡・アラート',
  },

  // Hero
  'hero.badge.loading': { en: 'Loading...', zh: '加载中...', fr: 'Chargement...', ja: '読み込み中...' },
  'hero.badge.noStorms': { en: '☀️ No Active Storms', zh: '☀️ 暂无活跃风暴', fr: '☀️ Aucune tempête active', ja: '☀️ 活発な暴風なし' },
  'hero.title': {
    en: "Do You Know Your Home's Storm Risk?",
    zh: '你知道你家的风暴风险吗？',
    fr: 'Connaissez-vous le risque de tempête chez vous?',
    ja: 'あなたの家の暴風リスクを知っていますか？',
  },
  'hero.description': {
    en: 'See real-time threats in 3 seconds + free alert notifications. Global coverage across 8 ocean basins, multilingual support.',
    zh: '3 秒查看实时威胁 + 免费预警通知。全球覆盖 8 大海域，多语言支持。',
    fr: '3 secondes pour voir les menaces + alertes gratuites. Couverture mondiale.',
    ja: '3秒で脅威を確認 + 無料アラート。世界8海域カバー。',
  },
  'hero.viewMap': { en: '🗺️ View Live Map', zh: '🗺️ 查看实时地图', fr: '🗺️ Voir la Carte', ja: '🗺️ ライブマップ' },
  'hero.stormDatabase': { en: 'Storm Database', zh: '风暴数据库', fr: 'Base de Données', ja: '暴風データベース' },
  'hero.getAlerts': {
    en: '🔔 Get Free Alerts',
    zh: '🔔 免费获取预警',
    fr: '🔔 Alertes Gratuites',
    ja: '🔔 無料アラート',
  },

  // Active Storms
  'active.title': { en: '⚡ Active Storms', zh: '⚡ 活跃风暴', fr: '⚡ Tempêtes Actives', ja: '⚡ 活発な暴風' },
  'active.loading': { en: 'Fetching live data from NOAA NHC...', zh: '正在获取 NOAA NHC 实时数据...', fr: 'Récupération des données NOAA NHC...', ja: 'NOAA NHCデータを取得中...' },
  'active.noStorms': { en: 'No active tropical storms at this time.', zh: '当前无活跃热带风暴。', fr: 'Aucune tempête tropicale active actuellement.', ja: '現在活発な熱帯暴風はありません。' },
  'active.browseHistory': { en: 'Browse Historical Data', zh: '浏览历史数据', fr: 'Voir l\'Historique', ja: '履歴データを見る' },
  'active.unableReach': { en: 'Unable to reach NOAA right now.', zh: '暂时无法连接 NOAA。', fr: 'Impossible de joindre NOAA.', ja: 'NOAAに接続できません。' },
  'active.windSpeed': { en: 'Wind Speed', zh: '风速', fr: 'Vent', ja: '風速' },
  'active.pressure': { en: 'Pressure', zh: '气压', fr: 'Pression', ja: '気圧' },
  'active.movement': { en: 'Movement', zh: '移动方向', fr: 'Déplacement', ja: '移動' },
  'active.location': { en: 'Location', zh: '位置', fr: 'Position', ja: '位置' },
  'active.lastUpdated': { en: 'Last updated', zh: '最后更新', fr: 'Dernière mise à jour', ja: '最終更新' },
  'active.viewDetails': { en: 'View Details →', zh: '查看详情 →', fr: 'Voir Détails →', ja: '詳細 →' },
  'active.active': { en: 'ACTIVE', zh: '活跃', fr: 'ACTIF', ja: '活発' },
  'active.weakening': { en: 'WEAKENING', zh: '减弱中', fr: 'AFFAIBLISSEMENT', ja: '弱体化中' },

  // Season Outlook
  'season.title': { en: '📊 2026 Season Outlook', zh: '📊 2026 风暴季展望', fr: '📊 Prévisions 2026', ja: '📊 2026年シーズン予測' },
  'season.forecast': { en: 'Below-Normal', zh: '低于正常水平', fr: 'Inférieur à la Normale', ja: '平年並み以下' },
  'season.namedStorms': { en: 'Named Storms', zh: '命名风暴', fr: 'Tempêtes Nommées', ja: '命名暴風' },
  'season.hurricanes': { en: 'Hurricanes', zh: '飓风', fr: 'Ouragans', ja: 'ハリケーン' },
  'season.majorHurricanes': { en: 'Major Hurricanes', zh: '强飓风', fr: 'Ouragans Majeurs', ja: '大型ハリケーン' },
  'season.ace': { en: 'ACE Index', zh: 'ACE 指数', fr: 'Indice ACE', ja: 'ACE指数' },
  'season.avg': { en: 'avg', zh: '平均', fr: 'moy', ja: '平均' },
  'season.notes': {
    en: 'El Niño developing — expected to be very strong at peak season, increasing wind shear and suppressing Atlantic development.',
    zh: '厄尔尼诺现象发展中——预计在风暴季高峰期将非常强烈，增加风切变并抑制大西洋风暴发展。',
    fr: 'El Niño en développement — devrait être très fort en pleine saison, augmentant le cisaillement et supprimant le développement atlantique.',
    ja: 'エルニーニョ発達中 — ピーク時に非常に強くなり、風のシアーが増加して大西洋の発達を抑制すると予想。',
  },
  'season.dates': {
    en: 'Season: June 1 - November 30 | Peak: September 10',
    zh: '风暴季：6月1日 - 11月30日 | 高峰：9月10日',
    fr: 'Saison : 1 juin - 30 novembre | Pic : 10 septembre',
    ja: 'シーズン：6月1日 - 11月30日 | ピーク：9月10日',
  },

  // 2026 Season Storms
  'seasonStorms.title': { en: '🌪️ 2026 Season Storms', zh: '🌪️ 2026 风暴季', fr: '🌪️ Saison 2026', ja: '🌪️ 2026年シーズン' },
  'seasonStorms.viewAll': { en: 'View All →', zh: '查看全部 →', fr: 'Tout Voir →', ja: 'すべて表示 →' },
  'seasonStorms.formed': { en: 'Formed', zh: '形成', fr: 'Formée', ja: '発生' },
  'seasonStorms.dissipated': { en: 'Dissipated', zh: '消散', fr: 'Dissipée', ja: '消滅' },
  'seasonStorms.landfall': { en: 'Landfall', zh: '登陆', fr: 'Atterrissage', ja: '上陸' },
  'seasonStorms.damage': { en: 'Damage', zh: '损失', fr: 'Dégâts', ja: '被害' },
  'seasonStorms.fatalities': { en: 'Fatalities', zh: '伤亡', fr: 'Victimes', ja: '死者' },

  // Preparedness
  'prep.title': { en: '🛡️ Storm Preparedness', zh: '🛡️ 风暴防灾', fr: '🛡️ Préparation', ja: '🛡️ 防災' },
  'prep.fullGuide': { en: 'Full Guide →', zh: '完整指南 →', fr: 'Guide Complet →', ja: '完全ガイド →' },
  'prep.kit': { en: 'Emergency Kit', zh: '应急包', fr: 'Kit d\'Urgence', ja: '緊急キット' },
  'prep.kitDesc': { en: '3-day supply of water, non-perishable food, flashlight, batteries, first aid kit.', zh: '3天饮用水、不易腐食品、手电筒、电池、急救包。', fr: 'Réserve d\'eau de 3 jours, nourriture non périssable, lampe, piles, trousse de premiers secours.', ja: '3日分の水、保存食、懐中電灯、電池、救急キット。' },
  'prep.home': { en: 'Secure Your Home', zh: '加固房屋', fr: 'Sécuriser votre Maison', ja: '家の補強' },
  'prep.homeDesc': { en: 'Reinforce windows, clear yard debris, check roof for loose shingles.', zh: '加固窗户、清理院子杂物、检查屋顶瓦片。', fr: 'Renforcez les fenêtres, dégagez les débris, vérifiez le toit.', ja: '窓の補強、庭の片付け、屋根の点検。' },
  'prep.connected': { en: 'Stay Connected', zh: '保持联络', fr: 'Rester Connecté', ja: '連絡を維持' },
  'prep.connectedDesc': { en: 'Sign up for local alerts, keep phone charged, have battery radio backup.', zh: '订阅本地预警、保持手机充电、备用电池收音机。', fr: 'Inscrivez-vous aux alertes locales, gardez le téléphone chargé, radio à piles de secours.', ja: '地域のアラートに登録、携帯を充電、電池式ラジオを準備。' },
  'prep.evacuation': { en: 'Evacuation Plan', zh: '撤离计划', fr: 'Plan d\'Évacuation', ja: '避難計画' },
  'prep.evacuationDesc': { en: 'Know your route, keep gas tank full, identify shelters ahead of time.', zh: '了解路线、保持油箱满油、提前确认避难所。', fr: 'Connaissez votre itinéraire, plein d\'essence, identifiez les abris.', ja: '避難ルートを確認、ガソリン満タン、避難所を事前確認。' },

  // CTA / Alerts
  'cta.title': { en: 'Never Miss a Storm Warning', zh: '不错过任何风暴预警', fr: 'Ne Manquez Aucune Alerte', ja: '暴風警報を見逃さない' },
  'cta.desc': {
    en: 'Get real-time email alerts when a tropical storm is heading your way. Free, no spam.',
    zh: '订阅实时预警，热带风暴来临时第一时间通知你。免费，无垃圾邮件。',
    fr: 'Recevez des alertes email en temps réel quand une tempête approche. Gratuit, sans spam.',
    ja: '熱帯暴風が接近した際、リアルタイムのメールアラートを受信。無料、スパムなし。',
  },
  'cta.subscribe': { en: 'Subscribe', zh: '订阅', fr: 'S\'abonner', ja: '登録' },
  'cta.emailPlaceholder': { en: 'your@email.com', zh: '你的邮箱地址', fr: 'votre@email.com', ja: 'your@email.com' },
  'cta.selectRegion': { en: 'Select your region', zh: '选择你的地区', fr: 'Choisissez votre région', ja: '地域を選択' },
  'cta.regionAtlantic': { en: 'Atlantic / Gulf Coast', zh: '大西洋 / 墨西哥湾', fr: 'Atlantique / Golfe', ja: '大西洋 / メキシコ湾' },
  'cta.regionPacific': { en: 'Eastern Pacific', zh: '东太平洋', fr: 'Pacifique Est', ja: '東太平洋' },
  'cta.regionCaribbean': { en: 'Caribbean', zh: '加勒比海', fr: 'Caraïbes', ja: 'カリブ海' },
  'cta.regionAsia': { en: 'Western Pacific / Asia', zh: '西太平洋 / 亚洲', fr: 'Pacifique Ouest / Asie', ja: '西太平洋 / アジア' },
  'cta.regionGlobal': { en: 'Global (all basins)', zh: '全球所有海域', fr: 'Mondial', ja: '全球' },
  'cta.privacy': {
    en: 'We respect your privacy. Unsubscribe anytime.',
    zh: '我们尊重你的隐私，可随时取消订阅。',
    fr: 'Nous respectons votre vie privée. Désabonnement à tout moment.',
    ja: 'プライバシーを尊重します。いつでも解除可能。',
  },
  'cta.successMsg': {
    en: '✅ You\'re subscribed! We\'ll send you alerts when storms develop.',
    zh: '✅ 订阅成功！风暴来临时我们将发送预警。',
    fr: '✅ Inscrit ! Vous recevrez des alertes lors du développement de tempêtes.',
    ja: '✅ 登録完了！暴風発生時にアラートをお送りします。',
  },

  // Premium / Pricing
  'premium.title': { en: 'Upgrade to Storm Tracker Pro', zh: '升级到 Pro 专业版', fr: 'Passez à Pro', ja: 'Proにアップグレード' },
  'premium.subtitle': {
    en: 'Advanced features for weather enthusiasts, emergency managers, and coastal businesses.',
    zh: '为气象爱好者、应急管理者和沿海企业打造的高级功能。',
    fr: 'Fonctionnalités avancées pour passionnés, gestionnaires d\'urgence et entreprises côtières.',
    ja: '気象愛好家、危機管理者、沿岸企業向けの高度な機能。',
  },
  'premium.free': { en: 'Free', zh: '免费', fr: 'Gratuit', ja: '無料' },
  'premium.pro': { en: 'Pro', zh: '专业版', fr: 'Pro', ja: 'Pro' },
  'premium.enterprise': { en: 'Enterprise', zh: '企业版', fr: 'Entreprise', ja: 'エンタープライズ' },
  'premium.perMonth': { en: '/mo', zh: '/月', fr: '/mois', ja: '/月' },
  'premium.freeFeatures': {
    en: 'Real-time storm map · Basic alerts · Historical data (5 years) · Preparedness guides',
    zh: '实时风暴地图 · 基础预警 · 5年历史数据 · 防灾指南',
    fr: 'Carte en temps réel · Alertes de base · Données historiques (5 ans) · Guides de préparation',
    ja: 'リアルタイムマップ · 基本アラート · 5年履歴データ · 防災ガイド',
  },
  'premium.proPrice': { en: '$4.99', zh: '¥35', fr: '4,99 €', ja: '¥750' },
  'premium.proFeatures': {
    en: 'Everything in Free, plus: SMS & push alerts · Custom region alerts (up to 5) · 7-day forecast tracks · Storm surge maps · Email digest weekly · Ad-free experience',
    zh: '包含免费版全部功能，外加：短信和推送预警 · 自定义区域预警（最多5个）· 7天预测路径 · 风暴潮地图 · 每周邮件摘要 · 无广告体验',
    fr: 'Tout gratuit, plus : Alertes SMS et push · Alertes régions personnalisées (5 max) · Trajectoires 7 jours · Cartes de surcote · Résumé hebdomadaire · Sans pub',
    ja: '無料版の全機能に加えて：SMS・プッシュ通知 · カスタム地域アラート（5つまで）· 7日予報軌道 · 高潮マップ · 週次メール要約 · 広告なし',
  },
  'premium.enterprisePrice': { en: 'Custom', zh: '定制', fr: 'Sur devis', ja: 'カスタム' },
  'premium.enterpriseFeatures': {
    en: 'Everything in Pro, plus: API access (1000 calls/day) · Bulk alerts for teams · Custom branding · Data export · Priority support · SLA guarantee',
    zh: '包含专业版全部功能，外加：API 接口（每日1000次）· 团队批量预警 · 自定义品牌 · 数据导出 · 优先支持 · SLA 保障',
    fr: 'Tout Pro, plus : Accès API (1000/jour) · Alertes équipe · Marque personnalisée · Export données · Support prioritaire · SLA',
    ja: 'Pro版の全機能に加えて：APIアクセス（1000回/日）· チーム一括アラート · カスタムブランド · データエクスポート · 優先サポート · SLA保証',
  },
  'premium.cta.free': { en: 'Start Free', zh: '免费开始', fr: 'Commencer', ja: '無料開始' },
  'premium.cta.pro': { en: 'Start 14-Day Free Trial', zh: '14天免费试用', fr: 'Essai 14 jours', ja: '14日無料体験' },
  'premium.cta.enterprise': { en: 'Contact Sales', zh: '联系销售', fr: 'Contact Vente', ja: 'お問い合わせ' },
  'premium.popular': { en: 'Most Popular', zh: '最受欢迎', fr: 'Populaire', ja: '人気No.1' },
  'premium.guarantee': {
    en: '14-day money-back guarantee. Cancel anytime.',
    zh: '14天退款保证，随时取消。',
    fr: 'Garantie remboursé 14 jours. Annulation à tout moment.',
    ja: '14日間返金保証。いつでもキャンセル可。',
  },

  // User Account
  'account.title': { en: 'Your Account', zh: '你的账户', fr: 'Votre Compte', ja: 'アカウント' },
  'account.signIn': { en: 'Sign In', zh: '登录', fr: 'Se Connecter', ja: 'ログイン' },
  'account.signUp': { en: 'Create Account', zh: '创建账户', fr: 'Créer un Compte', ja: 'アカウント作成' },
  'account.email': { en: 'Email', zh: '邮箱', fr: 'Email', ja: 'メール' },
  'account.password': { en: 'Password', zh: '密码', fr: 'Mot de passe', ja: 'パスワード' },
  'account.confirmPassword': { en: 'Confirm Password', zh: '确认密码', fr: 'Confirmer', ja: 'パスワード確認' },
  'account.forgotPassword': { en: 'Forgot password?', zh: '忘记密码？', fr: 'Mot de passe oublié ?', ja: 'パスワードを忘れた？' },
  'account.noAccount': { en: 'Don\'t have an account?', zh: '还没有账户？', fr: 'Pas de compte ?', ja: 'アカウントがない？' },
  'account.haveAccount': { en: 'Already have an account?', zh: '已有账户？', fr: 'Déjà inscrit ?', ja: 'すでにアカウント有り？' },
  'account.orContinueWith': { en: 'or continue with', zh: '或使用以下方式', fr: 'ou continuer avec', ja: 'または以下で続行' },
  'account.google': { en: 'Google', zh: 'Google', fr: 'Google', ja: 'Google' },
  'account.github': { en: 'GitHub', zh: 'GitHub', fr: 'GitHub', ja: 'GitHub' },
  'account.agreeTerms': {
    en: 'I agree to the Terms of Service and Privacy Policy',
    zh: '我同意服务条款和隐私政策',
    fr: 'J\'accepte les Conditions d\'Utilisation et la Politique de Confidentialité',
    ja: '利用規約とプライバシーポリシーに同意します',
  },

  // User Dashboard
  'dashboard.title': { en: 'Your Dashboard', zh: '你的面板', fr: 'Tableau de Bord', ja: 'ダッシュボード' },
  'dashboard.welcome': { en: 'Welcome back', zh: '欢迎回来', fr: 'Bon retour', ja: 'おかえりなさい' },
  'dashboard.alertRegions': { en: 'Alert Regions', zh: '预警区域', fr: 'Régions d\'Alerte', ja: 'アラート地域' },
  'dashboard.alertHistory': { en: 'Alert History', zh: '预警历史', fr: 'Historique Alertes', ja: 'アラート履歴' },
  'dashboard.subscription': { en: 'Subscription', zh: '订阅', fr: 'Abonnement', ja: 'サブスクリプション' },
  'dashboard.upgrade': { en: 'Upgrade to Pro', zh: '升级到专业版', fr: 'Passer à Pro', ja: 'Proにアップグレード' },
  'dashboard.addRegion': { en: '+ Add Region', zh: '+ 添加区域', fr: '+ Ajouter Région', ja: '+ 地域追加' },
  'dashboard.noAlerts': { en: 'No alerts yet. We\'ll notify you when a storm develops.', zh: '暂无预警，风暴来临时会通知你。', fr: 'Aucune alerte. Vous serez notifié.', ja: 'アラートなし。暴風発生時に通知します。' },
  'dashboard.plan': { en: 'Plan', zh: '当前方案', fr: 'Plan', ja: 'プラン' },
  'dashboard.free': { en: 'Free Plan', zh: '免费版', fr: 'Plan Gratuit', ja: '無料プラン' },
  'dashboard.pro': { en: 'Pro Plan', zh: '专业版', fr: 'Plan Pro', ja: 'Pro プラン' },
  'dashboard.manageAccount': { en: 'Manage Account', zh: '管理账户', fr: 'Gérer le Compte', ja: 'アカウント管理' },
  'dashboard.signOut': { en: 'Sign Out', zh: '退出登录', fr: 'Déconnexion', ja: 'ログアウト' },

  // Map Page
  'map.title': { en: '🗺️ Live Storm Map', zh: '🗺️ 实时风暴地图', fr: '🗺️ Carte Live', ja: '🗺️ ライブマップ' },
  'map.desc': {
    en: 'Real-time tracking of active tropical storms. Data streamed live from NOAA National Hurricane Center.',
    zh: '实时追踪活跃热带风暴。数据来自 NOAA 国家飓风中心。',
    fr: 'Suivi en temps réel des tempêtes tropicales actives. Données NOAA NHC.',
    ja: '活発な熱帯暴風をリアルタイム追跡。NOAA NHCデータ。',
  },
  'map.connecting': { en: 'Connecting to NOAA NHC...', zh: '正在连接 NOAA NHC...', fr: 'Connexion NOAA NHC...', ja: 'NOAA NHCに接続中...' },
  'map.fetching': { en: 'Fetching from NOAA NHC...', zh: '正在获取 NOAA NHC 数据...', fr: 'Récupération NOAA NHC...', ja: 'NOAA NHCデータ取得中...' },
  'map.loading': { en: 'Fetching live storm data...', zh: '正在获取实时风暴数据...', fr: 'Récupération données...', ja: 'データ取得中...' },
  'map.noActive': { en: '☀️ No active storms', zh: '☀️ 暂无活跃风暴', fr: '☀️ Aucune tempête', ja: '☀️ 活発な暴風なし' },
  'map.live': { en: '🟢 Live', zh: '🟢 实时', fr: '🟢 Live', ja: '🟢 ライブ' },
  'map.unable': { en: '⚠️ Unable to reach NOAA', zh: '⚠️ 无法连接 NOAA', fr: '⚠️ NOAA injoignable', ja: '⚠️ NOAAに接続不可' },
  'map.updated': { en: 'Updated', zh: '已更新', fr: 'Mis à jour', ja: '更新' },
  'map.legend': { en: 'Legend', zh: '图例', fr: 'Légende', ja: '凡例' },
  'map.activeStorms': { en: 'Active Storms', zh: '活跃风暴', fr: 'Tempêtes Actives', ja: '活発な暴風' },
  'map.dataSource': { en: 'Data source', zh: '数据来源', fr: 'Source', ja: 'データソース' },
  'map.autoRefresh': { en: 'Auto-refresh every 5 minutes. Last fetch', zh: '每5分钟自动刷新。上次获取', fr: 'Actualisation 5 min. Dernier', ja: '5分毎に自動更新。最終' },
  'map.td': { en: 'Tropical Depression', zh: '热带低压', fr: 'Dépression Tropicale', ja: '熱帯低気圧' },
  'map.ts': { en: 'Tropical Storm', zh: '热带风暴', fr: 'Tempête Tropicale', ja: '熱帯暴風' },
  'map.hurricane': { en: 'Hurricane', zh: '飓风', fr: 'Ouragan', ja: 'ハリケーン' },
  'map.wind': { en: 'Wind', zh: '风速', fr: 'Vent', ja: '風速' },
  'map.movement': { en: 'Movement', zh: '移动', fr: 'Déplacement', ja: '移動' },
  'map.stormPath': { en: 'Storm Path', zh: '风暴路径', fr: 'Trajectoire', ja: '暴風軌道' },

  // Footer
  'footer.desc': {
    en: 'Real-time tropical storm tracking and information platform.',
    zh: '实时热带风暴追踪与信息平台。',
    fr: 'Plateforme de suivi des tempêtes tropicales en temps réel.',
    ja: 'リアルタイム熱帯暴風追跡プラットフォーム。',
  },
  'footer.resources': { en: 'Resources', zh: '资源', fr: 'Ressources', ja: 'リソース' },
  'footer.quickLinks': { en: 'Quick Links', zh: '快速链接', fr: 'Liens Rapides', ja: 'クイックリンク' },
  'footer.account': { en: 'Account', zh: '账户', fr: 'Compte', ja: 'アカウント' },
  'footer.pricing': { en: 'Pricing', zh: '定价', fr: 'Tarifs', ja: '料金' },
  'footer.rss': { en: 'RSS Feed', zh: 'RSS 订阅', fr: 'Flux RSS', ja: 'RSSフィード' },
  'footer.copyright': {
    en: 'StormTracker. Data sourced from NOAA/NHC. Not for life-safety decisions.',
    zh: 'StormTracker。数据来自 NOAA/NHC。本网站不用于生命安全决策。',
    fr: 'StormTracker. Données NOAA/NHC. Non pour décisions de sécurité.',
    ja: '熱帯暴風追跡。データはNOAA/NHC提供。生命安全の判断には使用不可。',
  },

  // Storms Page
  'storms.title': { en: '🌪️ Storm Database', zh: '🌪️ 风暴数据库', fr: '🌪️ Base de Données', ja: '🌪️ 暴風データベース' },
  'storms.desc': {
    en: 'Comprehensive records of tropical storms and hurricanes. Data sourced from NOAA HURDAT2.',
    zh: '热带风暴和飓风综合记录。数据来自 NOAA HURDAT2。',
    fr: 'Records complets de tempêtes tropicales et ouragans. Données NOAA HURDAT2.',
    ja: '熱帯暴風・ハリケーンの包括記録。NOAA HURDAT2データ。',
  },
  'storms.filterYear': { en: 'Year', zh: '年份', fr: 'Année', ja: '年' },
  'storms.filterCategory': { en: 'Category', zh: '等级', fr: 'Catégorie', ja: 'カテゴリー' },
  'storms.filterRegion': { en: 'Region', zh: '区域', fr: 'Région', ja: '地域' },
  'storms.filterSearch': { en: 'Storm name...', zh: '风暴名称...', fr: 'Nom de tempête...', ja: '暴風名...' },
  'storms.allYears': { en: 'All Years', zh: '所有年份', fr: 'Toutes Années', ja: '全年' },
  'storms.allCategories': { en: 'All Categories', zh: '所有等级', fr: 'Toutes Catégories', ja: '全カテゴリー' },
  'storms.allRegions': { en: 'All Regions', zh: '所有区域', fr: 'Toutes Régions', ja: '全地域' },
  'storms.colName': { en: 'Name', zh: '名称', fr: 'Nom', ja: '名前' },
  'storms.colYear': { en: 'Year', zh: '年份', fr: 'Année', ja: '年' },
  'storms.colCategory': { en: 'Category', zh: '等级', fr: 'Catégorie', ja: 'カテゴリー' },
  'storms.colMaxWind': { en: 'Max Wind', zh: '最大风速', fr: 'Vent Max', ja: '最大風速' },
  'storms.colMinPressure': { en: 'Min Pressure', zh: '最低气压', fr: 'Pression Min', ja: '最低気圧' },
  'storms.colFormed': { en: 'Formed', zh: '形成', fr: 'Formée', ja: '発生' },
  'storms.colDissipated': { en: 'Dissipated', zh: '消散', fr: 'Dissipée', ja: '消滅' },
  'storms.colRegion': { en: 'Region', zh: '区域', fr: 'Région', ja: '地域' },
  'storms.colDamage': { en: 'Damage', zh: '损失', fr: 'Dégâts', ja: '被害' },
  'storms.found': { en: 'storms found', zh: '个风暴', fr: 'tempêtes trouvées', ja: '件' },
  'storms.noMatch': { en: 'No storms match your filters.', zh: '没有匹配的风暴。', fr: 'Aucune tempête.', ja: '該当なし。' },

  // Preparedness Page
  'prepPage.title': { en: '🛡️ Tropical Storm Preparedness Guide', zh: '🛡️ 热带风暴防灾指南', fr: '🛡️ Guide de Préparation', ja: '🛡️ 熱帯暴風防災ガイド' },
  'prepPage.desc': {
    en: 'Everything you need to know to stay safe before, during, and after a tropical storm.',
    zh: '热带风暴来临前、中、后你需要知道的一切。',
    fr: 'Tout ce qu\'il faut savoir avant, pendant et après une tempête tropicale.',
    ja: '熱帯暴風の前・中・後に知っておくべきすべて。',
  },
  'prepPage.quickNav': { en: 'Quick Navigation', zh: '快速导航', fr: 'Navigation Rapide', ja: 'クイックナビ' },
  'prepPage.categories': { en: 'Storm Categories Explained', zh: '风暴等级说明', fr: 'Catégories de Tempêtes', ja: '暴風カテゴリー解説' },
  'prepPage.before': { en: 'Before the Storm', zh: '风暴来临前', fr: 'Avant la Tempête', ja: '暴風の前に' },
  'prepPage.during': { en: 'During the Storm', zh: '风暴期间', fr: 'Pendant la Tempête', ja: '暴風中' },
  'prepPage.after': { en: 'After the Storm', zh: '风暴过后', fr: 'Après la Tempête', ja: '暴風の後に' },
  'prepPage.kit': { en: 'Emergency Kit Checklist', zh: '应急包清单', fr: 'Liste Kit d\'Urgence', ja: '緊急キットリスト' },
  'prepPage.evacuation': { en: 'Evacuation Guide', zh: '撤离指南', fr: 'Guide d\'Évacuation', ja: '避難ガイド' },
  'prepPage.faq': { en: 'Frequently Asked Questions', zh: '常见问题', fr: 'FAQ', ja: 'よくある質問' },
  'prepPage.dataSource': { en: 'Data Source', zh: '数据来源', fr: 'Source des Données', ja: 'データソース' },

  // About Page
  'about.title': { en: 'About StormTracker', zh: '关于 StormTracker', fr: 'À propos', ja: '熱帯暴風追跡について' },
  'about.mission': { en: 'Our Mission', zh: '我们的使命', fr: 'Notre Mission', ja: 'ミッション' },

  // Storm Detail
  'detail.maxWind': { en: 'Max Wind Speed', zh: '最大风速', fr: 'Vent Max', ja: '最大風速' },
  'detail.minPressure': { en: 'Min Pressure', zh: '最低气压', fr: 'Pression Min', ja: '最低気圧' },
  'detail.duration': { en: 'Duration', zh: '持续时间', fr: 'Durée', ja: '継続期間' },
  'detail.region': { en: 'Region', zh: '区域', fr: 'Région', ja: '地域' },
  'detail.landfall': { en: 'Landfall', zh: '登陆地点', fr: 'Atterrissage', ja: '上陸' },
  'detail.damage': { en: 'Damage', zh: '损失', fr: 'Dégâts', ja: '被害' },
  'detail.fatalities': { en: 'Fatalities', zh: '伤亡', fr: 'Victimes', ja: '死者' },
  'detail.formed': { en: 'Formed', zh: '形成时间', fr: 'Formée', ja: '発生' },
  'detail.overview': { en: 'Overview', zh: '概述', fr: 'Aperçu', ja: '概要' },
  'detail.stormPath': { en: 'Storm Path', zh: '风暴路径', fr: 'Trajectoire', ja: '暴風軌道' },
  'detail.trackData': { en: 'Storm Track Data', zh: '路径数据', fr: 'Données de Trajectoire', ja: '軌道データ' },
  'detail.time': { en: 'Time (UTC)', zh: '时间 (UTC)', fr: 'Temps (UTC)', ja: '時間 (UTC)' },
  'detail.latitude': { en: 'Latitude', zh: '纬度', fr: 'Latitude', ja: '緯度' },
  'detail.longitude': { en: 'Longitude', zh: '经度', fr: 'Longitude', ja: '経度' },
  'detail.wind': { en: 'Wind (mph)', zh: '风速 (mph)', fr: 'Vent (mph)', ja: '風速 (mph)' },
  'detail.pressure': { en: 'Pressure (mb)', zh: '气压 (mb)', fr: 'Pression (mb)', ja: '気圧 (mb)' },
  'detail.season': { en: 'Atlantic Hurricane Season', zh: '大西洋飓风季', fr: 'Saison des Ouragans', ja: '大西洋ハリケーンシーズン' },

  // 风暴等级中文化
  'storm.category.TD': { en: 'Tropical Depression', zh: '热带低压', fr: 'Dépression Tropicale', ja: '熱帯低気圧' },
  'storm.category.TS': { en: 'Tropical Storm', zh: '热带风暴', fr: 'Tempête Tropicale', ja: '熱帯暴風' },
  'storm.category.Cat1': { en: 'Category 1 Hurricane', zh: '1级飓风', fr: 'Ouragan Catégorie 1', ja: 'カテゴリー1ハリケーン' },
  'storm.category.Cat2': { en: 'Category 2 Hurricane', zh: '2级飓风', fr: 'Ouragan Catégorie 2', ja: 'カテゴリー2ハリケーン' },
  'storm.category.Cat3': { en: 'Category 3 Hurricane', zh: '3级飓风', fr: 'Ouragan Catégorie 3', ja: 'カテゴリー3ハリケーン' },
  'storm.category.Cat4': { en: 'Category 4 Hurricane', zh: '4级飓风', fr: 'Ouragan Catégorie 4', ja: 'カテゴリー4ハリケーン' },
  'storm.category.Cat5': { en: 'Category 5 Hurricane', zh: '5级飓风', fr: 'Ouragan Catégorie 5', ja: 'カテゴリー5ハリケーン' },

  // 用户分类模块（6大洲）
  'region.title': { en: '🌏 你住在哪个地区？', zh: '🌏 你住在哪个地区？', fr: '🌏 Où habitez-vous?', ja: '🌏 どこに住んでいますか？' },
  'region.intro': { en: '选择你的地区，查看该海域的风暴情况和预警服务', zh: '选择你的地区，查看该海域的风暴情况和预警服务', fr: 'Choisissez votre région', ja: '地域を選択' },
  'region.asia': { en: '亚洲', zh: '亚洲', fr: 'Asie', ja: 'アジア' },
  'region.northAmerica': { en: '北美洲', zh: '北美洲', fr: 'Amérique du Nord', ja: '北米' },
  'region.oceania': { en: '大洋洲', zh: '大洋洲', fr: 'Océanie', ja: 'オセアニア' },
  'region.latinAmerica': { en: '拉丁美洲', zh: '拉丁美洲', fr: 'Amérique Latine', ja: 'ラテンアメリカ' },
  'region.africa': { en: '非洲', zh: '非洲', fr: 'Afrique', ja: 'アフリカ' },
  'region.europe': { en: '欧洲', zh: '欧洲', fr: 'Europe', ja: 'ヨーロッパ' },
};

// 翻译函数
export function t(key, lang = 'en') {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

// 生成语言切换 URL
export function localizedPath(path, lang) {
  if (lang === 'en') return path; // 英语为默认，不加前缀
  return `/${lang}${path}`;
}
