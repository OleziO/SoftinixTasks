<template>
  <div class="flex flex-col min-h-screen">
    <header class="w-full">
      <nav class="max-w-screen-xl mx-auto p-16 sm:p-74 !pb-0">
        <BreadCrumbs />
      </nav>
    </header>

    <main class="w-full flex-1 mt-10">
      <div class="max-w-screen-xl mx-auto px-16 sm:px-74">
        <slot />
      </div>
    </main>

    <footer class="w-full">
      <div class="max-w-screen-xl mx-auto px-74 py-24" />
    </footer>
  </div>
</template>
