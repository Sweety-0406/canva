import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects, projectsInsetSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, and, sql } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;
        const session = await auth();
        if (!session?.user ||  !session?.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        if (!projectId) {
            return NextResponse.json({ error: "Project ID required." }, { status: 400 });
        }

        const conditions = [
            eq(projects.id, projectId),
            eq(projects.userId, userId)
        ].filter(Boolean);

        // const data = await db.select().from(projects).where(
        //     conditions.length > 0 ? and(...conditions) : sql`1 = 1`
        // );
        const data = await db.query.projects.findFirst({
            where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
            with: {
                jsons: {
                    orderBy: (projectJsons, { asc }) => asc(projectJsons.index),
                }, 
            },
        });
        
        if (!data) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ data }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { projectId } = await params;
        if (!projectId) {
            return NextResponse.json({ error: "Missing projectId in URL" }, { status: 400 });
        }
        const userId = session.user.id;
        const schema = projectsInsetSchema.omit({
            id: true,
            userId: true,
            createdAt: true,
            updatedAt: true
        }).partial();
        const body = await request.json();
        const parsedBody = schema.safeParse(body);
        if (!parsedBody.success) {
            console.log(parsedBody)
            return NextResponse.json({ error: "Invalid request data", details: parsedBody.error }, { status: 400 });
        }

        const values = parsedBody.data;

        const conditions = [
            eq(projects.id, projectId),
            eq(projects.userId, userId)
        ].filter(Boolean);

        const data = await db.update(projects).set({
            ...values,
            updatedAt: new Date(),
        }).where(
            conditions.length > 0 ? and(...conditions) : sql`1 = 1`
        ).returning();

        if (!data[0]) {
            return NextResponse.json({ error: "Unauthorized. Can't update" }, { status: 404 });
        }

        return NextResponse.json({ data: data[0] }, { status: 200 });

    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;
        const session = await auth();
        if (!session?.user || !session?.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        if (!projectId) {
            return NextResponse.json({ error: "Project ID required." }, { status: 400 });
        }

        const conditions = [
            eq(projects.id, projectId),
            eq(projects.userId, userId)
        ].filter(Boolean);

        const data = await db.delete(projects).where(
            conditions.length > 0 ? and(...conditions) : sql`1 = 1`
        ).returning();

        if (data.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ data: { projectId } }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}