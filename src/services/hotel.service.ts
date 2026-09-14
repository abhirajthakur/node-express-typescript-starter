import { logger } from "../lib/logger.js";
import * as hotelRepository from "../repositories/hotel.repository.js";
import { notFound } from "../utils/api-error.js";

import type { CreateHotelInput } from "../schemas/hotel.schema.js";

export async function createHotel(hotelData: CreateHotelInput) {
  const hotel = await hotelRepository.createHotel(hotelData);
  if (!hotel) {
    logger.error("Failed to create hotel", { hotelData });
    throw new Error("Failed to create hotel");
  }

  logger.info("Hotel created", { hotelId: hotel.id });
  return hotel;
}

export async function getHotel(id: string) {
  const hotel = await hotelRepository.findHotelById(id);
  if (!hotel) {
    logger.error("Hotel not found", { hotelId: id });
    throw notFound(`Hotel with id ${id} not found`);
  }

  logger.info("Hotel retrieved", { hotelId: hotel.id });
  return hotel;
}

export async function getHotels() {
  const hotels = await hotelRepository.findAllHotels();
  if (!hotels || hotels.length === 0) {
    logger.error("No hotels found");
    throw notFound("No hotels found");
  }

  logger.info("Hotels retrieved", { count: hotels.length });
  return hotels;
}
