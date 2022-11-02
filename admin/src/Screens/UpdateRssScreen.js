import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../actions/categoryActions";
import axios from "axios";
import { listRss } from "../actions/rssActions";

function UpdateRssScreen() {
  const Navigate = useNavigate();
         
  const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
    const rssDataList = useSelector((state) => state.rssList);
    const { rss } = rssDataList;
  useEffect(() => {
 
      dispatch(listCategory());
    
  }, [dispatch ]);


  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {

      dispatch(listRss());
    
  }, [dispatch ]);


  const id = useParams();

  const categoryIdHandel = (e) => {
    setCategory(e.target.value);

    const filterCategory =
      categories &&
      categories.filter((curElem) => {
        return curElem.category === e.target.value;
      });
    setCategoryId(filterCategory[0]._id);
  };

  const postDataSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`/api/rss/${id.id}`, {
      title,

      url,
      category,
      categoryId,
    });
    if (res.status === 200) {
      setTitle("");

      setCategory("");

      setCategoryId("");
dispatch(listRss());
      Navigate('/admin/all_rss');
    }
  };
  useEffect(() => {
    const upDateAblePost =
      rss &&
      rss.filter((curElem) => {
        return curElem._id === id.id;
      });
    const data = upDateAblePost && upDateAblePost[0];
    setTitle(data && data.name);

    setCategory(data && data.category.name);

    setCategoryId(data && data.category.id);
    setUrl(data && data.rssUrl);
  }, [rss, id.id]);
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
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Add RSS</h4>
                        <p class="card-description">All rss details</p>
                        <form class="forms-sample">
                          <div class="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlFile1">Rss Url</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Url"
                              onChange={(e) => setUrl(e.target.value)}
                              value={url}
                            />
                          </div>

                          <div class="form-group">
                            <label for="exampleSelectGender">Category</label>
                            <select
                              class="form-control"
                              id="exampleSelectGender"
                              onChange={categoryIdHandel}
                              value={category}
                            >
                              <option>
                                {!category ? "Select the post category" : ""}
                              </option>
                              {categories &&
                                categories.map((elem) => (
                                  <option>{elem.category}</option>
                                ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            onClick={postDataSubmit}
                            style={{ width: "13%" }}
                          >
                            Update
                          </button>
                        </form>
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

export default UpdateRssScreen;
