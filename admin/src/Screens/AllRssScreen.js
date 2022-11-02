import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { listRss } from "../actions/rssActions";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AllRssScreen() {
  const dispatch = useDispatch();
  const rssList = useSelector((state) => state.rssList);
  const { rss, loading } = rssList;
  useEffect(() => {

      dispatch(listRss());
   
  }, [dispatch]);

  const navigate = useNavigate();


  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axios.delete(`/api/rss/${postId}`);
        if (res) {
           dispatch(listRss());
          navigate('/admin/all_rss');
        }
      } catch (error) {
      }
    }
  };
  // DE89370400440532013000;
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
                          <h4 class="card-title">All Rss</h4>

                          <div class="">
                            <table>
                              <thead>
                                <tr>
                                  <th>Rss Title</th>
                                  <th>Category</th>
                                  <th>Created At</th>

                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rss &&
                                  rss.map((rssData) => (
                                    <tr>
                                      <td> {rssData.name}</td>
                                      <td>{rssData.category.name}</td>
                                      <td>
                                        {new Date(
                                          rssData.createdAt
                                        ).toDateString()}
                                      </td>

                                      <td>
                                        <button
                                          className="btn btn-danger mb-2"
                                          style={{ padding: ' 0.875rem 1rem' }}
                                          onClick={() =>
                                            deleteHandel(rssData._id)
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
                                          to={`/admin/updaterss/${rssData._id}`}
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

export default AllRssScreen;
