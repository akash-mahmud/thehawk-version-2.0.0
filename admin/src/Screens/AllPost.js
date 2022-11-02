import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { listpost } from "../actions/postActions";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from 'react-infinite-scroll-component';

import dayjs from "dayjs";

import { listCategory } from "../actions/categoryActions";
import { listSubCategory } from "../actions/subCategoryAction";

function AllPost() {
    let [hasMore, sethasMore] = useState(true);
    const [pageNumber, setpageNumber] = useState(2);
  const [sort, setSort] = useState([]);
  const [postLoading, setpostLoading] = useState(false)
  // const navigate = useNavigate();
    const navigate = useNavigate();
    const [allLoadedPost, setallLoadedPost] = useState([])

  const adminPostData = async () => {
    setpostLoading(true)
    try {
      const { data } = await axios.get(`/api/post/${'admin'}/?page=1`);

      setSort(data);
      setallLoadedPost(data);
      setpostLoading(false)
    } catch (error) {
      
    }

   }
useEffect(() => {
  adminPostData();

}, [])

  const dispatch = useDispatch();

      const categoryList = useSelector((state) => state.categoryList);
      const { categories } = categoryList;
      const subCategoryList = useSelector((state) => state.subCategoryList);
      const { subCategories } = subCategoryList;
   useEffect(() => {
   
     
    
       dispatch(listCategory());
     
       dispatch(listSubCategory());
     
   }, [dispatch]);


  const deleteHandel = async (postId) => {
    if (postId) {
      try {
        window.alert("Are you sure?");
        const res = await axios.delete(`/api/post/${postId}`);
        if (res) {
          dispatch(listpost());
        
        }
      } catch (error) {
      }
    }
  };


const [catPage, setcatPage] = useState(2)
const [SubcatPage, setSubcatPage] = useState(2);
const [catId, setcatId] = useState()
const [subcatId, setsubcatId] = useState()
  const dateFilter = (date) => {
    

    const filteredData =
      sort &&
      sort.filter((curElem) => {
        return (
         
           new Date(curElem.createdAt).toISOString() === new Date(date).toISOString()
          
        );
      });


    setSort(filteredData);
    if (!date) {
      const sortedData =
        sort &&
        sort.sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    }
  };
  const categoryHandler = async (category) => {

    if (subcatId) {
      setsubcatId();
    }
    setcatPage(2);
    sethasMore(() => true);
  setcatId(category);
    if (category === "All") {

     
      setSort(allLoadedPost);
    } else {
      const {data} = await axios.get(`/api/category/${category}/?page=1`);
 if (data.length < 20) {
   sethasMore(() => false);
 }
      
      setSort(data);
    }
  };

  const subCategoryHandel = async(subCategory) => {
    console.log(subCategory);
      setSubcatPage(2);
      sethasMore(() => true);
      setsubcatId(subCategory)
    if (subCategory === "All") {

    
      setSort(allLoadedPost);
    } else {
     const { data } = await axios.get(
       `/api/subCategory/${subCategory}/?page=1`
     );

      if (data.length <5 ) {
  sethasMore(() => false);
      }
      setSort(data);

     
    }
  };

    const loadNextPost = async () => {


   
        const data = await axios.get(`/api/post/${'admin'}/?page=${pageNumber}`);
        if (data.status === 200) {
          if (data.data.length < 20) {
            sethasMore(() => false);
          }
  
          setpageNumber(pageNumber + 1);
  
          setSort([...sort, ...data.data]);
        }
      

    };

    const loadNextCAtFilterPost = async() => {

         const {data ,status} = await axios.get(
           `/api/category/${catId}/?page=${catPage}`
         );
        if (status === 200) {
          console.log(data.length);
          if (data.length < 20) {
            sethasMore(() => false);
          }
  
          setcatPage(catPage + 1);
  console.log(catPage);
          setSort([...sort, ...data]);
        }
    }
        const loadNextsubCAtFilterPost = async() => {

         const { data, status } = await axios.get(
           `/api/subCategory/${subcatId}/?page=${SubcatPage}`
         );
        if (status === 200) {
          console.log(data.length);
          if (data.length < 5) {
            sethasMore(() => false);
          }
  
          setSubcatPage(SubcatPage + 1);

          setSort([...sort, ...data]);
        }
    }

  return (
    <>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div class="col-md-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title text-center">
                          All post collection
                        </h4>
                        <div className="allFilters">
                          <div
                            style={{
                              display: 'inline-block',
                              marginRight: '100px',
                              float: 'left',
                            }}
                            className="filters mb-3"
                          >
                            <span style={{ display: 'block' }}>
                              {' '}
                              Filter by Date
                            </span>
                            <input
                              type="date"
                              onChange={(e) => dateFilter(e.target.value)}
                            />
                          </div>

                          <div
                            style={{
                              display: 'inline-block',
                              marginLeft: '10px',
                            }}
                            className="filters mb-3"
                          >
                            <span style={{ display: 'block' }}>
                              {' '}
                              Filter by Category
                            </span>
                            <select
                              onChange={(e) => {
                                categoryHandler(e.target.value)
                       
                              }}
                              className="form-control"
                              name=""
                              id=""
                              style={{ width: '100%' }}
                            >
                              <option value={'All'}>All</option>
                              {categories &&
                                categories.map((category) => (
                                  <option value={category._id}>
                                    {category.category}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div
                            style={{
                              display: 'inline-block',
                              marginLeft: '10px',
                              float: 'right',
                            }}
                            className="filters mb-3"
                          >
                            <span style={{ display: 'block' }}>
                              {' '}
                              Filter by SubCategory
                            </span>
                            <select
                              onChange={(e) =>
                                subCategoryHandel(e.target.value)
                              }
                              className="form-control"
                              name=""
                              id=""
                              style={{ width: '100%' }}
                            >
                              <option value="All">All</option>
                              {subCategories &&
                                subCategories.map((subCategory) => (
                                  <option value={subCategory._id}>
                                    {subCategory.subCategoryName}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div class="">
                          <table>
                            <thead>
                              <tr>
                                <th>Post Title</th>
                                <th>Post Image</th>
                                <th>Posted By</th>
                                <th>Category</th>
                                <th>Sub Category</th>

                                <th>Featured</th>
                                <th>Featured Top</th>
                                <th>Posted At</th>

                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sort &&
                                sort.map((post) => (
                                  <tr>
                                    <td> {post.postitle}</td>
                                    <td>
                                      <img
                                        src={post.img}
                                        height="100px"
                                        width="100px"
                                      />
                                    </td>
                                    <td>
                                      {post &&
                                        post.author &&
                                        post.author.name &&
                                        post.author.name}
                                    </td>
                                    <td>
                                      {post &&
                                        post.category &&
                                        post.category.name &&
                                        post.category.name}
                                    </td>
                                    <td>
                                      {post &&
                                        post.subCategory &&
                                        post.subCategory.name &&
                                        post.subCategory.name}
                                    </td>

                                    <td>
                                      {' '}
                                      {post.isFetaured === true ? 'Yes' : 'No'}
                                    </td>
                                    <td>
                                      {' '}
                                      {post.isFetauredTop === true
                                        ? 'Yes'
                                        : 'No'}
                                    </td>
                                    <td>
                                      {' '}
                                      {new Date(post.createdAt).toDateString()}
                                    </td>

                                    <td>
                                      <button
                                        className="btn btn-danger mb-2"
                                        style={{ padding: ' 0.875rem 1rem' }}
                                        onClick={() => deleteHandel(post._id)}
                                      >
                                        Trash
                                      </button>

                                      <Link
                                        className="btn btn-primary m-1"
                                        style={{
                                          textDecoration: 'none',
                                          color: '#fff',
                                          width: '100%',
                                        }}
                                        to={`/admin/updateposts/${post._id}`}
                                      >
                                        Edit
                                      </Link>
                                    </td>
                                  </tr>
                                ))}

                              {postLoading ? <>
                              
                              </> : null}
                            </tbody>
                          </table>
                        </div>
                        {sort && sort.length ? (
                          <>
                            <InfiniteScroll
                              dataLength={sort.length} //This is important field to render the next data
                              next={()=> {

                                // catId
                                //   ? loadNextCAtFilterPost
                                //   : subcatId
                                //   ? loadNextsubCAtFilterPost
                                //   // : catId === 'All' || subcatId === 'All'
                                //   // ? loadNextPost
                                //   : loadNextPost
   if (catId === 'All' ) {
    loadNextPost();
   }else if( subcatId === 'All'){
 loadNextPost();
   }
   else
                                if (catId && catId !== 'All' && !subcatId) {
                                  loadNextCAtFilterPost();
                                }

  if (subcatId && subcatId !== 'All') {
    loadNextsubCAtFilterPost();
  }
  
   
    if (!subcatId && !catId ) {
    loadNextPost();
    }
    


                              }
                              }
                              hasMore={hasMore}
                              loader={<ClipLoader />}
                            ></InfiniteScroll>
                          </>
                        ) : (
                          ''
                        )}

                        {/* <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={sort && sort.length}
                            paginate={paginate}
                          /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPost;
