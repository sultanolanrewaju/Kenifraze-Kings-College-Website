import { useState,useEffect } from "react"
import { useAcademics } from "../../hooks/useAcademics.js"
import { toast } from "sonner"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import "../styles/App.css"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"

const Academics = ()=>{
  const [category,setCategory] =useState("")
     // Tanstack query APi calls
    const {
        data:academics,
        isLoading:isLoadingAcademics,
        isError:isErroracademics
    } = useAcademics(category);


     // Trigger error toasts safely using useEffect (prevents infinite re-renders)
  useEffect(() => {
    if (isErroracademics) {
      toast.error("Failed to load academics Post.")
    }
  }, [isErroracademics])

      // Truncate Text
    const truncateClean = (text, maxLength = 130) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  // Trim to maxLength, then drop trailing incomplete word
  const truncated = text.substring(0, maxLength);
  return truncated.substring(0, truncated.lastIndexOf(" ")).trim() + "...";
};
 return (
<>
<Navbar/>
{/* <Hero/> */}
<div className="heading">
  <h1>Academics Updates</h1>
</div>
<section className="activities">
<div className="categories">
  <div className="category">
  <a href="#" onClick={()=>{setCategory("Curriculum")}}>Curriculum  </a>
  </div>

   <div className="category"  onClick={()=>{setCategory("Announcement")}}>
    <a href="#" onClick={()=>{setCategory("Announcement")}}>Announcement</a>
   </div>
    <div className="category">
      <a href="#" onClick={()=>{setCategory("Admission")}}>Admission</a>
    </div>
</div>
  <div className="activities-grid">
   {   isLoadingAcademics ?(
<Loader/>
): academics?.length > 0 ?(
    academics?.map((academic)=>{
        return(
 <Card key={academic._id} img={academic.ImageUrl} title={academic.title} desc={truncateClean(academic.description,130)}/>
        )
    })
):(
<Novalue value="Academic Post"/>
)
}
{/* 
       <Card img="./IMAGES/science.jfif" title="Science Club" desc="Encouraging curiosity and innovation through experiments, projects and exhibitions."/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" desc="    Nurturing creativity and expression through music,dance and stage performances."/>
       <Card img="./IMAGES/football-removebg-preview.png" title="Sports" desc=" Building teamwork, discipline and resilience through indoor and outdoor sporting activities."/> */}


</div>
 </section>

<Footer/>
</>
 )   
}


export default Academics