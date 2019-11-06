import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products') //filter request to domain/products endpoint
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    return {
      id: generatedId
    };
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string,) {
    const products = this.productsService.getSingleProduct(prodId);
    return products;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    return {
      patch: 'success'
    };
  }

  @Delete(':id')
  async removeProduct(
    @Param('id') prodId: string
  ) {
    await this.productsService.removeProduct(prodId)
    return {
      delete: 'success'
    }
  }
}