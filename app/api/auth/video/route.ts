import { authOption } from "@/lib/auth";
import { ConnectTodatabase } from "@/lib/db";
import Video, { IVideo } from "@/modals/Video";
import { error } from "console";
import { connect } from "http2";
import next from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    await ConnectTodatabase()
   const videos=await Video.find({}).sort({createdAt:-1}).lean()

   if(!videos || videos.length===0){}
return NextResponse.json([],{status:200})
  }catch(error){
return NextResponse.json({error:"Internal Server Error"},{status:500})
}
}


export async function POST(request:NextResponse){
try{
  const session = await getServerSession(authOption)

  if(!session){
    return NextResponse.json({error:"Unauthorized"},{status:401})
  }
  await ConnectTodatabase()
const body:IVideo = await request.json()
if (!body.title || !body.description || !body.videoUrl || !body.thubmbnailUrl){
  return NextResponse.json({error:"missinig ewquird fields"},{status:404})
}

const videoData={
  ...body,controls:body.controls ?? true,
  transformation:{
    height:1920,
    width:1080,
    quality:body.tranformations?.quality??100
  }
}
const newvideo=await Video.create(videoData)
return NextResponse.json(newvideo,{status:201})
}
  catch(error){

    return NextResponse.json({error:"Internal Server Error"},{status:500})
  }
}