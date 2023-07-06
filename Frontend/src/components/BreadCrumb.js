import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb(props) {
    const {title} = props;
  return (
    <>
      <div className="breadcrumb py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <nav aria-label="breadcrumb mb-0">
                <ol className="breadcrumb">
                  <div className="breadcrumb-item active" aria-current="page">
                    Home 
                  </div>
                  <div className="breadcrumb-item active" aria-current="page">
                    {title}
                  </div>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
