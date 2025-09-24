import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/modals/User";
import { ConnectTodatabase } from "./db";
import bcrypt from "bcryptjs";

export const authOption:NextAuthOptions={
  providers:[
    CredentialsProvider({
      name:"Credentials",
      credentials:{
      email:{lebel:"Email",type:"text"},
      password:{lebel:"Password",type:"password"}
      },
async authorize(credentials){
if(!credentials?.email || !credentials.password){
  throw new Error("missing email and password")
}
try{
await ConnectTodatabase();
const user = await User.findOne({ email: credentials.email });
if (!user){
  throw new Error("No User Found")
}
const isValid= await bcrypt.compare(credentials.password,
  user.password)
if(!isValid){
  throw new Error("Invalid Password")
}
return {
  id:user._id.toString(),
  email:user.email
}
}catch(error){
  throw error}


}
    })
  ],
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id=user.id
      }
      return token
    },
    async session({session,token}){
      if(session.user){
        session.user.id=token.id as string
      }
      return session
    }
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },

  session:{
    strategy:"jwt",
    maxAge:30*24*60*60
  },
  secret:process.env.NEXTAUTH_SECRET
}

