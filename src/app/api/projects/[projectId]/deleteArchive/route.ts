
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects} from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq ,and} from "drizzle-orm";

interface IParams{
    projectId:string
}


export async function PATCH(req : Request, { params }: { params: IParams }) {
    try {
        const session = await auth()
        if(!session?.user || !session?.user?.id) {
            console.log("Unathorized")
            return NextResponse.json({error:"Unathorized"},{status: 401})
        }
        const {projectId} = params
        if (!projectId) {
            console.log("Missing projectId in URL")
            return NextResponse.json({ error: "Missing projectId in URL" }, { status: 400 });
        }
        const userId = session.user.id
        const result = await db
        .update(projects)
        .set({
            isArchive: false
        })
        .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
        .returning();

        if (result.length === 0) {
            console.log("not found project")
        return NextResponse.json({ error: "Project not found or not authorized" }, { status: 404 });
        }

        return NextResponse.json({ data: result[0] }, { status: 200 });

    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


