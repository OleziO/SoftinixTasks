type TProductModel = {
  color?: number
  size?: number
}

type TProductShoesSize = {
  size: number
  available: boolean
}

type TProductSizesHash = Record<number, Record<import('@/types').EProductSizesType, number>>

type TColor = {
  id: number
  name: string
  images: string[]
  sizes: TProductShoesSize[]
}

type TProduct = {
  id: number
  name: string
  price: number
  description: string
  details: {
    brand: string,
    model: string,
    type: string,
    cushioning: string,
    weight: string
  },
  shipping: Record<string, string | number>
  colors: TColor[]
}
