import {Routes,Route} from "react-router-dom"
import { Toaster } from "sonner"
import { useQuery } from "@tanstack/react-query"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Academics from "./Pages/Academics"
import Event from "./Pages/Event"
import Donation from "./Pages/Donation"
import DonationForm from "./Components/DonationForm"
import VerifyDonation from "./Pages/VerifyDonation"
import NotFound from "./Components/NotFound"
function App() {

  return (
    <>
    <Toaster position="top-center"  richColors
    // toastOptions={{
    //       style: {
    //         display: "flex !important",
    // justifyContent: "center !important",
    //         width: '20px !important',
    //         minHeight: '10px',
    //         fontSize: '15px ',
    //         padding: '18px 24px !important',
    //           textAlign: "center"
    //       },
    //     }}
        />

    <Routes>
      <Route path="/" element={ <Home/>}/>
      <Route path="/about" element={ <About/>}/>
      <Route path="/academics" element={ <Academics/>}/>
      <Route path="/events" element={ <Event/>}/>
      <Route path="/donation" element={ <Donation/>}/>
      <Route path="/donate" element={<DonationForm/>}/>
      <Route path="/verify" element={<VerifyDonation/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
      
    </>
  )
}

export default App
