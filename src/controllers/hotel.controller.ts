import { logger } from "../lib/logger.js";
import * as hotelService from "../services/hotel.service.js";
import { sendSuccess } from "../utils/api-response.js";

import type { Request, Response } from "express";
import type { CreateHotelInput } from "../schemas/hotel.schema.js";

export async function createHotel(req: Request<{}, {}, CreateHotelInput>, res: Response) {
  const hotel = await hotelService.createHotel(req.body);
  sendSuccess(res, 201, hotel);
}

export async function getHotel(req: Request<{ id: string }>, res: Response) {
  const hotel = await hotelService.getHotel(req.params.id);
  sendSuccess(res, 200, hotel);
}

export async function getHotels(_req: Request, res: Response) {
  const hotels = await hotelService.getHotels();
  sendSuccess(res, 200, hotels);
}
