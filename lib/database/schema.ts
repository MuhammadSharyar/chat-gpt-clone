import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(uuidv4),
  provider: varchar("provider", { length: 10 }).notNull(),
  name: varchar("name", { length: 40 }).notNull(),
  // firstName: varchar("first_name", { length: 30 }).notNull(),
  // lastName: varchar("last_name", { length: 30 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  password: varchar("password", { length: 100 }),
  picture: text("picture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chats = pgTable("chats", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(uuidv4),
  userId: varchar("user_id", { length: 36 })
    .references(() => users.id)
    .notNull(),
  chatName: varchar("chat_name", { length: 40 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: varchar("chat_id", { length: 36 })
    .references(() => chats.id)
    .notNull(),
  content: text("content"),
  role: varchar("role", { length: 10 }).notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
});
