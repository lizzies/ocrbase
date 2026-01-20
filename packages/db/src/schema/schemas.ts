import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { createId } from "../lib/ids";
import { organization, user } from "./auth";

export const schemas = pgTable(
  "schemas",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId("schema")),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    jsonSchema: jsonb("json_schema").notNull(),
    sampleJobId: text("sample_job_id"),
    generatedBy: text("generated_by"),
    usageCount: integer("usage_count").notNull().default(0),
    lastUsedAt: timestamp("last_used_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("schemas_organization_id_idx").on(table.organizationId),
    index("schemas_user_id_idx").on(table.userId),
  ]
);

export const schemasRelations = relations(schemas, ({ one }) => ({
  organization: one(organization, {
    fields: [schemas.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [schemas.userId],
    references: [user.id],
  }),
}));

export type Schema = typeof schemas.$inferSelect;
export type NewSchema = typeof schemas.$inferInsert;
