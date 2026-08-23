import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from "../Components/Loader"
import API from '../libs/api'

// Styles
import  "../styles/verify.css"
const VerifyDonation = () => {
    const [searchparams] = useSearchParams();
    const [status,setStatus] = useState("Verifying payment please wait....");
    const [name,setName]= useState("")
    const [references,setReferences] = useState("")
    const [donation,setDonation] = useState(null)
    const [amount,setAmount] = useState("null")
    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    // Extract refrence number from paystack
    
    const reference =searchparams.get("reference") || searchparams.get("trxref");
    useEffect(()=>{
        const verifyPayment = ()=>{
            if (!reference) {
                setReferences("No reference Number Found");
                setLoading(false)
                return;
            }

            try {
                console.log("Current API Base URL:", import.meta.env.VITE_API_URL);
                // Call Backend in order to update status
                const APicalls = API(`/api/payment/donate/verify/${reference}`).then((res)=>{
                  console.log(res);
                  
                    console.log(res.data)
                    const Base = res.data?.donation;
                    setAmount(Base.amount)
                    setReferences(Base.reference)
                    setName(Base.donorfName + " "  + Base.donorlName)
                    setEmail(Base.email)
                    console.log(Base.amount);
                    if (res.status === 200) {
                        setStatus(Base.status)
                    //    setTimeout(()=>{ navigate("/")},4000)
                    }else if(res.status(404)){
                        setStatus("Failed")
                    }
                })
            } catch (error) {
                console.error(`Error making donation ${error}`)
                setStatus(error.response?.data?.error || "FAILED")
            }finally{
                setLoading(false)
            }
        }
        verifyPayment()
    },[reference])
  return (
    <>
   {/* <div className="verify">
     <h2>"{status}"</h2>
   " {loading && <Loader/>}"
   </div> */}

        <div className="bodyContainer">
            <div className="successCard">
                
                {/* Fixed broken SVG path string from original file */}
                <div className="iconContainer">
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="successTitle">Payment Successful!</h1>
                <p className="successSubtitle">
                    Thank you for your donation. Your transaction has been completed and a receipt was sent to your email.
                </p>

                {/* Invoice Breakdown Details Grid */}
                <div className="receiptPanel">
                    <div className="receiptRow">
                        <span className="label">Payment Status</span>
                        <span className="value" style={{ color: '#10b981' }}>{status}</span>
                    </div>
                     <div className="receiptRow">
                        <span className="label">Sender's Name</span>
                        <span className="value">{name}</span>
                    </div>
                     <div className="receiptRow">
                        <span className="label">Sender's Email</span>
                        <span className="value">{email}</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Transaction ID</span>
                        <span className="value">{references}</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Payment Gateway</span>
                        <span className="value">Paystack Secure</span>
                    </div>
                    <div className="receiptRow">
                        <span className="label">Amount Paid</span>
                        <span className="value">{amount}</span>
                    </div>
                </div>

                {/* Action Button Navigation Clusters */}
                <div className="btnGroup">
                    <Link to="/" className="btnPrimary">Go Back Home</Link>
                    <button onClick={() => window.print()} 
                        className="btnSecondary">
                        Print Payment Confirmation
                    </button>
                </div>
            </div>
        </div>
   
    </>
  )
}

export default VerifyDonation