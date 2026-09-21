import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contactMessages = sqliteTable('contact_messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company').notNull().default(''),
  interest: text('interest').notNull(),
  subject: text('subject').notNull().default(''),
  preference: text('preference').notNull().default(''),
  message: text('message').notNull(),
  createdAt: integer('created_at').notNull(),
}, table => [index('idx_contact_messages_email_created').on(table.email, table.createdAt)]);
