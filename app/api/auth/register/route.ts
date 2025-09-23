import { NextRequest,NextResponse } from "next/server";
import User from "@/modals/User";
import {ConnectTodatabase} from "@/lib/db";


export async function POST(request:NextRequest){
try{
  const {email,password}=await request.json()
  if(!email || !password ){
    return NextResponse.json({error:"please fill all the fields"},{status:400})
  }

  await ConnectTodatabase()

  const existinguser= await User.findOne({email})
  if(existinguser){
    return NextResponse.json({error:"user already exists"},{status:400})
  }
  await User.create({email,password})
  return NextResponse.json({message:"user registered successfully"},{status:201})
}
catch(error){
  console.log(error)
  return NextResponse.json({error:"internal server error"},{status:500  })
}
}