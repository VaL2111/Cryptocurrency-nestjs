import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
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

  @Get("get-all")
  getAllAssets() {
    return;
  }

  @Patch("update")
  updateAsset() {
    return;
  }

  @Delete()
  deleteAsset(@Query("id") id: string) {
    return;
  }
}
