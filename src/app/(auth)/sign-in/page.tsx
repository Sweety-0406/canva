import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignInCard } from "@/features/editor/components/signin-card";

const SignInPage = async()=>{
    const session = await auth()
    if(session){
        redirect('/')
    }
    return(
        <div>
            <SignInCard />
        </div>
    )
}

export default SignInPage