import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listpost } from '../actions/postActions';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import ClipLoader from 'react-spinners/ClipLoader';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { allUserAction } from '../actions/userActions';

import Pagination from '../components/Pagination';

import dayjs from 'dayjs';
import { listCategory } from '../actions/categoryActions';
import { listSubCategory } from '../actions/subCategoryAction';
import Button from '@mui/material/Button';

import Slide from '@mui/material/Slide';
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AllUsersScreen() {
  const navigate = useNavigate();
       
  const userList = useSelector((state) => state.allUsers);
  const { loading, users } = userList;
  const postList = useSelector((state) => state.postList);
  const { posts } = postList;
  const [lenghtUser, setLenghtUser] = useState(0);
  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState();

  const handleClose = () => {
    setOpen(false);
    setSort([]);
  };
  const dispatch = useDispatch();

  useEffect(() => {

      dispatch(allUserAction());
    
   
      dispatch(listpost());
    
  }, [dispatch ]);

  const [startingDate, setStartingDate] = useState();
  const [endingDate, setEndingDate] = useState();
  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert('Are you sure?');
      try {
        const res = await axios.delete(`/api/user/${postId}`);
        if (res.status === 200) {
          dispatch(allUserAction());
          navigate('/admin/all_users');
        }
      } catch (error) {}
    }
  };

  // data

  const [sort, setSort] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);
  useEffect(() => {
    dispatch(listpost());
    dispatch(listCategory());
    dispatch(listSubCategory());
  }, [dispatch]);

  useEffect(() => {
    const sortedData =
      posts &&
      posts.sort((a, b) => {
        const dateAInMillis = new Date(a.createdAt).getTime();
        const dateBInMillis = new Date(b.createdAt).getTime();

        return dateBInMillis - dateAInMillis;
      });
    setSort(sortedData);
  }, [posts]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sort && sort.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dateFilter = (date) => {
   

    const filteredData =
      posts &&
      posts.filter((curElem) => {
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
        posts.sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    }
  };

  const viewPost = (event) => {
    setUserId(event);
    setOpen(true);

    let filteredByUserIdLenght = (
      posts && posts.filter((curElem) => curElem.author.id === event)
    ).length;
    setLenghtUser(filteredByUserIdLenght);
    const filteredData =
      posts &&
      posts.filter((curUserPost) => {
        return curUserPost.author.id === event;
      });

    setSort(filteredData);
  };

  const submitFilterDate = () => {
    const filteredData =
      posts &&
      posts.filter(
        (curElem) =>
          dayjs(startingDate).isSameOrBefore(
            dayjs(new Date(curElem.createdAt).toDateString())
          ) === true &&
          dayjs(endingDate).isSameOrAfter(
            dayjs(new Date(curElem.createdAt).toDateString())
          ) === true
      );

    setSort(filteredData);
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
                    <>
                      <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                      >
                        <div className="container-fluid ">
                          <div className="main-panel">
                            <div className="content-wrapper customViewPost">
                              <div className="row">
                                <div className="col-sm-12">
                                  <div className="cloSeButton">
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleClose}
                                    >
                                      close
                                    </button>
                                  </div>
                                  {postList.loading === true ? (
                                    <ClipLoader
                                      color="000"
                                      loading="true"
                                      size={54}
                                    />
                                  ) : (
                                    <div class="col-md-12 grid-margin ">
                                      <div class="card">
                                        <div class="card-body">
                                          {/* <h4 class="card-title text-center">
                                            his post collection
                                          </h4> */}

                                          <div className="allFilters">
                                            <div
                                              style={{
                                                display: 'inline-block',
                                                marginRight: '20px',
                                              }}
                                              className="filters mb-3 "
                                            >
                                              <span
                                                style={{ display: 'block' }}
                                              >
                                                From
                                              </span>
                                              <input
                                                type="date"
                                                onChange={(e) =>
                                                  setStartingDate(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>

                                            <div
                                              style={{
                                                display: 'inline-block',
                                                marginRight: '20px',
                                              }}
                                              className="filters mb-3"
                                            >
                                              <span
                                                style={{ display: 'block' }}
                                              >
                                                End
                                              </span>
                                              <input
                                                type="date"
                                                onChange={(e) =>
                                                  setEndingDate(e.target.value)
                                                }
                                              />
                                            </div>
                                            <button
                                              onClick={submitFilterDate}
                                              style={{
                                                display: 'inline-block',
                                                'margin-right': '20px',
                                                width: '112px',
                                                padding: '8px',
                                              }}
                                              className="btn btn-info"
                                            >
                                              Filter
                                            </button>

                                            <div
                                              className="numberOfPosts"
                                              style={{
                                                display: 'inline-block',
                                                width: '46%',

                                                textAlign: 'right',
                                              }}
                                            >
                                              <h3>
                                                {sort && sort.length} Posts
                                              </h3>
                                            </div>
                                          </div>
                                          <div class="">
                                            <table>
                                              <thead>
                                                <tr>
                                                  <th>Post Title</th>
                                                  <th>Posted By</th>
                                                  <th>Category</th>
                                                  <th>Sub Category</th>

                                                  <th>Featured</th>
                                                  <th>Featured Top</th>
                                                  <th>Posted At</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {currentPosts &&
                                                  currentPosts
                                                    .filter(
                                                      (curData) =>
                                                        curData.author.id ===
                                                        userId
                                                    )
                                                    .map((post) => (
                                                      <tr>
                                                        <td>
                                                          {' '}
                                                          {post.postitle}
                                                        </td>
                                                        <td>
                                                          {post.author.name}
                                                        </td>
                                                        <td>
                                                          {post.category.name}
                                                        </td>
                                                        <td>
                                                          {
                                                            post.subCategory
                                                              .name
                                                          }
                                                        </td>

                                                        <td>
                                                          {post.isFetaured ===
                                                          true
                                                            ? 'Yes'
                                                            : 'No'}
                                                        </td>
                                                        <td>
                                                          {post.isFetauredTop ===
                                                          true
                                                            ? 'Yes'
                                                            : 'No'}
                                                        </td>
                                                        <td>
                                                          {new Date(
                                                            post.createdAt
                                                          ).toDateString()}
                                                        </td>
                                                      </tr>
                                                    ))}
                                              </tbody>
                                            </table>
                                          </div>
                                          <Pagination
                                            postsPerPage={postsPerPage}
                                            // totalPosts={sort && sort.length}
                                            totalPosts={
                                              (
                                                posts &&
                                                posts.filter(
                                                  (curElem) =>
                                                    curElem.author.id === userId
                                                )
                                              ).length
                                            }
                                            paginate={paginate}
                                            // totalPosts=  {(currentPosts &&
                                            //       currentPosts
                                            //       .filter((curData)=> curData.author.id===userId)).length> 0 &&(
                                            //         (currentPosts &&
                                            //       currentPosts
                                            //       .filter((curData)=> curData.author.id===userId)).length
                                            //       ) }

                                            //                 totalPosts={(currentPosts && currentPosts.filter((curData)=> curData.author.id===userId).length>0?(
                                            //
                                            //                     (currentPosts&& currentPosts.filter((data)=>data.author.id===userId).length)
                                            //
                                            //                 ):(
                                            //
                                            //                   (currentPosts&& currentPosts.filter((data)=>data.author.id===userId).length)
                                            //                 ))}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* {currentPosts &&
                                                  currentPosts
                                                  .filter((curData)=> curData.author.id===userId) */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog>

                      <div class="col-md-12 grid-margin stretch-card">
                        <div class="card">
                          <div class="card-body">
                            <h4 class="card-title">All users of thehawk</h4>

                            <div class="">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Administrator</th>
                                    <th>Author</th>
                                    <th>Total Post made</th>
                                    <th>All Posts</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {users &&
                                    users.map((post) => (
                                      <tr>
                                        <td>
                                          {post.name}{' '}
                                          {post.isAdmin === true
                                            ? '(Admin)'
                                            : ''}
                                        </td>
                                        <td> {post.email}</td>
                                        <td>
                                          {post.isAdmin === true ? 'Yes' : 'No'}{' '}
                                        </td>
                                        <td>
                                          {post.isAuthor === true
                                            ? 'Yes'
                                            : 'No'}{' '}
                                        </td>
                                        <td>
                                          {postList.loading === true ? (
                                            <ClipLoader
                                              color="000"
                                              loading="true"
                                              size={54}
                                            />
                                          ) : (
                                            ''
                                          )}
                                          {posts &&
                                            posts.filter(
                                              (element) =>
                                                element.author.id === post._id
                                            ).length > 0 && (
                                              <div>
                                                {posts &&
                                                  posts.filter(
                                                    (element) =>
                                                      element.author.id ===
                                                      post._id
                                                  ).length}
                                              </div>
                                            )}
                                          {posts &&
                                          posts.filter(
                                            (element) =>
                                              element.author.id === post._id
                                          ).length <= 0 ? (
                                            <div>{'Not made any post yet'}</div>
                                          ) : (
                                            ''
                                          )}
                                        </td>

                                        <td>
                                          <Button
                                            variant="contained"
                                            className=" m-1"
                                            onClick={() => viewPost(post._id)}
                                          >
                                            View
                                          </Button>
                                        </td>

                                        <td>
                                          <button
                                            className={`btn btn-danger mb-2 ${
                                              post.isAdmin === true
                                                ? 'cstm'
                                                : ''
                                            }`}
                                            style={{
                                              padding: ' 0.875rem 1rem',
                                            }}
                                            onClick={() =>
                                              deleteHandel(post._id)
                                            }
                                            disabled={post.isAdmin === true}
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
                                            to={`/admin/update_users/${post._id}`}
                                          >
                                            Edit
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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

export default AllUsersScreen;
