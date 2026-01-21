<template>
  <el-dialog 
    v-model="model" 
    :show-close="false"
    class="w-full max-w-[360px] md:max-w-[800px]"
    >
    <template #header>
      <div class="w-full flex justify-between items-center">
        <h2 class="text-2xl">Size Guide</h2>

        <el-button link @click="model = false">
          <icon-close />
        </el-button>
      </div>
    </template>

    <template #default>
      <div>
        <h3 class="text-lg font-bold">How to measure shoe size?</h3>

        <div class="pt-12 flex justify-center items-center md:items-end flex-col md:flex-row gap-24">
          <div class="order-2 md:order-1">
            <p class="mt-12">Follow the simple steps below to determine your shoe size. Make sure you do this during or at the end of day to ensure the right size (feet typically swell during the day).</p>

            <ol class="mt-12 list-decimal list-outside pl-16">
              <li>Put a piece of blank paper under your feet. Stand up straight and have your heel lightly touching against the wall.</li>
              <li>Have someone mark the end of the longest toe and the back of your heel on the sheet with a pen or pencil. Afterwards measure the length of your feet from heel to toe.</li>
              <li>Repeat the steps for your other foot and compare it with our size chart below.</li>
            </ol> 
          </div>

          <el-image src="/images/shoes-size.png" class="block min-w-[225px] max-w-[225px] order-1 md:order-2"/>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

const model = defineModel<boolean>({default: false})
</script>