/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  navTheme: 'dark', // theme for nav menu  'dark' | 'light'
  primaryColor: '#FAAD14', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, //  auto hide header
  fixSiderbar: true, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: '5G-admin',
  logo: require('../assets/logo.svg'),
  multiTab: true, // 多tabs
  lang: 'zh-CN', // 默认语言
  multiLang: false, // 多语言
  backTop: true, // 返回顶部按钮
  tokenKey: 'token', // 存储的token key
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
