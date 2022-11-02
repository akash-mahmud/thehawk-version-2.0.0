import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { listCategory } from "../actions/categoryActions";
import { listpost } from "../actions/postActions";
import { listSubCategory } from "../actions/subCategoryAction";

function AllSubCategoryScreen() {
  const navigate = useNavigate();
        
  // const [data, setData] = useState()
  const categoryList = useSelector((state) => state.categoryList);
  const {  categories } = categoryList;
  // const postList = useSelector((state) => state.postList);
  // const {  posts } = postList;

  const dispatch = useDispatch();
    const subCategoryList = useSelector((state) => state.subCategoryList);
  const {loading, subCategories } = subCategoryList;
  useEffect(() => {

      dispatch(listSubCategory());
  
  }, [dispatch ]);

  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axios.delete(`/api/subCategory/${postId}`);
        if (res) {
          navigate('/admin/all/sub_category');
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
                          <h4 class="card-title">All news Sub Categories</h4>

                          <div class="">
                            <table>
                              <thead>
                                <tr>
                                  {/* <th>Posted By</th> */}
                                  {/* <th>Post Id</th> */}
                                  <th> Sub Category Name</th>
                                  <th>Parent Category</th>
                                  <th>Created At</th>

                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {subCategories &&
                                  subCategories.map((category) => (
                                    <tr>
                                      {/* <td>Someone</td> */}
                                      {/* <td>{post._id}</td> */}
                                      <td> {category.subCategoryName}</td>
                                      <td>{category.category} </td>
                                      <td>
                                        {new Date(
                                          category.createdAt
                                        ).toDateString()}{' '}
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
                                          to={`/admin/update_subcategory/${category._id}`}
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

export default AllSubCategoryScreen;
