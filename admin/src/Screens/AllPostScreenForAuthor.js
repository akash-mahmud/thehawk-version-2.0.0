import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listpost } from "../actions/postActions";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dayjs from "dayjs";
import { listCategory } from "../actions/categoryActions";
import { listSubCategory } from "../actions/subCategoryAction";
function AllPostScreenForAuthor() {
  const [userData, setUserData] = useState();
  let [hasMore, sethasMore] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, []);

  const [sort, setSort] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

    useEffect(() => {
    
        dispatch(listpost());
      
     
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
          // navigate("/");
        }
      } catch (error) {
      }
    }
  };
  useEffect(() => {
 
    const sortedData =
      posts &&
      posts
     
      .filter(
        (curData) =>
        userData &&userData._id && curData.author.id === userData._id
      )
      .sort((a, b) => {
        const dateAInMillis = new Date(a.createdAt).getTime();
        const dateBInMillis = new Date(b.createdAt).getTime();

        return dateBInMillis - dateAInMillis;
      });
    setSort(sortedData);
  }, [posts,userData]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sort && sort.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dateFilter = (date) => {
    const filteredData =
      posts &&
      posts
      .filter(
        (curData) =>
          userData._id === curData.author.id
      )
      .filter((curElem) => {
        return (
          dayjs(date).isSame(
            dayjs(new Date(curElem.createdAt).toDateString())
          ) === true
        );
      });


    setSort(filteredData);
    if (!date) {
      const sortedData =
        posts &&
        posts
        .filter(
          (curData) =>
            userData._id === curData.author.id
        )
        .sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    }
  };
  const categoryHandler = (category) => {
    if (category === "All") {

      const sortedData =
        posts &&
        posts
        .filter(
          (curData) =>
            userData._id === curData.author.id
        )
        .sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    } else {
      const filteredData =
        posts &&
        posts.filter((elem) => {
          return elem.category.name === category;
        });
      setSort(filteredData);
    }
  };

  const subCategoryHandel = (subCategory) => {
    if (subCategory === "All") {

      const sortedData =
        posts &&
        posts
        .filter(
          (curData) =>
            userData._id === curData.author.id
        )
        .sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    } else {
      const filteredData =
        posts &&
        posts.filter((elem) => {
          return elem.subCategory.name === subCategory;
        });
      setSort(filteredData);
    }
  };
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
                  {loading === true ? (
                    <ClipLoader color="000" loading="true" size={54} />
                  ) : (
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
                                onChange={(e) =>
                                  categoryHandler(e.target.value)
                                }
                                className="form-control"
                                name=""
                                id=""
                                style={{ width: '100%' }}
                              >
                                <option value="All">All</option>
                                {categories &&
                                  categories.map((category) => (
                                    <option value={category.category}>
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
                                    <option value={subCategory.subCategoryName}>
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
                                {currentPosts &&
                                  currentPosts
                                    .filter(
                                      (curData) =>
                                        userData._id === curData.author.id
                                    )
                                    .map((post) => (
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
                                          {post.isFetaured === true
                                            ? 'Yes'
                                            : 'No'}
                                        </td>
                                        <td>
                                          {' '}
                                          {post.isFetauredTop === true
                                            ? 'Yes'
                                            : 'No'}
                                        </td>
                                        <td>
                                          {' '}
                                          {new Date(
                                            post.createdAt
                                          ).toDateString()}
                                        </td>

                                        <td>
                                          <button
                                            className="btn btn-danger mb-2"
                                            style={{
                                              padding: ' 0.875rem 1rem',
                                            }}
                                            onClick={() =>
                                              deleteHandel(post._id)
                                            }
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
                              </tbody>
                            </table>
                          </div>
                          <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={sort && sort.length}
                            paginate={paginate}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPostScreenForAuthor;
