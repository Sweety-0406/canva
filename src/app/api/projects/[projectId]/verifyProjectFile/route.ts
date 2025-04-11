import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq , and} from "drizzle-orm";
import bcrypt from "bcryptjs";

interface IParams{
    projectId:string
}


export async function POST(req : Request, { params }: { params: IParams }) {
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
        const body = await req.json();
        const {password} = body
        if (!password) {
            console.log("Password is required")
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }
        
        const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
      .limit(1);

    if (!project) {
      console.log("Project not found");
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const isCorrectPassword = await bcrypt.compare(password, project.hashedPassword || "");
    if (!isCorrectPassword) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid password" }, { status: 403 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

        
    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}