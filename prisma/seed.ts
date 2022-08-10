
import { Prisma, PrismaClient } from '@prisma/client'
import seedStores from './seed/stores.json'
import seedProducts from './seed/products.json'

const prisma = new PrismaClient()

const main = async () => {
  // Stores
  console.log(`Importing ${seedStores.length} stores…`)
  for (const storeData of seedStores) {
    console.log(`Import ${storeData.name}`)
    await prisma.store.upsert({
      where: { id: storeData.id },
      create: storeData,
      update: { ...storeData, id: undefined }
    })
  }

  // Products
  console.log(`Importing ${seedProducts.length} products…`)
  for (let i = 0; i < seedProducts.length; i++) {
    const seedProduct = seedProducts[i]
    console.log(`Import ${seedProduct.name}`)
    const {
      categories = [],
      storeSlug,
      ...remainingProductData
    } = seedProduct

    const productData: Prisma.ProductUncheckedCreateInput = {
      position: (i + 1) * 10,
      ...remainingProductData,
      categories: {
        connectOrCreate: categories.map((categoryName: string) => ({
          where: { name: categoryName },
          create: { name: categoryName }
        }))
      },
      storeId: seedStores.find(store => store.slug === storeSlug)!.id,
    }

    await prisma.product.upsert({
      where: { id: seedProduct.id },
      create: productData,
      update: productData
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
