CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY,
	"name" varchar,
	"email" varchar,
	"city" varchar,
	"state" varchar
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY,
	"order_id" uuid,
	"product_id" uuid,
	"quantity" integer,
	"unit_price" numeric
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY,
	"customer_id" uuid,
	"status" varchar,
	"total_amount" numeric,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY,
	"name" varchar,
	"price" numeric,
	"cost_price" numeric,
	"stock_quantity" integer,
	"category_id" uuid
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id");--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");