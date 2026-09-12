import { db } from "../db/client.js";
import { hotels } from "../db/schema.js";

import type { CreateHotelInput } from "../schemas/hotel.schema.js";

export async function createHotel(hotelData: CreateHotelInput) {
  const [hotel] = await db
    .insert(hotels)
    .values({
      ...hotelData,
      ratings: hotelData.ratings?.toString(),
    })
    .returning();
  return hotel;
}

export async function findHotelById(id: string) {
  const hotel = await db.query.hotels.findFirst({
    where: { id: id },
  });

  return hotel;
}

export async function findAllHotels() {
  const hotels = await db.query.hotels.findMany();
  return hotels;
}
