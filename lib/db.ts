import { error } from "console";
import mongoose from "mongoose";

const MONGODB_URL=process.env.MONGODB_URI

if(!MONGODB_URL){
  throw new Error("please define MongoDB URI in env file")
}

let cached = global.mongoose;

if(!cached){
  cached = global.mongoose= {conn:null,promise:null}
}

export async function ConnectTodatabase() {if(cached.conn)
  return cached.conn
}