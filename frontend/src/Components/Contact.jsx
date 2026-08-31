    import React from "react"
    import axios from "axios"
    import { useEffect } from "react"
    import { useState } from "react"
    import {toast} from "sonner"
    import API from '../libs/api'
    const Contact = ()=>{
        const [message,setMessage] = useState("")
        const [contact,setcontact] = useState("")
        const [loading,setLoading] = useState(false)
        const [formdata,setFormdata] = useState({
            name:"",
            email:"",
            subject:"",
            message:""
        })
        useEffect(()=>{
        const fetch = async ()=>{
            const res = await API(`/api/admin/contact`);
            const value = res.data;
                setcontact(value[0])
        }
            fetch()
        },[])

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormdata(prev=>({
            ...prev,
            [name]:value
        }));
        
    }

    // Handle Contact Submission


    const handleSUbmit = async (e)=>{
        e.preventDefault();
        if(!formdata.name.trim() || !formdata.email.trim() || !formdata.subject.trim() || !formdata.message.trim()){
        setMessage("Input Your Information")
        return;
        }else{
    try {
        setLoading(true)
        await axios.post("http://localhost:5000/api/admin/mail",formdata)
    toast.success("Sent Successfully!!!")
    setMessage("")
    } catch (error) {
        alert("Error Sending")
    }finally{
        setLoading(false)
    }
        }
        
    }

    console.log(formdata);


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
        <div>
            {message && (
            <span style={{fontSize:"18px",border:"1px solid #fecdd3",paddingLeft:"20rem", marginLeft:"8rem",marginBottom:"65px",paddingLeft:"5rem",paddingRight:"5rem",paddingTop:"0.5rem",paddingBottom:"0.5rem",color:"#c31e4d",borderRadius:"10px",background:"#fff1f2"}}>{message}</span>

            )}
            <form className="contact-form" onSubmit={handleSUbmit}>

                <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    onChange={handleChange}
                    value={formdata.name}
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleChange}
                    value={formdata.email}
                />

                <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    onChange={handleChange}
                    value={formdata.subject}
                />

                <textarea
                    rows="6"
                    placeholder="Your Message"
                    name="message"
                    onChange={handleChange}
                    value={formdata.message}
                ></textarea>

                <button type="submit">
                {loading ?  "Sending" : "Send Message"}
                </button>

            </form>
    </div>

        </div>

    </section>
            </>
        )
    }

    export default Contact