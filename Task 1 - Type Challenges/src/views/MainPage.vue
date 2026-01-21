<template>
  <div class="p-4 space-y-2">
    <div v-for="(line, index) in results" :key="index">
      {{ line }}
    </div>
  </div>
</template>

<script setup lang="ts">
const testPick: TCustomPick<{ a: number; b: string; c: boolean }, 'a' | 'c'> = { a: 1, c: true }
const testReadonly: TCustomReadonly<{ a: number; b: string }> = { a: 1, b: 'test' }
const testTupleToObject: TCustomTupleToObject<['x', 'y', 'z']> = { x: 'x', y: 'y', z: 'z' }
const testFirst: TCustomFirst<[1, 2, 3]> = 1
const testLength: TCustomLength<[1, 2, 3, 4]> = 4
const testExcluded: TCustomExclude<'a' | 'b' | 'c', 'a' | 'b'> = 'c'
const testAwaited: TCustomAwaited<Promise<number>> = 2
const testIf: TCustomIf<true, 'yes', 'no'> = 'yes'
const testConcat: TCustomConcat<[1, 2], [3, 4]> = [1, 2, 3, 4]
const testIncludes: TCustomIncludes<[1, 2, 3], 2> = true
const testPush: TCustomPush<[1, 2], 3> = [1, 2, 3]
const testUnshift: TCustomUnshift<[1, 2], 0> = [0, 1, 2]
const testParams: TCustomParameters<(a: number, b: string) => boolean>  = [1, '1']

const results = [
  `TCustomPick<{ a: number; b: string; c: boolean }, 'a' | 'c'> = ${JSON.stringify(testPick)}`,
  `TCustomReadonly<{ a: number; b: string }> = ${JSON.stringify(testReadonly)}`,
  `TCustomTupleToObject<['x', 'y', 'z']> = ${JSON.stringify(testTupleToObject)}`,
  `TCustomFirst<[1, 2, 3]> = ${testFirst}`,
  `TCustomLength<[1, 2, 3, 4]> = ${testLength}`,
  `TCustomExclude<'a' | 'b' | 'c', 'a' | 'b'> = ${testExcluded}`,
  `TCustomAwaited<Promise<number>> = ${testAwaited}`,
  `TCustomIf<true, 'yes', 'no'> = ${testIf}`,
  `TCustomConcat<[1, 2], [3, 4]> = [${testConcat}]`,
  `TCustomIncludes<[1, 2, 3], 2> = ${testIncludes}`,
  `TCustomPush<[1, 2], 3> = [${testPush}]`,
  `TCustomUnshift<[1, 2], 0> = [${testUnshift}]`,
  `TCustomParameters<(a: number, b: string) => boolean> = [${testParams.map(item => typeof item)}]`,
]

</script>
