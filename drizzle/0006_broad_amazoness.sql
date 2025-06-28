ALTER TABLE "project" ALTER COLUMN "isPrivate" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isRemove" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isArchive" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "json";