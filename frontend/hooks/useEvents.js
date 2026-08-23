import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../src/libs/api";

export const useEvents = ()=>{
        return useQuery({
            queryKey:["events"],
            queryFn: async ()=>{
                const {data} = await API(`api/admin/events`);
            return data || [];
        }
    })
}