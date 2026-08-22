import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAcademics = (category)=>{
    return useQuery({
        queryKey:["academics",category],
        queryFn:async ()=>{
            const  {data} = await axios.get(`http://localhost:5000/api/admin/academics?category=${category}`)           
            return data || [];
        },
        retry:false,
        networkMode:"always",
    })
}