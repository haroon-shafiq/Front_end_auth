import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/config/env";
import { loginUser } from "@/services/auth";
export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                try{
                    const data = await loginUser({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                    console.log("Data in auth:", data)
                    if(data?.user){
                        return {
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email,
                            role: data.user.role,
                            accessToken: data.token
                        }
                    }
                    return null;
                }
                catch(error){
                    console.error("Error in auth", error)
                    throw new Error(
                        error?.response?.data?.message || "Login failed"
                    );
                }
            }
        }),
    ],
    callbacks:{
    async jwt({ token, user }) {
        if(user){
            token.id = user.id;
            token.role = user.role;
            token.accessToken = user.accessToken
        }    
        return token
    },
    async session({session, token}) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        return session; 
    }
    },
    session: { strategy: "jwt" },
    pages: {signIn: "/signin"},
    secret: env.NEXTAUTH_SECRET,
}

