import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, ParseIntPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {GetProductsDto} from "./dto/get-products.dto";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити продукт' })
  @ApiResponse({ status: 201, description: 'Продукт успішно створено' })
  @ApiResponse({ status: 400, description: 'Невалідні дані' })
  create(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всі продукти з пагінацією та сортуванням' })
  @ApiResponse({ status: 200, description: 'Список продуктів успішно отримано' })
  findAll(@Query(new ValidationPipe({ transform: true })) dto: GetProductsDto) {
    return this.productsService.findAll(dto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Отримати кількість усіх продуктів' })
  @ApiResponse({ status: 200, description: 'Повертає загальну кількість продуктів' })
  countOfAll() {
    return this.productsService.countOfAll();
  }

  @Get('expensivest')
  @ApiOperation({ summary: 'Отримати найдорожчий продукт' })
  @ApiResponse({ status: 200, description: 'Повертає найдорожчий продукт' })
  expensivestFromAll() {
    return this.productsService.expensivestFromAll();
  }

  @Get('cheapest')
  @ApiOperation({ summary: 'Отримати найдешевший продукт' })
  @ApiResponse({ status: 200, description: 'Повертає найдешевший продукт' })
  cheapestFromAll() {
    return this.productsService.cheapestFromAll();
  }

  @Get('median')
  @ApiOperation({ summary: 'Отримати медіанну ціну серед усіх продуктів' })
  @ApiResponse({ status: 200, description: 'Повертає медіанну ціну' })
  medianFromAll() {
    return this.productsService.medianFromAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукту' })
  @ApiResponse({ status: 200, description: 'Продукт успішно знайдено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete()
  @ApiOperation({ summary: 'Видалити всі продукти' })
  @ApiResponse({ status: 200, description: 'Всі продукти видалено' })
  removeAll() {
    return this.productsService.removeAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити продукт за ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID продукту' })
  @ApiResponse({ status: 200, description: 'Продукт успішно видалено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.remove(+id);
  }
}
