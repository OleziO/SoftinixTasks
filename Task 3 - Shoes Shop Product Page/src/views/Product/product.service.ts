class ProductService {
  async getProductById(id: number) {
    const response = await fetch('/product.mock.json')
    const data: TProduct[] = await response.json()

    await new Promise(resolve => setTimeout(resolve, 1000))

    const product = data.find(p => p.id === id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async changeFavorite(id: number, value: boolean) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return !value
  }

  async addToCart(cartSize: number) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return cartSize + 1
  }
}

export const productService = new ProductService()
