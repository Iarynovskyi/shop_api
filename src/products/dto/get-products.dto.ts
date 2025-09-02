import { IsInt, IsOptional, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsDto {
    @IsInt()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    pageIndex?: number = 1;

    @IsInt()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    pageSize?: number = 10;

    @IsIn(['Price', 'Name'])
    @IsOptional()
    sortField?: 'Price' | 'Name' = 'Price';

    @IsIn(['asc', 'desc'])
    @IsOptional()
    sort?: 'asc' | 'desc' = 'asc';
}