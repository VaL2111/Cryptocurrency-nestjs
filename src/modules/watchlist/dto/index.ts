import { IsString } from "class-validator";

export class watchListDTO {
  @IsString()
  name: string;

  @IsString()
  assetId: string;
}
