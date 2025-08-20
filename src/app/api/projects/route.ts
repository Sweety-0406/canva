import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projectJsons, projects } from "@/db/schema";
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
    const schema = z.object({
      name: z.string(),
      json: z.string(), 
      width: z.number(),
      height: z.number(),
    });
    const body = await req.json()
    const parsedBody = schema.safeParse(body)
    if(!parsedBody.success){
      return NextResponse.json({error: "Invalid request data", details: parsedBody.error}, {status: 400})
    }

    const{name, json, height, width} = parsedBody.data
    console.log(parsedBody.data)

    if (!name || json===undefined || !height || !width || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const [project] = await db.insert(projects).values({
      name,
      width,
      height,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    if (!project) {
      return NextResponse.json({ error: "Project creation failed" }, { status: 500 });
    }

    
    await db.insert(projectJsons).values({
      projectId: project.id,
      json,
      index:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ data: project }, { status: 200 });

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

