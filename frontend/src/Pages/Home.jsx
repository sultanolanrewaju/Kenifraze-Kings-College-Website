import { useState,useEffect } from "react"
import {Link} from "react-router-dom"
import {toast} from "sonner"
import { useEvents } from "../../hooks/useEvents"
import {useAcademics } from "../../hooks/useAcademics"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Card from "../Components/Card"
import Eventcard from "../Components/Eventcard"
import Contact from "../Components/Contact"
import Footer from "../Components/Footer"
import Floating from "../Components/Floating"
import Entertain from "../Components/Entertain"
import Loader from "../Components/Loader"
import Novalue from "../Components/Novalue"
const Home = ()=>{
    const [category,setCategory] = useState("")
// Set Loading State
const [loading,setLoading] = useState(true)
    // Tanstack query APi calls
    const {
        data:academics,
        isLoading:isLoadingAcademics,
        isError:isErroracademics
    } = useAcademics(category);

        // Events Hook
    const {data:events,
        isLoading:isLoadingEvents,
        isError:isErrorEvents,
        } = useEvents()
    // console.log(data,data);
    
    // Limited API data
     const limitedEvents = (events ||[]).slice(0, 3)  //Limit of the Shown events
     const limitedAcademics = (academics || []).slice(0, 3) //Limit of the shown Acadermic Post


    //  Handle Error
    // Trigger error toasts safely using useEffect (prevents infinite re-renders)
  useEffect(() => {
    if (isErroracademics) {
      toast.error("Failed to load academics Post.")
    }
  }, [isErroracademics])

  useEffect(() => {
    if (isErrorEvents) {
      toast.error("Failed to load events.")
    }
  }, [isErrorEvents])
    
   
    const handleShow = (event)=>{
        // alert("event.target.value")
        console.log("nnn");
        

    }
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
<Hero/>

{/*  PRINCIPAL MESSAGE  */}

<section className="principal-section">

    <div className="principal-container">

        <div className="principal-image">
            <img src="./IMAGES/BigDaddy.jpg" alt="Principal" />
        </div>

        <div className="principal-content">

            <span className="section-tag">MESSAGE FROM THE PROPRIETOR</span>

            <h2>Welcome to Kenifraze Kings College</h2>

            <p>
                At Kenifraze Kings College, we believe that education is more
                than acquiring knowledge—it is about building character,
                developing leadership, and inspiring a lifelong love for learning.
            </p>

            <p>
                Our commitment is to provide a supportive and innovative
                learning environment where every student can discover their
                strengths, achieve academic excellence, and grow into
                responsible global citizens.
            </p>

            <p>
                Together with our dedicated teachers and supportive parents,
                we strive to nurture future leaders who will make a positive
                impact in society.
            </p>

            <h4>— Proprietor, Kenifraze Kings College</h4>

        </div>

    </div>

</section>


{/* <!-- ACTIVITIES --> */}
<section className="activities">

    <div className="section-header">
        <span>OUR ACTIVITIES</span>
        <h2>Explore. Learn. Excel.</h2>
        <p>
            We offer a wide range of co-curricular and extracurricular
            activities that help students discover their talents,
            build confidence, and grow as leaders.
        </p>
        
    </div>

{/* Card */}
  <div className="activities-grid">
{
isLoadingAcademics ?(
<Loader/>
): limitedAcademics.length > 0 ?(
    limitedAcademics?.map((academic)=>{
        return(
 <Card key={academic._id} img={academic.ImageUrl} title={academic.title} desc={truncateClean(academic.description,130)}/>
        )
    })
):(
<Novalue value="Academic Post"/>
)
}
   


</div>
  <div className="activity-btn">
        <Link to="/academics">View All Activities</Link>
    </div>

    </section>


{/* EVENTS */}

   <section className="events">

    <div className="section-header">
        <span>RECENT EVENTS</span>
        <h2>Latest School Events</h2>
        <p>
            Stay updated with the latest happenings, achievements,
            competitions and special events at Kenifraze Kings College.
        </p>
    </div>

 <div className="events-grid">
    {
        isLoadingEvents ?(
            <Loader/>
        ): limitedEvents.length > 0 ?(                                 
        limitedEvents?.map((event)=>{
            return(
<Eventcard key={event._id} img={event.ImageUrl} date={event.date} title={event.title} desc={truncateClean(event.description,130)} location={truncateClean(event.location,90)}/>
            )
        })
    ):(
        <Novalue value="Events"/>
    )
    }
    
 </div>
 <div className="activity-btn">
        <Link to="/events">View All Events</Link>
    </div>
    </section>


{/* ACADEMICS */}


<section className="academics">

    <div className="section-header">
        <span>ACADEMICS</span>
        <h2>Our Academic Programs</h2>
        <p>
            We provide a comprehensive curriculum designed to equip students
            with the knowledge and skills needed for future success.
        </p>
    </div>

    <div className="academics-grid">

        <div className="academic-card">
            <h3>Junior Secondary School</h3>
            <p>
                Building strong foundations in core subjects while nurturing
                creativity and critical thinking.
            </p>
        </div>

        <div className="academic-card">
            <h3>Senior Secondary School</h3>
            <p>
                Preparing students for higher education through specialized
                Science, Arts and Commercial studies.
            </p>
        </div>

        <div className="academic-card">
            <h3>ICT & Innovation</h3>
            <p>
                Equipping students with digital skills, coding knowledge,
                and technology awareness.
            </p>
        </div>

    </div>

</section>

{/* GALLERY SECTION */}

<section className="gallery">
    
<Entertain/>
</section>


{/* <!-- TESTIMONIAL --> */}

<section className="testimonials">

    <div className="section-header">
        <span>TESTIMONIALS</span>
        <h2>What People Say About Us</h2>
    </div>

    <div className="testimonial-grid">

        <div className="testimonial-card">
            <p>
                "Kenifraze Kings College has greatly improved my child's
                confidence and academic performance."
            </p>
            <h4>— Parent</h4>
        </div>

        <div className="testimonial-card">
            <p>
                "The teachers are supportive and the learning environment
                encourages excellence."
            </p>
            <h4>— Student</h4>
        </div>

        <div className="testimonial-card">
            <p>
                "My years at Kenifraze Kings College prepared me for
                university and leadership opportunities."
            </p>
            <h4>— Alumni</h4>
        </div>

    </div>

</section>



{/* <!-- QUICK LINKS --> */}
<section className="quick-links">

    <h2 className="section-title">Quick Links</h2>

    <div className="cards">

        <div className="card">
            <h3>Latest News</h3>
            <p>Stay updated with school announcements and achievements.</p>
        </div>

        <div className="card">
            <h3>School Calendar</h3>
            <p>View important academic dates and upcoming activities.</p>
        </div>

        <div className="card">
            <h3>Student Portal</h3>
            <p>Access learning resources and student information.</p>
        </div>

    </div>

</section>
<Contact/>
<Footer/>
{/* 
 <!-- 
    - #BACK TO TOP
  --> */}

    <a
      href="#top"
      className="back-top-btn"
      aria-label="Back to top"
      data-back-top-btn
    >
        UP
      <ion-icon name="arrow-up"></ion-icon>
    </a>
</>
 )   
}


export default Home