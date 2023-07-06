import React from 'react'

export default function Payu() {
  return (
   <>

<form action='http://localhost:7000/api/payment/payment_gateway/payumoney' method='post'>
        <input type="hidden" name="key" value="reMTqWa4" />
        <input type="hidden" name="txnid" value="TXN_12345" />
        <input type="hidden" name="productinfo" value="iPhone" />
        <input type="hidden" name="amount" value="1" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input type="hidden" name="surl" value="http://localhost:7000/api/success" />
        <input type="hidden" name="furl" value="http://localhost:7000/api/failure" />
        <input type="hidden" name="phone" value="9988776655" />
        
        <input type="submit" value="submit"/> 
      </form>




</>
  )
}
