<template>
  <el-breadcrumb separator="/" class="py-12">
    <el-breadcrumb-item>
      <router-link to="/">Home</router-link>
    </el-breadcrumb-item>

    <el-breadcrumb-item
      v-for="crumb in breadcrumbs"
      :key="crumb.path"
    >
      <router-link :to="crumb.path" class="capitalize">
        {{ crumb.label }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs: { label: string; path: string }[] = []
  let pathAcc = ''

  const breadcrumbKeys: string[] = route.meta?.breadcrumbs || []

  breadcrumbKeys.forEach(key => {
    const value = route.params[key]

    if (!value) return []

    pathAcc += `/${value}`

    crumbs.push({
      label: String(value).replace(/-/g, ' '),
      path: pathAcc
    })
  })

  return crumbs
})
</script>
