import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import API from "../src/libs/api";

export const useInstructor = ()=>{
    return useQuery({
        queryKey:["instructors"],
        queryFn:async()=>{
            const {data} = await API(`api/admin/instructors`)
            return data || [];
        }
    })
}
