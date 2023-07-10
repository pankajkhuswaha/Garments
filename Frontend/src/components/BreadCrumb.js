import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function BreadCrumb(props) {
    const {title,link} = props;
  return (
    <>
      <div className="breadcrumb py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <nav aria-label="breadcrumb mb-0">
                <ol className="breadcrumb">
                  <NavLink to={"/"} className="breadcrumb-item active" aria-current="page">
                    Home 
                  </NavLink>
                  <NavLink to={link} className="breadcrumb-item active" aria-current="page">
                    {title}
                  </NavLink>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
