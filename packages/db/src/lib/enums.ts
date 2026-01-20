import { pgEnum } from "drizzle-orm/pg-core";

export const jobTypeEnum = pgEnum("job_type", ["parse", "extract"]);

export const jobStatusEnum = pgEnum("job_status", [
  "pending",
  "processing",
  "extracting",
  "completed",
  "failed",
]);

export type JobType = (typeof jobTypeEnum.enumValues)[number];
export type JobStatus = (typeof jobStatusEnum.enumValues)[number];
