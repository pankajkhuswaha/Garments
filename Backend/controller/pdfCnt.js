const User=require('../models/userModel')
const puppeteer = require('puppeteer');
const asyncHandle=require('express-async-handler');
const path = require('path');
const fs=require('fs')
const {sendpdf}=require('./billMailCtrl');
const util=require('util')
const deleteFile = util.promisify(fs.unlink);
const nodemailer=require('nodemailer');
const Order = require("../models/orderModel");
;

require('dotenv').config();

const makepdf= (id)=>{
return new Promise(async (resolve, reject) => {
    try{ const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const cart = await User.find({_id:id})
  .select('  -_id -password -role -isBlocked -wishlist -createdAt -updatedAt -__v -refreshToken')
  .populate("cart.products.product", "_id brand description price ").populate('address')
 const cartTotal=cart[0];

  
 const da=cartTotal.cart.products.map((item)=>{
    return {
      price:item.price,
      total:item.total,
      count:item.count,
      brand:item.product.brand,
      _id:item.product._id,
      description :item.product.description
    }
  })
  const cartTota = cartTotal?.cart?.products?.reduce((total, product) => {
      
    if (product?.count > 0) {
      return total + product?.count*product?.price;
    } else {
      return total;
    }

  }, 0);

const appartment=cart[0]?.address[cart[0]?.address?.length-1]?.Appartment
const city=cart[0]?.address[cart[0]?.address?.length-1]?.City
const zipcode=cart[0]?.address[cart[0]?.address?.length-1]?.zipcode

  
   const products={data:da,cartTotal:cartTotal?.cart?.cartTotal}
console.log(cartTotal)
   const htmlContent = `
<!DOCTYPE html>
    <html>
    <head > <style>
    *
    {
      border: 0;
      box-sizing: content-box;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-style: inherit;
      font-weight: inherit;
      line-height: inherit;
      list-style: none;
      margin: 0;
      padding: 0;
      text-decoration: none;
      vertical-align: top;
    }
    
    /* content editable */
    
    *[contenteditable] { border-radius: 0.25em; min-width: 1em; outline: 0; }
    
    *[contenteditable] { cursor: pointer; }
    img { width:25vw; height:15vh;  direction: rtl;  }
    
    *[contenteditable]:hover, *[contenteditable]:focus, td:hover *[contenteditable], td:focus *[contenteditable], img.hover { background: #DEF; box-shadow: 0 0 1em 0.5em #DEF; }
    
    span[contenteditable] { display: inline-block; }
    
    /* heading */
    
    h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }
    
    /* table */
    
    table { font-size: 75%; table-layout: fixed; width: 100%; }
    table { border-collapse: separate; border-spacing: 2px; }
    th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
    th, td { border-radius: 0.25em; border-style: solid; }
    th { background: #EEE; border-color: #BBB; }
    td { border-color: #DDD; }
    
    /* page */
    
    html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
    html { background: #999; cursor: default; }
    
    body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
    body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
    
    /* header */
    
    header { margin: 0 0 3em; }
    header:after { clear: both; content: ""; display: table; }
    
    header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
    header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
    header address p { margin: 0 0 0.25em; }
    header span, header img { display: block; float: right; }
    header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
    header img { max-height: 100%; max-width: 100%; }
    header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }
    
    /* article */
    
    article, article address, table.meta, table.inventory { margin: 0 0 3em; }
    article:after { clear: both; content: ""; display: table; }
    article h1 { clip: rect(0 0 0 0); position: absolute; }
    
    article address { float: left; font-size: 125%; font-weight: bold; }
    
    /* table meta & balance */
    
    table.meta, table.balance { float: right; width: 36%; }
    table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
    
    /* table meta */
    
    table.meta th { width: 40%; }
    table.meta td { width: 60%; }
    
    /* table items */
    
    table.inventory { clear: both; width: 100%; }
    table.inventory th { font-weight: bold; text-align: center; }
    
    table.inventory td:nth-child(1) { width: 26%; }
    table.inventory td:nth-child(2) { width: 38%; }
    table.inventory td:nth-child(3) { text-align: right; width: 12%; }
    table.inventory td:nth-child(4) { text-align: right; width: 12%; }
    table.inventory td:nth-child(5) { text-align: right; width: 12%; }
    
    /* table balance */
    
    table.balance th, table.balance td { width: 50%; }
    table.balance td { text-align: right; }
    
    /* aside */
    
    aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
    aside h1 { border-color: #999; border-bottom-style: solid; }
    
    /* javascript */
    
    .add, .cut
    {
      border-width: 1px;
      display: block;
      font-size: .8rem;
      padding: 0.25em 0.5em;  
      float: left;
      text-align: center;
      width: 0.6em;
    }
    
    .add, .cut
    {
      background: #9AF;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
      background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
      border-radius: 0.5em;
      border-color: #0076A3;
      color: #FFF;
      cursor: pointer;
      font-weight: bold;
      text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
    }
    
    .add { margin: -2.5em 0 0; }
    
    .add:hover { background: #00ADEE; }
    
    .cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
    .cut { -webkit-transition: opacity 100ms ease-in; }
    
    tr:hover .cut { opacity: 1; }
    
    @media print {
      * { -webkit-print-color-adjust: exact; }
      html { background: none; padding: 0; }
      body { box-shadow: none; margin: 0; }
      span:empty { display: none; }
      .add, .cut { display: none; }
    }
    
    @page { margin: 0; }
    
    
    
    </style>
    
    </head>
    <body>
    <h1>Invoice</h1>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAk1BMVEXy8vL39PL28/MBm98AlNq12/DM4O6u3/IBneAAqOkApeEAn+T99/OMzO9StOWgz+mf3PJ6xOXl7/HY5/B6wugqq+JEseMApeqPyehtvuXd6/CEx+fK5PG62+us1evP5O4osO1ZuOR10PFtyu85uOuO1fGPzOZywe5yt+JewuxSvO5YreGOw+UAj9sZoN4gvO8/xvD5WCOdAAADc0lEQVRoge2WbVfiOhCAMxUqhGyjaVKatmm2IOqqF/f//7qdaXnVD3sP5bBf5vEcSSPyZF6SIATDMAzDMAzDMAzDMAzDMAzDMLfCAOyHYI7TKrmBW/34GQYRiI9JmgjQkuhy+Nu/XkO+XJIIoN1OJimQ3BWZk46WY8SwBBgGNKGGiWvJ58t5bZr3yd3dTi5zgb8ClJkrrAGddbooNPp05jItoOz8tMuvJJ/PF3I2m53IFcnLrfROWlViFZyUU1VLhxOlstI5Ga/QFKok+Xyx2B7lrijQJ0IIwsoMUF5VheyEkzUuoBDWuU6bv3/2/5UvFyeRY5jOV6op5Ew6kjuAThY5/mEm5baqnTNqhBPUHv1dLiO+IwEpvdlFDpDJzEhZ52nTCJSPiTcJq9Vq3fM0Xy4Xy3N5v81InheD/FlTrTH1uc081mKMXG3WTYzNwFMZg1ucpb1vJuX7RiuSkuqApVaBXl1Q4+T5WkFPkkCwKoFqe5AneQi7ZprqgA8UeaNbgedP1erWgIjYiReT3D+sPp8wjIq22hRzrIqDHPO9P0FodfiD8v0c9K8JjDhjUD5ETh/XyyE7kX8Byr6/kni58Kuc7PRLfZPnz99WQGWA+ho7u5ffb1arurbWtqfyO7xYRP5Ie/js/IL9CvbTI043lFOrp02ahvxEPpsd5XF/q9GVEivo5bsR5PFy/aHmcJ72gzz3Xttaebw8oEti19ZWAF4xTdfaEsRjqS+/V1Bu4kBjTuSToeYoL/AI7ESqAUIrPC5Ra2WNoVFdTVulcHi5/AHPtpeXl9dX/b3hUG7xsHk0wuNJYyI1YOWVxcVQQcCGJo3dpe13TLv62u27tGNuMVL1nGLYoaWCkzzQnS7Ua4tML3QP8gQ51tze9d1OlST5Ry+HqNsA1IBJVeNzrDHyStQ5jDhlUL5Z/3p7e8ve3z9+BLrbKonu/17VmVwI73HGR6VsSs9dpSAz0SuVPo6ouTA7RPnTEXK73Zb9B1ZaVS1dMLjJpn2ire8awOfEeI/f9yB0vh4TOWZ9GGPaD1t2F8zJFh7epQQk+3fQCMZ8gST5QdjX/Ibs5CcXy63lAJsNpfEfyBXcfz7op3ul/oE8/q4xdrNy+fPN5Z/rvG9gyH/NbywXVThczDCtbus+28o3jpthGIZhGIZhGIZhGIZhGIa5lD8khUNeolcTCwAAAABJRU5ErkJggg=="   />
    <header>
     
      
     <div style="display: flex; justify-content: space-between;">
    <address contenteditable>
    <p>Jonathan Neal</p>
    <p> 5E/12. Neelam chowk<br></p>
    <p>123456789</p>
    </address>
    
    <address contenteditable>
    <pre>${cart[0].firstname} ${cart[0].lastname}</pre> 
    <p>${ appartment} ${city} </p>
     <p>${zipcode}</p>
    <p>${cart[0].mobile}</p>
    <p>${cart[0].email}</p>
    </address>
    </div>
    </header>
    <article>
    
      <table class="meta">
        <tr>
          <th><span contenteditable>Invoice #</span></th>
          <td><span contenteditable>101138</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Date</span></th>
          <td><span contenteditable>January 1, 2012</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Amount </span></th>
          <td><span id="prefix" contenteditable></span><span>${products.cartTotal}</span></td>
        </tr>
      </table>
      <table class="inventory">
        <thead>
          <tr>
            <th><span contenteditable>Item</span></th>
            <th><span contenteditable>Description</span></th>
            <th><span contenteditable>Rate</span></th>
            <th><span contenteditable>Quantity</span></th>
            <th><span contenteditable>Price</span></th>
          </tr>
        </thead>
        <tbody>
        ${products.data.map((items) =>{
          return `
          <tr>
          <td><a class="cut">-</a><span contenteditable>${items.brand}</span></td>
          <td><span >${items.description}"</span></td>
          <td><span data-prefix></span><span contenteditable>${items.price}</span></td>
          <td><span contenteditable>${items.count}</span></td>
          <td><span data-prefix></span><span>${items.total}</span></td>
        </tr>`
        } )}        
     
      </tbody>
      </table>
    
      <table class="balance">
        <tr>
          <th><span contenteditable>Total</span></th>
          <td><span data-prefix></span><span>${cartTota}</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Gst</span></th>
          <td><span data-prefix></span><span contenteditable>0.00</span></td>
        </tr>
        <tr>
          <th><span contenteditable>Total Amount Inc.tax</span></th>
          <td><span data-prefix></span><span>${cartTota}</span></td>
        </tr>
      </table>
    </article>
    <aside>
      <h1><span contenteditable>Additional Notes</span></h1>
      <div contenteditable>
        
      </div>
    </aside>
    </body>
      </html>
    `;
    await page.setContent(htmlContent);
    await page.pdf({ path: `${id}Bill.pdf`, format: 'A4' });
  
    await browser.close();
    console.log(`PDF saved to ${id}Bill.pdf`);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ID, // generated ethereal user
        pass: process.env.MP, // generated ethereal password
      },
    });
  
    // Upload the PDF file to Cloudinary
   
    // send mail with defined transport object
  console.log(cart[0].email)
    let info = await transporter.sendMail({
      from: ' <deepnapsoftech@gmail.com>', // sender address
      to: `${cart[0].email}`, // list of receivers
      subject: `Bill`, // Subject line
      text: `data`, // plain text body
      html: `data`, // html body
      attachments: [

        {
          filename: 'Bill.pdf', // <= Here: made sure file name match
          path: path.join(__dirname, `../${id}Bill.pdf`), // <= Here
        }]
    })

    const user = await User.findById(id).populate('cart.products.product')
    // Set the products array to an empty array
    
    // Save the updated user object to the database
    
        // Create a new order document with the user's cart data
        const order = new Order({
          products: user.cart.products,
          orderby: id,
          add:user.address[user.address.length-1]
    
           });
        order.save()
        await User.findByIdAndUpdate(id,{$set:{"cart.products":[]}})
      resolve()

    await deleteFile(path.join(__dirname, `../${id}Bill.pdf`));}
catch(err){
reject()
resolve.send({message:'Somthing went wrong'})
}
  })
}

  module.exports={makepdf}


   
        
        
