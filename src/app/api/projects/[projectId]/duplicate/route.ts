import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects} from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq , and} from "drizzle-orm";

interface IParams{
    projectId:string
}

export async function POST(req : Request, { params }: { params: IParams }) {
    try {
        const session = await auth()
        if(!session?.user || !session?.user?.id) {
            return NextResponse.json({error:"Unathorized"},{status: 401})
        }
        const {projectId} = params
        if (!projectId) {
            return NextResponse.json({ error: "Missing projectId in URL" }, { status: 400 });
        }
        const userId = session.user.id

        const data = await db.select().from(projects).where(
            and(
                eq(projects.id, projectId),
                eq(projects.userId, userId)
            )
        )
        
        if(data.length === 0){
            return NextResponse.json({error: "Not found"},{status: 404})
        }

        const project = data[0];

        const duplicateData = await db.insert(projects).values({
            name: `Copy of ${project.name}`,
            json: project.json,
            width: project.width,
            height: project.height,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();
        return NextResponse.json({data: duplicateData[0]},{status: 200})

    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}