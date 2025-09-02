import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {GetProductsDto} from "./dto/get-products.dto";

@Injectable()
export class ProductsRepository {
    constructor(private prisma: PrismaService) {}

    create(data: CreateProductDto) {
        return this.prisma.products.create({ data });
    }

    async findAll(data: GetProductsDto) {
        const [products, totalCount] = await this.prisma.$transaction([
            this.prisma.products.findMany({
                skip: ((data.pageIndex ?? 1) - 1) * (data.pageSize ?? 10),
                take: data.pageSize ?? 10,
                orderBy: {
                    [data.sortField ?? 'Price']: data.sort ?? 'asc',
                },
            }),
            this.prisma.products.count(),
        ]);

        return {
            data: products,
            count: totalCount,
        };
    }

    findOne(Id: number) {
        return this.prisma.products.findUnique({ where: { Id } });
    }

    async findExpensivest() {
        return this.prisma.products.findFirst({
            orderBy: {
                Price: 'desc'
            }
        });
    }

    async findCheapest() {
        return this.prisma.products.findFirst({
            orderBy: {
                Price: 'asc'
            }
        });
    }

    async findMedian() {
        return this.prisma.products.findMany({
            orderBy: {
                Price: 'asc'
            }
        })
    }

    remove(Id: number) {
        return this.prisma.products.delete({ where: { Id } });
    }

    removeAll() {
        return this.prisma.products.deleteMany();
    }

    count() {
        return this.prisma.products.count();
    }
}