ALTER TABLE "todos" DROP CONSTRAINT "todos_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;