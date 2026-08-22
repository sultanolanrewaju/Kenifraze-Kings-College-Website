import { useState } from "react"
import axios from "axios"
// Styles
import  "../styles/donation.css"

// Components
import Navbar from "../Components/Navbar"
import DonationCard from "../Components/DonationCard"
import NeedCard from "../Components/NeedCard"
import { donationTier } from "../libs/data"
// Icons
import { AiOutlineFork,AiOutlineBook } from "react-icons/ai"
const Donation = () => {



  return (
    <>
     <Navbar/>
       {/* <!-- Main wrapped element protects your global app stylesheets --> */}
    <div className="kkcf-wrapper">

        {/* <!-- Header --> */}
        <header className="kkcf-header">
            <div className="kkcf-container kkcf-header-nav">
                <div className="kkcf-logo-box">
                    <span className="kkcf-logo-main">KKC FOUNDATION PROGRAMME</span>
                    <span className="kkcf-logo-sub">Lagos, Nigeria</span>
                </div>
                {/* <a href="#kkcf-donate-form-section" className="kkcf-btn-header">Donate Now</a> */}
            </div>
        </header>

        {/* <!-- Hero --> */}
        <section className="kkcf-hero-section">
            <div className="kkcf-container">
                <span className="kkcf-badge">Founded by Kenneth Odion Aghedo</span>
                <h1 className="kkcf-hero-title">
                    Every Child Deserves the Opportunity to <span className="kkcf-hero-highlight">Learn, Create, and Shine</span>
                </h1>
                <p className="kkcf-hero-desc">
                    For over 13 years, KKC Foundation has been a beacon of hope for children ages 2–18 in Lagos, Nigeria, providing quality education and world-class performing arts training.
                </p>
                <div className="kkcf-hero-buttons">
                    <a href="#kkcf-donate-form-section" className="kkcf-btn-primary">Change a Child's Life Today</a>
                    <a href="#kkcf-about-section" className="kkcf-btn-outline">Learn More</a>
                </div>
            </div>
        </section>

        {/* <!-- Impact Stats --> */}
        <section id="kkcf-about-section" className="kkcf-section-stats">
            <div className="kkcf-container">
                <h2 className="kkcf-section-title-center">Our 13+ Years of Impact</h2>
                <p className="kkcf-section-subtitle-center">Nurturing dreams and building futures every single day.</p>
                
                <div className="kkcf-stats-grid">
                    <div>
                        <div className="kkcf-stat-number">13+ Years</div>
                        <p className="kkcf-stat-label">Providing education and performing arts instruction to children in Nigeria.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">Ages 2–18</div>
                        <p className="kkcf-stat-label">Developing academic excellence, creativity, leadership, and confidence.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">7 Teachers</div>
                        <p className="kkcf-stat-label">Dedicated personnel delivering quality academic and performing arts education.</p>
                    </div>
                    <div>
                        <div className="kkcf-stat-number">Outreach</div>
                        <p className="kkcf-stat-label">Students travel throughout Nigeria, performing for hospitals and communities.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Philosophy Quote --> */}
        <section className="kkcf-section-quote">
            <div className="kkcf-container">
                <p className="kkcf-quote-text">“Changing lives through education, creativity, compassion, and opportunity—one child at a time.”</p>
                <p className="kkcf-quote-author">— KKC Foundation Mission</p>
            </div>
        </section>

        {/* <!-- Needs / Why We Need Help --> */}
        <section className="kkcf-section-needs">
            <div className="kkcf-container kkcf-needs-layout">
                <div>
                    <span className="kkcf-pretitle">Fueling Creative Minds</span>
                    <h2 className="kkcf-needs-title">Why We Need Your Help</h2>
                    <p className="kkcf-needs-p">
                        Although our impact continues to grow, so do our needs. The foundation empowers young people to discover their talents, develop confidence, and pursue careers in theater, music, television, film, dance, and higher education.
                    </p>
                    <p className="kkcf-needs-p">
                        Every cash donated directly supports the children and ensures they continue receiving life-changing educational opportunities.
                    </p>
                </div>
                
                <div className="kkcf-needs-grid">
                  <NeedCard Icon={<AiOutlineFork/>} title="Equipment" desc="Laboratory Equipemts to perform experiments that explain topic beyond the textbooks."/>
                  <NeedCard Icon={<AiOutlineBook/>}  title="Books & Gear" desc="Books, educational materials, and classroom supplies."/>
                  <NeedCard Icon={""} title="Instruments" desc="Musical instruments and performing arts equipment."/>
                  <NeedCard Icon={""} title="Safe Spaces" desc="Annual school lease, operational expenses, and logistics."/>
                </div>

            </div>
        </section>
{/* 
        <!-- Donation Cards and Secure Checkout --> */}
        <section id="kkcf-donate-form-section" className="kkcf-section-donation">
            <div className="kkcf-container">
                <h2 className="kkcf-section-title-center kkcf-title-white">Your Donation Makes an Immediate Impact</h2>
                <p className="kkcf-section-subtitle-center kkcf-subtitle-gray">Every child deserves someone who believes in them. Choose an investment tier below.</p>
                
                {/* <!-- Tiers --> */}
                <div className="kkcf-tiers-grid">
                    {
                        donationTier.map((donation)=>{
                            return(
                            <DonationCard key={donation.id} amount={donation.amount}  title={donation.title} desc={donation.desc}/>
                            )
                        })
                    }
   <div className="international">Pay in Dollar</div>
                  </div>
                  
</div>

        </section>

       
        <footer className="kkcf-footer">
            <div className="kkcf-container">
                <p className="kkcf-footer-logo">KKC FOUNDATION</p>
                <p className="kkcf-footer-desc">Together, we can remove financial barriers and replace them with hope, opportunity, and success.</p>
                <hr className="kkcf-footer-divider"/>
                <p className="kkcf-copyright">&copy; 2026 KKC Foundation. Lagos, Nigeria. All Rights Reserved.</p>
            </div>
        </footer>

    </div>
    </>
  )
}

export default Donation
