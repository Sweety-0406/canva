
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects, projectJsons } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";

interface IParams {
  projectId: string;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<IParams> } 
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json(
        { error: "Missing projectId in URL" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const data = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

    if (data.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const project = data[0];
    
    const duplicateProject = await db
      .insert(projects)
      .values({
        name: `Copy of ${project.name}`,
        width: project.width,
        height: project.height,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    const newProject = duplicateProject[0];

    const originalJsons = await db
      .select()
      .from(projectJsons)
      .where(eq(projectJsons.projectId, project.id));

    if (originalJsons.length > 0) {
      const newJsons = originalJsons.map((jsonRow) => ({
        projectId: newProject.id,
        json: jsonRow.json,
        index: jsonRow.index,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await db.insert(projectJsons).values(newJsons);
    }


    return NextResponse.json({ data: newProject }, { status: 200 });
  } catch (error) {
    console.error("Duplicate API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
