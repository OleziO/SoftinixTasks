import { EProductSizesType } from '@/types'

class ShoesSizesService {
  roundToStep (value: number, step: number) {
    return Math.round(value / step) * step
  }

  calcUS (uk: number): number {
    return this.roundToStep(uk + 1, 0.5)
  }

  calcEU (uk: number): number {
    const raw = uk * 1.28 + 31.75

    return this.roundToStep(raw, 0.5)
  }

  calcFootLength (uk: number) {
    const raw = 22.5 + (uk - 3) * 1

    return Math.ceil(raw * 2) / 2
  }

  toTwoDecimalsPrice (value: number): string {
    return value.toFixed(2)
  }

  mapSizesByUk (items: TProductShoesSize[]) {
    return items.reduce((acc, item) => {
      const uk = item.size

      acc[uk] = {
        [EProductSizesType.UK]: uk,
        [EProductSizesType.EU]: this.calcEU(uk),
        [EProductSizesType.US]: this.calcUS(uk),
        [EProductSizesType.FootLengthCm]: this.calcFootLength(uk)
      }

      return acc
    }, {} as TProductSizesHash)
  }

  convertSizes (convertTo: EProductSizesType, sizesMap: TProductSizesHash, sizes: TProductShoesSize[]) {
    return sizes.map(item => {
      const newSize = sizesMap[item.size][convertTo]

      return { ...item, originalSize: item.size, size: newSize }
    })
  }

  generateProductSizeLabel (type: EProductSizesType, value: number) {
    return type === EProductSizesType.FootLengthCm
      ? `${value} cm`
      : `${value} ${type}`
  }
}

export const shoesSizesService = new ShoesSizesService()
