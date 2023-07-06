import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { TbTruckDelivery } from "react-icons/tb";
import { FiGift } from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiDiscount1 } from "react-icons/ci";
import { BsFillCreditCardFill } from "react-icons/bs";
import BlogCards from "../components/BlogCards";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import FamousProduct from "../components/FamousProduct";
import tab1 from "../images/1.png";
import tab2 from "../images/2.png";

import tab4 from "../images/3.png";
import tab5 from "../images/4.png";
import tab6 from "../images/5.png";
import tab7 from "../images/6.png";

import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getProducts } from "../features/product/productSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setQueryParams } from "../features/product/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Banner from "./Banner/Banner";
import {
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  card1,
  card2,
  card3,
  main1,
  main2,
  main3,
  main4,
  main5,
  main6,
  main7,
} from "../assets/index";
import {
  mens,
  women,
  kids,
  tshirt,
  top,
  kurta,
  denim,
  casual,
} from "../assets/category";
import {
  fcard1,
  fcard2,
  fcard3,
  fcard4,
  fcard5,
  fcard6,
  fcard7,
} from "../assets/featureCard";

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};
const Home = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const navigate = useNavigate();
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  console.log(productState)

  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 2000,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };
  const setting = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    autoplaySpeed: 2000,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };
  const set = {
    // show navigation dots
    infinite: true, // loop the slides
    speed: 500, // transition speed in milliseconds
    slidesToShow: 3, // number of slides to show at once
    slidesToScroll: 1, // number of slides to scroll per click
  };
  const sett = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const categories = [
    {
      name: "Mens",
      img: mens,
      qty: 60,
    },
    {
      name: "Women",
      img: women,
      qty: 80,
    },
    {
      name: "Kids",
      img: kids,
      qty: 40,
    },
    {
      name: "t-shirt",
      img: tshirt,
      qty: 70,
    },
    {
      name: "Tops",
      img: top,
      qty: 10,
    },
    {
      name: "Kurta",
      img: kurta,
      qty: 8,
    },
    {
      name: "Denim",
      img: denim,
      qty: 100,
    },
    {
      name: "Casual",
      img: casual,
      qty: 50,
    },
  ];
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <Container class1="home-wrapper-1 py-3 col-12">
          <div className="row ">
            <div className="col-12 col-md-6 col-sm-12 mb-2 position-relative">
              <Slider {...settings} autoplay={true}>
                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main1}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>

                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main2}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main3}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main4}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main5}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>

                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main6}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>

                <div>
                  <Link to="/app/product" className="position-relative">
                    <img
                      src={main7}
                      className="img-fluid position-relative"
                      alt="main-banner"
                    />
                  </Link>
                </div>
              </Slider>
            </div>

            <div className="col-md-6 ">
              <div className="row d-flex flex-md-row">
                <div className="col-md-6 mb-2">
                  <div className="small-banner position-relative ">
                    <Link
                      to="/app/product"
                      onClick={() => {
                        dispatch(
                          setQueryParams({
                            param: "search",
                            value: "Electronics",
                          })
                        );
                      }}
                    >
                      <img
                        src={card1}
                        className="img-fluid "
                        alt="main-banner"
                      />
                    </Link>
                    <div className="small-banner-content position-absolute"></div>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="small-banner position-relative ">
                    <Link
                      to="/app/product"
                      onClick={() => {
                        dispatch(
                          setQueryParams({ param: "search", value: "Watch" })
                        );
                      }}
                    >
                      <img
                        src={card2}
                        className="img-fluid "
                        alt="main-banner"
                      />
                    </Link>
                    <div className="small-banner-content position-absolute text-white"></div>
                  </div>
                </div>
              </div>

              <div className="row d-flex flex-md-row">
                <div className="col-md-6 ">
                  <div className="small-banner position-relative ">
                    <Link
                      to="/app/product"
                      onClick={() => {
                        dispatch(
                          setQueryParams({
                            param: "search",
                            value: "Stationary",
                          })
                        );
                      }}
                    >
                      <img
                        src={card3}
                        className="img-fluid "
                        alt="main-banner"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="small-banner position-relative ">
                    <Link
                      to="/app/product"
                      onClick={() => {
                        dispatch(
                          setQueryParams({
                            param: "search",
                            value: "Headphones",
                          })
                        );
                      }}
                    >
                      <img
                        src={main7}
                        className="img-fluid "
                        alt="main-banner"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <section className="home-wrapper-2 py-3 hovering my-2 ">
          <div className="container-xxl">
            <div className="row d-flex alilgn-items-center justify-content-between">
              {categories.map((cate, i) => {
                return (
                  <div
                    key={i}
                    className="col-4 col-md-1  d-flex flex-column align-items-center mb-2 p-0"
                  >
                    <img
                      src={cate.img}
                      style={{
                        borderRadius: "1800px",
                        cursor: "pointer",
                        width: "250px",
                      }}
                      onClick={() => {
                        dispatch(
                          setQueryParams({ param: "search", value: cate.name })
                        );
                        navigate("/app/product");
                      }}
                    />
                    <h6 className="text-center">{cate.name}</h6>
                    <p className="mb-0 text-center">{cate.qty} Products</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Banner />

        <section className="my-5">
          <div className="container-xxl">
            <h3>Featured Collection</h3>

            <div className="row d-flex ">
              <Slider {...sett}>
                {productState &&
                  Array.isArray(productState) &&
                  productState.map((item, i) => {
                    if (item?.tags?.includes("featured")) {
                      return (
                        <ProductCard key={i} grid={item}  />
                      );
                    }
                  })}
              </Slider>
            </div>
          </div>
        </section>

        <Marquee speed={50}>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard1} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard2} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard3} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard4} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard5} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard6} />
          </div>
          <div style={{ marginLeft: "15px" }}>
            <FamousProduct image={fcard7} />
          </div>
        </Marquee>

        <section className="special-wrapper py-3 home-wrapper-2 my-3">
          <div className="container-xxl">
            <div className="row d-flex align-items center justify-content-center">
              <div className="col-12">
                <h3>Special Products</h3>
              </div>
              <div className="row special-product-card">
                {productState &&
                  Array.isArray(productState) &&
                  productState.map((item, i) => {
                    if (item?.tags?.includes("special")) {
                      return (
                        <div key={item?._id} className="col-md-4 col-sm-6 g-2">
                          <SpecialProduct
                            image={item.images[0].url}
                            brand={item.brand}
                            content={`${item.title
                              ?.split(" ")
                              .slice(0, 4)
                              .join(" ")} ${" "}
                            ${item.title?.split(" ").length > 5 ? "..." : ""}`}
                            price={
                              item.Discount > 0
                                ? item.price -
                                  (item.price * item.Discount) / 100
                                : item.price
                            }
                            stroke={item.price}
                            onClick={() => {
                              dispatch(
                                setQueryParams({
                                  param: "search",
                                  value: "Mi mobile",
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </section>
        {/* our popular product section */}
        <section className="popular-wrapper py-3 home-wrapper-2 mb-2">
          <div className="container-xxl">
            <div className="row d-flex align-items center justify-content-center">
              <div className="col-12">
                <h3>Our Popular Products</h3>
              </div>
              <div className="row">
                <Slider {...sett}>
                  {productState &&
                    Array.isArray(productState) &&
                    productState.map((item, i) => {
                      if (item?.tags?.includes("popular")) {
                        return (
                          <ProductCard key={i} grid={item} className="col-10" />
                        );
                      }
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
        {/* features sections */}
        <section className="home-wrapper-2 py-3 my-3">
          <div className="container-xxl">
            <div className="row d-flex alilgn-items-center justify-content-between">
              <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
                <TbTruckDelivery className="fs-1  service-icon" />
                <h6 className="text-center">Free Shipping</h6>
                <p className="mb-0 text-center">From ALl Orders Over ₹150</p>
              </div>
              <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
                <FiGift className="fs-1 " />
                <h6>Daily Surprise Offers</h6>
                <p className="mb-0">Save upto 25% off</p>
              </div>
              <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
                <Link to="/app/contact" style={{ color: "black" }}>
                  <TfiHeadphoneAlt className="fs-1" />
                  <h6>Support 24/7</h6>
                  <p className="mb-0">Shop with an expert</p>
                </Link>
              </div>
              <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
                <CiDiscount1 className="fs-1" />
                <h6>Affordable Prices </h6>
                <p className="mb-0">Get Factory Default Price</p>
              </div>
              <div className="col-6 col-md-2 col-sm-5 d-flex flex-column align-items-center mb-2">
                <BsFillCreditCardFill className="fs-1" />
                <h6>Secure Payments </h6>
                <p className="mb-0">100% Protected Payment</p>
              </div>
            </div>
          </div>
        </section>
        {/* brand marquee section */}
        <section className="marquee-wrapper py-3 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="marquee-inner-wrapper card-wrapper bg-white p-3">
                  <Marquee className="d-flex" speed={50}>
                    <div className="mx-4 w-25">
                      <img src={brand1} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand2} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand3} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand4} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand5} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand6} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand7} alt="" />
                    </div>
                    <div className="mx-4 w-25">
                      <img src={brand8} alt="" />
                    </div>
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-wrapper py-2 home-wrapper-2">
          <div className="container-xxl">
            <div className="row d-flex align-items center justify-content-center">
              <div className="col-12">
                <h3>Our Latest Blogs</h3>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 ">
              <BlogCards />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
