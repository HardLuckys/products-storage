import {
    ArrayMaxSize,
    ArrayMinSize, ArrayUnique, Equals,
    IsArray, IsDefined, IsInstance,
    IsInt,
    IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
    ValidateNested
} from 'class-validator';
import {Type} from "class-transformer";

export class Size {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    width: number
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    height: number
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    length: number
}

export class CreateProductDto{

    @IsNotEmpty()
    vendor_code: string

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    categoryId: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    sizeId: number

    @IsArray()
    @ArrayUnique((o: IFeature) => o.id)
    @IsOptional()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(2)
    @Type(() => IFeature)
    features: IFeature[]

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    name: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(2000)
    description: string

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => Size)
    size: Size
}

export class IFeature {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    id: number
}