import { integer, numeric, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  ratings: numeric("ratings", { precision: 2, scale: 1 }).notNull().default("0.0"),
  ratingCount: integer("rating_count").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
