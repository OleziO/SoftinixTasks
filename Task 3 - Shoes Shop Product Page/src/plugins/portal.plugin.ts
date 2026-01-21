import type { Plugin } from 'vue'
import PortalVue from 'portal-vue'

const portalNames = {
  header: 'header'
}

const PortalPlugin: Plugin = {
  install: (app) => {
    app.config.globalProperties.$portalNames = portalNames
    app.use(PortalVue)
  }
}

export {
  portalNames,
  PortalPlugin
}
