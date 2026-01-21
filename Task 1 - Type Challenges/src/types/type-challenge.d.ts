type TCustomPick<T, K extends keyof T> = {
  [P in K]: T[P]
};

type TCustomReadonly<T> = {
  readonly [P in keyof T]: T[P]
};

type TCustomTupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K
}

type TCustomFirst<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

type TCustomLength<T extends any[]> = T['length'];

type TCustomExclude<T, U> = T extends U ? never : T;

type TCustomAwaited<T> = T extends Promise<infer U> ? U : T;

type TCustomIf<C extends boolean, T, F> = C extends true ? T : F;

type TCustomConcat<T extends any[], U extends any[]> = [...T, ...U];

type TCustomIncludes<T extends any[], U> = 
  T extends [infer First, ...infer Rest] 
    ? First extends U 
      ? U extends First 
        ? true 
        : TCustomIncludes<Rest, U>
      : TCustomIncludes<Rest, U>
    : false

type TCustomPush<T extends any[], V> = [...T, V];

type TCustomUnshift<T extends any[], V> = [V, ...T];

type TCustomParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
