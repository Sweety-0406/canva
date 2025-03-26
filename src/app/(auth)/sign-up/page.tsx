import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SignUpCard } from "@/features/editor/components/signup-card";

const SignInPage = async()=>{
    const session = await auth()
    if(session){
        redirect('/')
    }
    return(
        <div>
            <SignUpCard />
        </div>
    )
}

export default SignInPage