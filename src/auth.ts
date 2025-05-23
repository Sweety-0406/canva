import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/drizzle"
import Credentials from 'next-auth/providers/credentials';
// import { JWT } from "next-auth/jwt"
import "next-auth/jwt"
import bcrypt from "bcryptjs"
import {z} from "zod"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"

const credentialSchema = z.object({
  email: z.string().email(),
  password: z.string()
}) 

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    GitHub,
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        const validateFields = credentialSchema.safeParse(credentials)
        if(!validateFields.success){
          return null;
        }
        const {email, password} = validateFields.data
        const query = await db.select().from(users).where(eq(users.email,email))
        const user = query[0]
        if(!user || !user.hashedPassword){
          return null
        }
        const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword)
        if(!isCorrectPassword){
          return null
        }

        return user
      }
    })

  ],
  pages:{
    signIn:"/sign-in",
  },
  session:{
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { 
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if(token.id){
        session.user.id = token.id
      }
      return session
    },
  },
})