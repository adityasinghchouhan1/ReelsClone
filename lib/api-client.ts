import { IVideo } from "@/modals/Video";

export type videosFormData =Omit<IVideo,"_id">

type FetchOptions={
  method?:"GET" | "POST" | "PUT" |"DELETE";
  body?:any;
  headers?:Record<string,string>

}

class ApiClient {
  private async fetch<T>(
    endpoint:string,
Option:FetchOptions={}
):Promise<T>{
const {method ="GET",body,headers={}}=Option

const defaultHeaders={
  "Content-Type":"application/json",...headers
}
 const res= await fetch(`/api${endpoint}`,{
  method,
  headers:defaultHeaders,
  body:body ? JSON.stringify(body) : undefined
})

if(!res.ok){
  throw new Error( await res.text())
}
return res.json()

  }


  async getVideo(){
    return this.fetch<IVideo[]>("/videos")
  }

  async  getAvideo(id:string) {
    return this.fetch<IVideo>(`/vides/${id}`)
    
  }

  async createVideo (videosData:videosFormData){
return this.fetch<IVideo>("/videos",{
  method:"POST",
  body:videosData
})
  }

}

export const apiClient = new ApiClient()