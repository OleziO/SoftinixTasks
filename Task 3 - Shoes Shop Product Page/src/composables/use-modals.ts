import type { Ref } from 'vue'

const modals = ref(new Map<PropertyKey, { component: any; props?: any; isOpen: boolean}>())

export function useModals<T extends Record<PropertyKey, ReturnType<typeof defineAsyncComponent>>> (_components: T) {
  type TComponentsType = typeof _components
  type TComponentNames = keyof TComponentsType

  type TInferProps<T> = T extends new (...args: any[]) => infer R
    ? R extends { $props: infer P } ? P: never
    : never

  type TComponentProps = {
    [K in TComponentNames]: TInferProps<TComponentsType[K]>
  }

  function open<K extends TComponentNames> (name: K, props?: TComponentProps[K]) {
    modals.value.set(name, { component: markRaw(_components[name]), props, isOpen: true })
  }

  function promisifiedOpen<
    K extends TComponentNames,
    Props extends TComponentProps[K],
    Event extends keyof Props = keyof Props,
    EventProps extends Props[Event] = Props[Event],
    ResolveEventPayload = EventProps extends (...args: infer P) => any ? P : never
  > (
    name: K,
    options: {
      resolveOn: Event
      rejectOn?: Event
    },
    props?: TComponentProps[K]
  ): Promise<ResolveEventPayload> {
    return new Promise((resolve, reject) => {
      open(name, {
        ...(props as any || {}),
        [options.resolveOn]: (...args: any[]) => resolve(args as ResolveEventPayload),
        ...options.rejectOn ? { [options.rejectOn]: reject } : {}
      })
    })
  }

  function close (name: TComponentNames) {
    const modal = modals.value.get(name)
    if (modal) {
      modal.isOpen = false
    }
  }

  const isOpen = computed(() => {
    return [...modals.value.entries()].reduce((acc, [name, { isOpen }]) => {
      acc[name] = isOpen
      return acc
    }, {} as Record<PropertyKey, boolean>) as Record<TComponentNames, boolean>
  })
  return {
    modals: modals as Ref<Map<TComponentNames, { component: any; props?: any; isOpen: boolean}>>,
    isOpen,
    open,
    promisifiedOpen,
    close
  }
}
