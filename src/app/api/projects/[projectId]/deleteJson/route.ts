import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { projectJsons } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { projectId } = await params;

    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const body = await req.json();
    const { pageId } = body;

    if (!pageId) {
      return NextResponse.json({ error: "Page ID required" }, { status: 400 });
    }

    const deleted = await db
      .delete(projectJsons)
      .where(and(eq(projectJsons.id, pageId), eq(projectJsons.projectId, projectId)));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE_PAGE_ERROR]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
