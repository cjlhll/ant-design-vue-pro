import router from './router'
// import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/* const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist */
// const loginRoutePath = '/user/login'
// const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  const hasToken = storage.get(ACCESS_TOKEN)
  if (hasToken && to.name === 'login') {
    next({ name: 'index' })
    NProgress.done()
  } else if (!hasToken && to.name !== 'login') {
    next({ name: 'login' })
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
