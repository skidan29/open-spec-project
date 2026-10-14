'use client'

import { getPost } from "@/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";


export default function FetchButton() {
const [data, setData] = useState<any>(null);
const [loading, setLoading] = useState(false);
const {id} = useParams<{id:string}>()
const route = useRouter()


  async function handleClick() {
    setLoading(true);
    try {
      const json = await getPost(id);
      console.log(json);
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }}
  

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Загрузка...' : 'Получить пост'}
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"onClick={()=>{route.back()}} >
       back 
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}