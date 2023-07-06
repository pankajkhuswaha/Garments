import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../features/blogs/blogSlice";
import blogImage from "../images/blog-1.jpg";
import { Card, Button } from 'react-bootstrap';
import bloging from'../images/blog.png'
export default function BlogCards() {
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
{blogs.length === 0 ? (
  <p>there is no blog.</p>
) : (
  <>
 {blogs.slice(0,4).map((blog) => (
               
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
                
              ))}
  </>
)}
    </>
  );
}
