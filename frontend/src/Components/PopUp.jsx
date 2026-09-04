import React, { useState } from 'react'
import { useRef } from 'react'
import { FaClipboard} from 'react-icons/fa'
import {toast} from "sonner"
import {Link} from "react-router-dom"

const PopUp = () => {
const [copy,setCopy] = useState(null)
    const number = "0092523963";
    const onCopy = async()=>{
     try {
          await navigator.clipboard.writeText(number)
           toast.success("Copied to Clipboard")
     } catch (error) {
        console.log("Error While Copying")
     }
    }
  return (
   <>
   {/* {copy ? toast.success("Copied to Clipboard") : toast.error("Faile to copy.Try Again!") } */}
   <div className="pop-up">
    <div>
        <h1>Bank Details</h1>
    </div>
    <div>
        <h2>Account Number</h2>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1em"}}>
              <div className="number">
              <p>{number}</p>
           </div>
          <div>
             <FaClipboard size={25} onClick={onCopy} cursor={"pointer"} color='gray'/>
          </div>
         </div>
    </div>
    <div>
        <h2>Account Name</h2>
        <p>Kenifraze Kings Creation</p>
    </div>
    <div>
        <h2>Bank Name</h2>
        <p>Sterling Bank</p>
    </div>
   <Link to="/" className='btnPrimary'>Go Back</Link>
   </div>
   </>
  )
}

export default PopUp