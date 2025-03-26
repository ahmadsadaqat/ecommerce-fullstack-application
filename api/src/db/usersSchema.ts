import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),

  name: varchar({ length: 255 }),
  address: text(),
});

export const createUserSchema = createSelectSchema(usersTable)
  .omit({
    id: true,
    role: true,
  })
  .extend({
    address: z.string().optional(),
    name: z.string().optional(),
  });

export const loginSchema = createSelectSchema(usersTable).pick({
  email: true,
  password: true,
});
