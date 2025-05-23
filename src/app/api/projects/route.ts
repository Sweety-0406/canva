import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects, projectsInsetSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq , desc, and} from "drizzle-orm";
import { z } from "zod";



export async function POST(req: Request) {
  try {
    const session = await auth()
    if(!session?.user) {
        return NextResponse.json({error:"Unathorized"},{status: 401})
    }
    const userId = session.user.id
    const schema = projectsInsetSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true
    })
    const body = await req.json()
    const parsedBody = schema.safeParse(body)
    if(!parsedBody.success){
        return NextResponse.json({error: "Invalid request data", details: parsedBody.error}, {status: 400})
    }

    const{name, json, height, width} = parsedBody.data

    console.log(name, json, height, width, userId)
    if (!name || json===undefined || !height || !width || !userId) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const data = await db.insert(projects).values({
        name,
        json,
        width,
        height,
        userId: userId, 
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();

    if(!data[0]){
    return NextResponse.json({error: "Something went wrong."})
    }
    console.log(data[0])
    return NextResponse.json({data: data[0]},{status: 200})

  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}





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
    
    const userId = session.user.id;

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
      .where(
        and(eq(projects.userId, userId), eq(projects.isArchive, false))
      )
      .limit(intLimit)
      .offset((intPage - 1) * intLimit)
      .orderBy(desc(projects.updatedAt));

    return NextResponse.json(
      { data, nextPage: data.length === intLimit ? intPage + 1 : null },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

