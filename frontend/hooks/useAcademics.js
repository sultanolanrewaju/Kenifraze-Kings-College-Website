import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../src/libs/api";
export const useAcademics = (category)=>{
    return useQuery({
        queryKey:["academics",category],
        queryFn:async ()=>{
            const  {data} = await API(`api/admin/academics?category=${category}`)           
            return data || [];
        },
        retry:false,
        networkMode:"always",
    })
}