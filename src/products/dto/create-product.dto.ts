import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsNumber()
    @Min(0)
    Price: number;
}
