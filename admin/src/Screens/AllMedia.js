import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listpost } from "../actions/postActions";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function AllMedia() {
      const navigate = useNavigate();

  const dispatch = useDispatch();
    const postList = useSelector((state) => state.postList);
    const { loading, posts } = postList;
  useEffect(() => {

      dispatch(listpost());
    
  }, [dispatch]);


  return (
    <>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div class="col-md-12 grid-margin stretch-card">
                  {loading === true ? (
                    <ClipLoader color="skyblue" loading="true" size={54} />
                  ) : (
                    <div class="card">
                      <div class="card-body">
                        {posts &&
                          posts.map((curElem) => (
                            <>
                              <img
                                className="m-3"
                                src={curElem.img}
                                alt=""
                                height="100px"
                                width="100px"
                              />
                            </>
                          ))}
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

export default AllMedia;
