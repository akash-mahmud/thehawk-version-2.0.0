import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SiteInfo = () => {
  const [loading, setloading] = useState(false);
  const [hasAddedAlready, sethasAddedAlready] = useState(true);
  const [siteinfo, setsiteinfo] = useState({});
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const { data } = await axios.get("/api/siteinfo");
      if (!data) {
        sethasAddedAlready(false);
      } else {
        setsiteinfo(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      if (hasAddedAlready) {
        await axios.patch("/api/siteinfo", siteinfo);
      } else {
        await axios.post("/api/siteinfo", siteinfo);
      }

      setloading(false);

      navigate("/admin/dashboard");
    } catch (error) {}
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
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Site info</h4>
                        <form class="forms-sample">
                          <div class="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              class="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  title: e.target.value,
                                })
                              }
                              value={siteinfo?.title}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Description
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  description: e.target.value,
                                })
                              }
                              value={siteinfo?.description}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlFile1">Tags</label>
                            <input
                              class="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  tags: e.target.value,
                                })
                              }
                              value={siteinfo?.tags}
                            />
                          </div>

                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            onClick={submit}
                            style={{ width: "13%" }}
                            disabled={loading}
                          >
                            Post
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
};

export default SiteInfo;
