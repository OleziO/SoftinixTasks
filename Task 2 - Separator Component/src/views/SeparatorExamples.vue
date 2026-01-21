<template>
  <div class="p-10 flex flex-col gap-5">
    <SeparatedData :items="testData"/>

    <SeparatedData :items="testData" separator="/"/>

    <SeparatedData :items="testData" :hide-elements="['count', 'salary']"/>

    <SeparatedData :items="testData" :no-label-elements="['location']"/>

    <SeparatedData :items="testData" custom-array-separator=" > "/>

    <SeparatedData :items="testData" separator="/" :format-boolean="false"/>

    <SeparatedData :items="testData" separator="/" :format-date="false"/>

    <SeparatedData 
      :items="testData" 
      :format-boolean="false"
      :format-date="false"
    />

    <SeparatedData :items="testData" ref="separatedDataRef">
      <template #label="item">
        <span class="font-semibold">Custom {{ item.label }}</span>
      </template>

      <template #value="item">
        <span>Custom {{ separatedDataRef?.parseValue(item.value) }}</span>
      </template>

      <template #separator>
        <span class="mx-1.5"> | </span>
      </template>
    </SeparatedData>

    <SeparatedData :items="testData">
      <template #label="item">
        <span class="font-semibold">Custom {{ item.label }}</span>
      </template>
    </SeparatedData>

    <SeparatedData :items="testData">
      <template #value="item">
        <span>Custom {{ item.value }}</span>
      </template>
    </SeparatedData>

    <SeparatedData :items="testData">
      <template #separator>
        <span class="mx-1.5 font-bold"> > </span>
      </template>
    </SeparatedData>

    <SeparatedData :items="{ count: 12 }"/>
  </div>
</template>

<script lang="ts" setup>
const testData = { 
  count: 12, 
  location: ['Warszawa', 'Poland'], 
  salary: '123123', 
  timestamp: '2024-07-07T07:07:07.123Z',
  employee: true,
  owner: 'false'
}

const separatedDataRef = useTemplateRef('separatedDataRef')
</script>
