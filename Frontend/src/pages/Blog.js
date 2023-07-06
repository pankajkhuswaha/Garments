import React,{useState,useEffect} from 'react'
import { Card, Button } from 'react-bootstrap';
// import BlogCards from '../components/BlogCards';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getBlogs } from '../features/blogs/blogSlice';
import bloging from'../images/blog.png'
export default function Blog() {

  const dispatch = useDispatch();
  const navigate=useNavigate();
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      dispatch(getBlogs());
    }, [dispatch]);
  
    const blogState = useSelector((state) => state.blogs.blogs);
   
  
    useEffect(() => {
      setBlogs(blogState);
    }, [blogState]);
    const handleBlogClick = (blog) => {
      navigate(`/app/blogs/${blog.id}`, { state: { blog } });
    };



  return (
    <>
    <Meta title="Blogs"></Meta>
    <BreadCrumb title="Blogs" />
  
    <div className="blog-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {blogs.length === 0 ? (
            <p>there is no blog.</p>
          ) : (
            <>
              {blogs.map((blog) => (
                <div className="col">
                  <Card>
                    <Card.Img variant="top" src={`${blog?.images[0]?.url}` } />
                     {/* <Card.Img variant="top" src={bloging} /> */}
                    <Card.Body>
                      <Card.Title>{blog?.title}</Card.Title>
                      <Card.Text>
                      {blog?.description?.replace(/(<([^>]+)>)/gi, "").split(' ').slice(0, 15).join(' ')}

  {/* {blog.description.split(' ').slice(0, 5).join(' ')} */}
 
</Card.Text>
                      <Button variant="primary" onClick={() => handleBlogClick(blog)}>
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </>
  )
}
