import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import CompareProductCard from '../components/CompareProductCard';
import Meta from '../components/Meta';
import { useSelector } from 'react-redux';

export default function CompareProduct(props) {
  const [product, setProduct] = useState([]);
  const Items = useSelector(state => state.compare.Items);


  useEffect(() => {
    if (Array.isArray(Items)) { 
      setProduct(Items);
    }
  }, [Items]);
  

  return (
    <>
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {Items.map((item, index) => (
              <CompareProductCard state={item} />
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
