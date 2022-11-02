import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { listCategory } from "../actions/categoryActions";
import { listpost } from "../actions/postActions";

function AllCategoryScreen() {
  // const [data, setData] = useState()
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories } = categoryList;
  const postList = useSelector((state) => state.postList);
  const {  posts } = postList;
  const navigate = useNavigate();
   
  const dispatch = useDispatch();
  useEffect(() => {

      dispatch(listCategory());
    


      dispatch(listpost());
    
  }, [dispatch ]);

  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axios.delete(`/api/category/${postId}`);
        if (res) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
      }
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
                          <h4 class="card-title">All news categories</h4>

                          <div class="">
                            <table>
                              <thead>
                                <tr>
                                  {/* <th>Posted By</th> */}
                                  {/* <th>Post Id</th> */}
                                  <th>Category Name</th>
                                  <th>Add to Menu </th>
                                  <th>Add to addTop </th>
                                  <th>Category Text</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories &&
                                  categories.map((category) => (
                                    <tr>
                                      {/* <td>Someone</td> */}
                                      {/* <td>{post._id}</td> */}
                                      <td> {category.category}</td>
                                      <td>
                                        {' '}
                                        {category.addToMenu === true
                                          ? 'Yes'
                                          : 'No'}
                                      </td>
                                      <td>
                                        {' '}
                                        {category.addTop === true
                                          ? 'Yes'
                                          : 'No'}
                                      </td>
                                      <td>
                                        {' '}
                                        {category && category.categoryText
                                          ? category.categoryText
                                          : ''}{' '}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-danger mb-2"
                                          style={{ padding: ' 0.875rem 1rem' }}
                                          onClick={() =>
                                            deleteHandel(category._id)
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
                                          to={`/admin/update_category/${category._id}`}
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

export default AllCategoryScreen;
