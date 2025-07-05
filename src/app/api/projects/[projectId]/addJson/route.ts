import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projectJsons, projects, projectsInsetSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq , desc, and} from "drizzle-orm";
import { z } from "zod";



export async function POST(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
        return NextResponse.json({ error: "Project ID required." }, { status: 400 });
    }
    const session = await auth()
    if(!session?.user) {
      return NextResponse.json({error:"Unathorized"},{status: 401})
    }
    const userId = session.user.id
    const schema = z.object({
      json: z.string(), 
      index: z.number()
    });
    const body = await req.json()
    const parsedBody = schema.safeParse(body)
    if(!parsedBody.success){
      console.log(parsedBody)
      return NextResponse.json({error: "Invalid request data", details: parsedBody.error}, {status: 400})
    }

    const{ json, index} = parsedBody.data

    if ( json===undefined || !index || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const [projectJson] = await db.insert(projectJsons).values({
      projectId,
      json,
      index,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    if (!projectJson) {
      return NextResponse.json({ error: "Project creation failed" }, { status: 500 });
    }


    return NextResponse.json({ data: projectJson }, { status: 200 });

  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json({ error: "Project ID required." }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Validation schema for PATCH body
    const schema = z.object({
      json: z.string(),
      index: z.number(),
    });

    const body = await req.json();
    const parsedBody = schema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsedBody.error },
        { status: 400 }
      );
    }

    const { json, index } = parsedBody.data;
    console.log(index)

    // Find existing projectJson row by projectId and index
    const existingEntry = await db.query.projectJsons.findFirst({
      where: and(eq(projectJsons.projectId, projectId), eq(projectJsons.index, index)),
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: `No project JSON found for projectId: ${projectId} and index: ${index}` },
        { status: 404 }
      );
    }

    // Update the found entry
    const updated = await db
      .update(projectJsons)
      .set({
        json,
        updatedAt: new Date(),
      })
      .where(
        and(eq(projectJsons.projectId, projectId), eq(projectJsons.index, index))
      )
      .returning();

    return NextResponse.json({ data: updated[0] }, { status: 200 });
  } catch (error) {
    console.error("Update projectJson API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
