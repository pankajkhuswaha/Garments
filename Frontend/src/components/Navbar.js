import React from 'react'
import grocery from "../images/grocery.png"
import mobile from "../images/mobile.png"
import fashion from "../images/fashion.png"
import electronics from "../images/electronics.png"
import homefurniture from "../images/homefurniture.png"
import appliance from "../images/appliance.png"
import travel from "../images/travel.png"
import offer from "../images/offer.png"
import toy from "../images/toy.png"   
import bike from "../images/bike.png"

const Navbar = () => {
  return (
    <>
        <div className="container py-5">

            <ul className=" d-flex align-items-center justify-content-between ">
                <li className=' d-flex justify-content-center mx-2'>
                   <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={grocery} alt="grocery"/>
                    </div>
                     <div>Grocery</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={mobile} alt="grocery"/>
                    </div>
                     <div>Mobile</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={fashion} alt="grocery"/>
                    </div>
                     <div>Fashion</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={electronics} alt="grocery"/>
                    </div>
                     <div>Electronics</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={homefurniture} alt="grocery"/>
                    </div>
                     <div>Home</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={appliance} alt="grocery"/>
                    </div>
                     <div>Appliance</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={travel} alt="grocery"/>
                    </div>
                     <div>Travel</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={offer} alt="grocery"/>
                    </div>
                     <div>Top Offers</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={toy} alt="grocery"/>
                    </div>
                     <div>Beauty, Toy & More</div>
                   </a> 
                </li>
                <li className=' d-flex justify-content-center mx-2'>
                  <a href="" className='text-dark'>
                    <div className='img-container'>
                   <img src={bike} alt="grocery"/>
                    </div>
                     <div>Two Vehicles</div>
                   </a> 
                </li>
            </ul> 



           
        </div>
    </>
  )
}

export default Navbar
