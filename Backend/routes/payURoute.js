const express = require("express");
const router = express.Router();
const jsSHA = require("jssha");
const request = require("request");
const User = require("../models/userModel");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { makepdf } = require("../controller/pdfCnt");
require("dotenv").config();

router.post("/", async (req, res) => {
  // Generate a random transaction ID
  const txnid = Math.floor(Math.random() * 1000000000);
  const cart = await User.find({ _id: req.body._id })
    .select(
      "-_id -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken"
    )
    .populate("cart.products.product", "_id name price");
  const cartTotal = cart[0].cart?.products?.reduce((total, product) => {
    if (product.count > 0) {
      return total + product.count * product.price;
    } else {
      return total;
    }
  }, 0);

  const pay = {};
  pay.email = cart[0]?.email.toString();
  pay.lastname = cart[0]?.lastname.toString();
  pay.firstname = cart[0]?.firstname.toString();
  pay.amount = cartTotal?.toString();
  // pay.amount="1";
  pay.productinfo = req.body._id.toString();
  pay.phone = cart[0].mobile.toString();
  pay.txnid = txnid.toString();

  const hashString =
    "reMTqWa4" +
    "|" +
    txnid +
    "|" +
    pay.amount +
    "|" +
    pay.productinfo +
    "|" +
    pay.firstname +
    "|" +
    pay.email +
    "|" +
    "||||||||||" +
    "6iyB1y6XtZ";

  const sha = new jsSHA("SHA-512", "TEXT");
  sha.update(hashString);

  const hash = sha.getHash("HEX");

  pay.key = "reMTqWa4";
  // pay.surl = 'https://api.buysellanything.online/api/payment/success';
  // pay.furl = 'https://api.buysellanything.online/api/payment/fail'
  pay.surl = "http://192.168.1.28:7000/api/payment/success";
  pay.furl = "http://192.168.1.28:7000/api/payment/fail";
  pay.hash = hash;

  request.post(
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: "https://secure.payu.in/_payment",
      form: pay,
    },
    function (error, httpRes, body) {
      if (error) {
        res.send({
          status: false,
          message: error.toString(),
        });
      } else if (httpRes.statusCode === 200) {
        console.log(body);
        const response = JSON.parse(body);

        if (response.status === 1 && response.paymentURL) {
          res.send(response.paymentURL);
        } else {
          res.send({
            status: false,
            message: response.message,
          });
        }
      } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
      }
    }
  );
});

router.post("/success", async (req, res) => {
  makepdf(req.body.productinfo)
    .then((re) => {
      res.redirect("https://buysellanything.online/app/success");
    })
    .catch((err) => {
      res.redirect("https://buysellanything.online/app/fail");
      // res.redirect('http://localhost:3000/app/success')
    });
});
router.post("/fail", (req, res) => {
  req._id = req.body.productinfo;
  res.redirect("https://buysellanything.online/app/fail");
  // res.redirect('http://localhost:3000/app/fail')
});

module.exports = router;
