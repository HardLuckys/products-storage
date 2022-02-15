import {IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength} from "class-validator";

export class ProductsFilterDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    search: string

    @IsOptional()
    @IsNotEmpty()
    @MinLength(1)
    orderField: string

    @IsOptional()
    @IsNotEmpty()
    @IsIn(['ASC', 'DESC', 'asc', 'desc'])
    orderParam: string

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    page: number

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    itemsCount: number
}