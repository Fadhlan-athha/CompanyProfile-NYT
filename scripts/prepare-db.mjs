import { mkdir, open } from "node:fs/promises";
import { dirname, join } from "node:path";

const dbPath = join(process.cwd(), "prisma", "dev.db");

await mkdir(dirname(dbPath), { recursive: true });

const file = await open(dbPath, "a");
await file.close();
