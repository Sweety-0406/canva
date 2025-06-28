CREATE TABLE "projectJson" (
	"id" text PRIMARY KEY NOT NULL,
	"projectId" text NOT NULL,
	"json" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "tag" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "isPrivate" boolean;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "isRemove" boolean;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "isArchive" boolean;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "hashedPassword" text;--> statement-breakpoint
ALTER TABLE "projectJson" ADD CONSTRAINT "projectJson_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;