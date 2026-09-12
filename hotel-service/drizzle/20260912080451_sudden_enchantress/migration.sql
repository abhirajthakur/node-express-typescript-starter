ALTER TABLE "hotels" ADD COLUMN "ratings" numeric(2,1) NOT NULL;--> statement-breakpoint
ALTER TABLE "hotels" ADD COLUMN "rating_count" integer DEFAULT 0 NOT NULL;