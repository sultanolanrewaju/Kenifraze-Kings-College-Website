import React from "react"
import Floating from "./Floating"
import { useState } from "react"
const Eventcard = (props)=>{
    const [activeImage,setActiveImage] = useState(null)
    const current_image = props.img;
    return (
        <>
   
        <div className="event-card">
            <img src={current_image} alt="Graduation Ceremony" onClick={()=>{setActiveImage(current_image)}}/>

            <div className="event-content">
               <div className="event-info">
                 <div className="event-date">
                 <b>Date:</b>{props.date}
                </div>
                <div className="event-date">
                 <b>Venue:</b><span>{props.location}</span>
                </div>
               </div>
                
                <h3>{props.title}</h3>

                <p>
                {props.desc}
                </p>
            </div>
        </div>

        
  {/* Conditional rendering Large View */}
 {activeImage && (
<Floating
imageSrc={activeImage}
onClose={()=>{setActiveImage(null)}}
/>
  )}
        </>
    )
}

export default Eventcard;