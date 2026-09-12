import { Router } from "express";
import { createHotel, getHotel, getHotels } from "../../controllers/hotel.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createHotelSchema } from "../../schemas/hotel.schema.js";

const hotelRouter = Router();

hotelRouter.post("/", validate(createHotelSchema), createHotel);
hotelRouter.get("/:id", getHotel);
hotelRouter.get("/", getHotels);

export default hotelRouter;
