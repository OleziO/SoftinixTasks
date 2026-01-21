import 'vue-router'
import { routeNames } from '@/router/route-names'
import { globalProperties, portalNames } from '@/plugins'
import { EElComponentSize, EElComponentType } from '@/types/enums'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs?: string[]
    label?: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $portalNames: typeof portalNames
    $routeNames: typeof routeNames
  }
}

declare global {
  interface ObjectConstructor {
    keys<T>(obj: T): Array<keyof T>
  }
}

export { }