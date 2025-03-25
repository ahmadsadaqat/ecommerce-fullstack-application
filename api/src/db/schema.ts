import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export const createProductSchema = createSelectSchema(productsTable)
  .omit({
    id: true,
  })
  .extend({
    description: z.string().optional(),
    image: z.string().optional(),
  });

export const updateProductSchema = createSelectSchema(productsTable)
  .omit({
    id: true,
  })
  .partial();
