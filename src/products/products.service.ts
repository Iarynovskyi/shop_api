import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {ProductsRepository} from "./product.repository";
import {GetProductsDto} from "./dto/get-products.dto";

@Injectable()
export class ProductsService {
  constructor(private repo: ProductsRepository) {}

  create(dto: CreateProductDto) {
    return this.repo.create(dto);
  }

  findAll(dto: GetProductsDto) {
    return this.repo.findAll(dto);
  }

  findOne(id: number) {
    return this.repo.findOne(id)
  }

  countOfAll() {
    return this.repo.count();
  }

  expensivestFromAll() {
    return this.repo.findExpensivest();
  }

  cheapestFromAll() {
    return this.repo.findCheapest();
  }

  async medianFromAll() {
    const allProducts = await this.repo.findMedian();
    if (allProducts.length === 0) {
      return 0;
    }

    const sortedPrices = allProducts.map(product => product.Price);
    const middle = Math.floor(sortedPrices.length / 2);

    if (sortedPrices.length % 2 === 0) {
      return (sortedPrices[middle - 1] + sortedPrices[middle]) / 2;
    } else {
      return sortedPrices[middle];
    }
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  removeAll() {
    return this.repo.removeAll();
  }
}
