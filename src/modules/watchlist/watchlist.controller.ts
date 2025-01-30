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

@Controller("watchlist")
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  createAsset(@Body() assetDto: watchListDTO, @Req() request) {
    // eslint-disable-next-line
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query("id") assetId: string, @Req() request): Promise<boolean> {
    // eslint-disable-next-line
    const { id } = request.user;
    return this.watchlistService.deleteAsset(Number(id), assetId);
  }
}
