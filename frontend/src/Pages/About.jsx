import { useState, useEffect } from "react"
import { useInstructor } from "../../hooks/useInstructor.js"
import { toast } from "sonner"
import {FaFacebook,FaInstagram,FaXTwitter } from "react-icons/fa6"
// Components
import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import InstructorCard from "../Components/InstructorCard"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
// Styles
import "../styles/About.css";

const About = () => {
    // Making API Calls
    const {
        data: instructors,
        isLoading: isLoadingTeacher,
        isError: isErrorTeacher
    } = useInstructor();
 
    useEffect(() => {
        if (isErrorTeacher) {
            toast.error("Error Fetching Teachers Data")
        }
    }, [isErrorTeacher])

    return (
        <>
            <NavBar />
        <div className="profile-page-wrapper">

            {/* 1. UPPER UTILITY STATUS INFO (Soft light-bg anchor) */}
            <div className="editorial-notice interface-font">
                Registration Portal Update: Crèche, Primary, and College Terms Are Synchronized.
            </div>

            {/* 2. CHRONOLOGY HEADLINE ZONE (Asymmetrical Entry) */}
            <div className="hero-editorial">
                <span className="interface-font core-accent-text">Dual-Tier Educational Pathway</span>
                <h1>Nurturing early wonder, defining secondary character, and securing global futures.</h1>
            </div>

            {/* 3. STAGGERED Z-PATTERN CONTENT SYSTEM */}
            <main className="narrative-system">
                
                {/* Block One: Primary Tier */}
                <article className="narrative-block">
                    <div className="narrative-meta">
                        <span className="interface-font core-accent-text" style={{ display: 'block', marginBottom: '4px' }}>
                            Tier I • Primary
                        </span>
                        <h3>The Foundational Years</h3>
                    </div>
                    <div className="narrative-body">
                        <p>True learning flourishes at the cross-section of deep intellectual rigor and intense civic engagement. In our primary wing, we refuse to compromise on either vector.</p>
                        <p>Our youngest students explore a bespoke curriculum that links theoretical fundamentals directly to actual technological application frameworks, ensuring they understand both the background mechanics and the future applications of every discipline.</p>
                    </div>
                </article>

                {/* Block Two: Secondary College & Original Vision Info */}
                <article className="narrative-block">
                    <div className="narrative-meta">
                        <span className="interface-font core-accent-text" style={{ display: 'block', marginBottom: '4px' }}>
                            Tier II • Secondary
                        </span>
                        <h3>Our Vision for Excellence</h3>
                    </div>
                    <div className="narrative-body">
                        <p>Kenifraze Kings College has been at the forefront of modern education for over two decades. We foster an inclusive environment where intellectual curiosity is paired with social responsibility.</p>
                        <p>Our curriculum is designed to stimulate critical thinking and creativity, preparing students not just for higher education, but for the dynamic challenges of tomorrow's global landscape.</p>
                        
                        <div className="social-media-link-wrapper">
                            <a href="https://shorturl.at/Tbzan" target="_blank" rel="noreferrer" className="fb-action-link">
                                <FaFacebook size={28} color="#1877F2'"/>
                            </a>
                             <a href="https://shorturl.at/QkoZm" target="_blank" rel="noreferrer" className="fb-action-link">
                                <FaInstagram size={28} color="#E1306C"/>
                            </a>
                             <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fb-action-link">
                                <FaXTwitter size={28} color='#1DA1F2'/>
                            </a>
                        </div>
                    </div>
                </article>

                {/* Block Three: Focused Study Panel (Replacing Campus Environment) */}
                <article className="narrative-block">
                    <div className="narrative-meta">
                        <span className="interface-font core-accent-text" style={{ display: 'block', marginBottom: '4px' }}>
                            Visual Archive
                        </span>
                        <h3>Academic Atmosphere</h3>
                    </div>
                    <div className="narrative-body">
                        <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
                            Excellence is not defined by geographic scale, but by classroom engagement. Our students build shared focus, collaborative problem-solving skills, and deep peer encouragement during daily study sessions.
                        </p>
                        <div className="intro-image-frame">
                            <img src="./IMAGES/teachers.jpg" alt="Students studying together" className="editorial-img" />
                        </div>
                    </div>
                </article>

            </main>

            {/* 4. SOLID HIGHLIGHT GRID BREAK */}
            <section className="stat-canvas">
                <div className="stat-wrapper">
                    <div className="stat-card">
                        <h4>Primary</h4>
                        <p>Play-Based Literacy & Numeracy Core</p>
                    </div>
                    <div className="stat-card">
                        <h4>College</h4>
                        <p>WAEC, NECO & Digital Skill Readiness</p>
                    </div>
                    <div className="stat-card">
                        <h4>24+</h4>
                        <p>Active Multi-Disciplinary Labs & Creative Zones</p>
                    </div>
                </div>
            </section>

            {/* 5. INSTRUCTOR COUNCIL GRID PORTAL */}
            <section className="roster-container">
                <div className="roster-header">
                    <span className="interface-font core-accent-text">The Registry</span>
                    <h2>Meet Our Instructors</h2>
                    <p style={{ fontFamily: 'sans-serif', textTransform: 'none', letterSpacing: 'normal', fontSize: '15px', color: 'var(--text-muted)', marginTop: '8px' }}>
                        Learn from a dedicated team of passionate educators and subject matter experts committed to helping every student thrive.
                    </p>
                </div>

                <div className="faculty-grid">
                    {isLoadingTeacher ? (
                        <Loader />
                    ) : instructors?.length > 0 ? (
                        <div className="cards-flex-system">
                            {instructors.map((teacher) => (
                                <InstructorCard 
                                    key={teacher._id} 
                                    img={teacher.ImageUrl} 
                                    name={teacher.name} 
                                    subject={teacher.subject} 
                                    bio={teacher.bio} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="roster-placeholder-card">
                            <Novalue value="Teacher" />
                            <p style={{ marginTop: '16px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                                The academic council roll is being cross-referenced against the current departmental lists.
                            </p>
                        </div>
                    )}
                </div>
            </section>

        </div>
            <Footer />
            </>
    )   
}

export default About;
