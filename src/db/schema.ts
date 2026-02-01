import { pgTable, serial, text, timestamp, boolean, json } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  link: text('link'),
  githubUrl: text('github_url'),
  tags: json('tags').$type<string[]>().default([]),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const curriculum = pgTable('curriculum', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  description: text('description'),
  type: text('type').notNull(), // "work", "education", "skill"
  createdAt: timestamp('created_at').defaultNow(),
});
