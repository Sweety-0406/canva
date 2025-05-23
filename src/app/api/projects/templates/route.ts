import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects,  } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq , desc} from "drizzle-orm";
import { z } from "zod";


const querySchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
});

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const parsedQuery = querySchema.safeParse({ page, limit });
    if (!parsedQuery.success) {
      return NextResponse.json({ error: "Invalid query parameters", details: parsedQuery.error }, { status: 400 });
    }

    const { page: intPage, limit: intLimit } = parsedQuery.data;

    
    const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(intLimit)
        .offset((intPage - 1) * intLimit)
        .orderBy(
          
          desc(projects.createdAt),
        );

    return NextResponse.json({data: data});

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}