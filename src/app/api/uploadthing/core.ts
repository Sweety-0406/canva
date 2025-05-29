// import { auth } from "@/auth";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();


// export const ourFileRouter = {
//   imageUploader: f({image: {maxFileSize: "4MB"}})
//     .middleware(async () => {
//       const session = await auth()

//       if (!session?.user) throw new UploadThingError("Unauthorized");
//       return { userId: session.user?.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log(metadata)
//       return { url: file.ufsUrl };
//     }),

//   videoUploader: f({ video: { maxFileSize: "512MB" } }) 
//     .middleware(async () => {
//       const session = await auth();
//       if (!session?.user) throw new UploadThingError("Unauthorized");
//       return { userId: session.user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log(metadata)
//       return { url: file.ufsUrl };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


export const ourFileRouter = {
  imageUploader: f({image: {maxFileSize: "4MB"}})
    .middleware(async () => {
      const session = await auth()

      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({file }) => {
      return { url: file.ufsUrl };
    }),

  videoUploader: f({ video: { maxFileSize: "512MB" } }) 
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
