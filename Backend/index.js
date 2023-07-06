const bodyParser = require("body-parser");
const express = require("express");
const mongoose=require('mongoose')
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const PORT= 7000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");    
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const PayURoute=require('./routes/payURoute')
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const NimbusRoute =require('./routes/nimbusRoute')
const SendSms =require('./routes/sendRoute')
const sizeRouter=require("./routes/sizeRoute")
const Quantity=require('./routes/quantityRoute')
const Email=require('./routes/EmailRoutes')
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");


mongoose.set('strictQuery', true);
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/payment',PayURoute)
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/size", sizeRouter);
app.use("/api/nimbus",NimbusRoute )
app.use("/api/email",Email )
app.use("/api/send",SendSms)
app.use("/api/quantity",Quantity)
app.use(notFound);
app.use(errorHandler);
const os = require('os');


const ipAddress = Object.values(os.networkInterfaces())
  .flat()
  .find(({ family, internal }) => family === 'IPv4' && !internal)
  .address;

app.listen(PORT, ipAddress, () => {
  console.log(`Server listening on http://${ipAddress}:${PORT}`);
});