import { useState,useEffect } from "react"
import { useInstructor } from "../../hooks/useInstructor.js"
import {toast} from "sonner"
// Components
import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import InstructorCard from "../Components/InstructorCard"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
// Styles
import "../styles/About.css";
const About = ()=>{
    // Making API Calls
    const {
        data:instructors,
        isLoading:isLoadingTeacher,
        isError:isErrorTeacher
    }= useInstructor();
 
useEffect(()=>{
    if(isErrorTeacher){
            toast.error("Error Fetching Teachers Data")
    }
},[isErrorTeacher])


 return (
<>
<NavBar/>

 {/* <Hero/> */}

    <main>
      
        <section className="about-intro">
            <div className="intro-text">
                <h2>Our Vision for Excellence</h2>
                <p>Kenifraze Kings College has been at the forefront of modern education for over two decades. We foster an inclusive environment where intellectual curiosity is paired with social responsibility.</p>
                <p>Our curriculum is designed to stimulate critical thinking and creativity, preparing students not just for higher education, but for the dynamic challenges of tomorrow's global landscape.</p>
                <div className="social-media">
                    facebook
                </div>
            </div>
            <div className="intro-image">
                <img src="./IMAGES/graduands.jpg" alt="Students studying together"/>
            </div>
        </section>

      
        <section className="faculty-section">
            <div className="section-title">
                <h2>Meet Our Instructors</h2>
                <p>Learn from a dedicated team of passionate educators and subject matter experts committed to helping every student thrive.</p>
            </div>

            <div className="faculty-grid">
               { isLoadingTeacher ?(
               <Loader/>
               ):instructors?.length > 0 ? (
                   instructors?.map((teacher)=>{
                       return (
                           <InstructorCard key={teacher._id} img={teacher.ImageUrl} name={teacher.name} subject={teacher.subject} bio={teacher.bio} />
                        )
                    })
                ):(
                 <Novalue value="Teacher"/>
             )
               }
            </div>
        </section>
    </main>
<Footer/>
</>
 )   
}


export default About