// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import { projects,  } from "@/db/schema";
// import { db } from "@/db/drizzle";
// import { eq , desc} from "drizzle-orm";
// import { z } from "zod";


// const querySchema = z.object({
//   page: z.coerce.number(),
//   limit: z.coerce.number(),
// });

// export async function GET(req: Request) {
//   try {
//     const session = await auth();
//     if (!session?.user || !session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const page = searchParams.get("page");
//     const limit = searchParams.get("limit");

//     const parsedQuery = querySchema.safeParse({ page, limit });
//     if (!parsedQuery.success) {
//       return NextResponse.json({ error: "Invalid query parameters", details: parsedQuery.error }, { status: 400 });
//     }

//     const { page: intPage, limit: intLimit } = parsedQuery.data;

    
//     const data = await db
//         .select()
//         .from(projects)
//         .where(eq(projects.isTemplate, true))
//         .limit(intLimit)
//         .offset((intPage - 1) * intLimit)
//         .orderBy(
//           desc(projects.createdAt),
//         );

//     return NextResponse.json({data: data});

//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects, projectJsons } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, desc, inArray } from "drizzle-orm";
import { z } from "zod";

// For query validation
const querySchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
});

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const parsedQuery = querySchema.safeParse({ page, limit });
    if (!parsedQuery.success) {
      return NextResponse.json({ error: "Invalid query parameters", details: parsedQuery.error }, { status: 400 });
    }

    const { page: intPage, limit: intLimit } = parsedQuery.data;

    // Step 1: Fetch paginated projects
    const rawProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.isTemplate, true))
      .orderBy(desc(projects.createdAt))
      .limit(intLimit)
      .offset((intPage - 1) * intLimit);

    // Step 2: Get project IDs
    const projectIds = rawProjects.map((p) => p.id);

    // Step 3: Fetch related projectJsons
    const relatedJsons = await db
      .select()
      .from(projectJsons)
      .where(inArray(projectJsons.projectId, projectIds));

    // Step 4: Group projectJsons by projectId
    const jsonsByProjectId = relatedJsons.reduce((acc, json) => {
      (acc[json.projectId] ||= []).push(json);
      return acc;
    }, {} as Record<string, typeof relatedJsons>);

    // Step 5: Merge into project response
    const data = rawProjects.map((project) => ({
      ...project,
      jsons: jsonsByProjectId[project.id] || [],
    }));

    return NextResponse.json({ data });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
