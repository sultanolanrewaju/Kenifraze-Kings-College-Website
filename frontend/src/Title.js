import { useEffect } from "react";

export const Title = (value)=>{
useEffect(()=>{
    document.title = value
},[value])

}