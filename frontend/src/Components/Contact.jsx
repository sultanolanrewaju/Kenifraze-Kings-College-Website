import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
const Contact = ()=>{
    const [contact,setcontact] = useState("")
    useEffect(()=>{
     const fetch = async ()=>{
           const res = await axios.get("http://localhost:5000/api/admin/contact")
            setcontact(res.data)
            console.log(res.data);
            
        // console.log(res.data[0]._id);
     }
        fetch()
    },[1])

    return (
        <>
        


{/* <!-- CONTACTS --> */}
 <section className="contact" id="contact">

    <div className="section-header">
        <span>CONTACT US</span>
        <h2>Get In Touch</h2>
        <p>
            We'd love to hear from you. Reach out to us for inquiries,
            admissions, or any information about Kenifraze Kings College.
        </p>
    </div>

    <div className="contact-container">

        {/* <!-- Contact Information --> */}
        <div className="contact-info">
 <div className="info-box">
                <h3>📍 Address</h3>
                <p>{contact.address}</p>
            </div>

                 <div className="info-box">
                <h3>📞 Phone</h3>
                <p>{contact.phone}</p>
            </div>

                 <div className="info-box">
                <h3>📧 Email</h3>
                <p>{contact.email}</p>
            </div>

                 <div className="info-box">
                <h3>📍Social Media</h3>
                <p>{contact.social}</p>
            </div>

        </div>

        {/* <!-- Contact Form --> */}
        <form className="contact-form">

            <input
                type="text"
                placeholder="Your Name"
                required
            />

            <input
                type="email"
                placeholder="Your Email"
                required
            />

            <input
                type="text"
                placeholder="Subject"
                required
            />

            <textarea
                rows="6"
                placeholder="Your Message"
                required
            ></textarea>

            <button type="submit">
                Send Message
            </button>

        </form>

    </div>

</section>
        </>
    )
}

export default Contact