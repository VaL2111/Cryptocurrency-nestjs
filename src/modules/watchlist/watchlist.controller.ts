import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { watchListDTO } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { CreateAssetResponse } from "./response";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("watchlist")
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags("API")
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post("create")
  createAsset(
    @Body() assetDto: watchListDTO,
    @Req() request: { user: { id: number } },
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @ApiTags("API")
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(
    @Query("id") assetId: string,
    @Req() request: { user: { id: number } },
  ): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
