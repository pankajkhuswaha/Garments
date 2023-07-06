import React from "react";


export default function FamousProduct(props) {
 
  return (
    <>
      <div className="">
      <div className="card rounded shadow text-primary famous-product" style={{width: "auto", }}>
  <img src={props.image} className="card-img" alt="famous product"  />
  
</div>
      </div>
    </>
  );
}
