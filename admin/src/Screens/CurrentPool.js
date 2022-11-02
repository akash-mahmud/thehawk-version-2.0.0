import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const CurrentPool = () => {
  const [pool, setpool] = useState({});
  const loadData = async () => {
    try {
      const { data } = await axios.get("/api/pool");
      setpool(data);
    } catch (error) {}
  };
  useEffect(() => {
    loadData();
  }, []);

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
                        <h4 class="card-title">{pool?.title}</h4>
                        Options:
                        <div>
                          {pool?.question?.map((option) => (
                            <>
                              <p>{option.text}</p>
                            </>
                          ))}
                        </div>
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

export default CurrentPool;
