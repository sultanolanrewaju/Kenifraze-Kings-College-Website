import { useEffect, useState } from "react"
import { useEvents } from "../../hooks/useEvents.js"
import { toast } from "sonner"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Eventcard from "../Components/Eventcard"
import Footer from "../Components/Footer"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
import "../styles/App.css"

const Event = () => {
    // const [data, setData] = useState([])
    const [loading, setLoading] = useState(true) // 1. Start loading as true initially

        // Uses the useEvents hook to fetch events with a limit of 5
  const {data:events,
        isLoading:isLoadingEvents,
        isError:isErrorEvents,
        } = useEvents()

       
         useEffect(() => {
    if (isErrorEvents) {
      toast.error("Failed to load events.")
    }
  }, [isErrorEvents])
   

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
            <Navbar />
            {/* <Hero /> */}
            <section className="events">
                <div className="section-header">
                    <span>RECENT EVENTS</span>
                    <h2>Latest School Events</h2>
                    <p>
                        Stay updated with the latest happenings, achievements,
                        competitions and special events at Kenifraze Kings College.
                    </p>
                </div>

                {/* 3. Conditional rendering in the JSX tree */}              
                  {
                    <div className="events-grid">
                         {
        isLoadingEvents ?(
            <Loader/>
        ): events?.length > 0 ?(                                 
        events?.map((event)=>{
            return(
<Eventcard key={event._id} img={event.ImageUrl} date={event.date} title={event.title} desc={truncateClean(event.description,130)} location={event.location}/>
            )
        })
    ):(
        <Novalue value="Events"/>
    )
    }
                    </div>
}
            </section>
            <Footer />
        </>
    )   
}

export default Event