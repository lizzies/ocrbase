import { nanoid } from "nanoid";

export const ID_PREFIXES = {
  job: "job",
  schema: "sch",
  organization: "org",
} as const;

type IdPrefix = keyof typeof ID_PREFIXES;

export const createId = (prefix: IdPrefix): string => {
  const prefixValue = ID_PREFIXES[prefix];
  const id = nanoid(16);
  return `${prefixValue}_${id}`;
};
