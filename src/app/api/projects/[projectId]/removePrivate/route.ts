import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface IParams {
    projectId: string;
}

// Update the function signature to use Promise<IParams>
export async function PATCH(req: Request, { params }: { params: Promise<IParams> }) {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Await the params since they're now Promise-wrapped
        const resolvedParams = await params;
        const { projectId } = resolvedParams;
        
        if (!projectId) {
            return NextResponse.json({ error: "Missing projectId in URL" }, { status: 400 });
        }

        const userId = session.user.id;
        const body = await req.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const [project] = await db
            .select()
            .from(projects)
            .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
            .limit(1);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const isCorrectPassword = await bcrypt.compare(password, project.hashedPassword || "");

        if (!isCorrectPassword) {
            return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
        }

        const result = await db
            .update(projects)
            .set({
                hashedPassword: null,
                isPrivate: false,
            })
            .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
            .returning();

        if (result.length === 0) {
            return NextResponse.json({ error: "Project not found or not authorized" }, { status: 404 });
        }

        return NextResponse.json({ data: result[0] }, { status: 200 });

    } catch (error) {
        console.error("Remove Private API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}