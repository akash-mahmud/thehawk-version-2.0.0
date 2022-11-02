import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { listpost } from '../actions/postActions';
import { listCategory } from '../actions/categoryActions';
import { listSubCategory } from '../actions/subCategoryAction';
import { allUserAction } from '../actions/userActions';
import { listRss } from '../actions/rssActions';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const Navigate = useNavigate()
       
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;
  const rssList = useSelector((state) => state.rssList);
  const { rss } = rssList;
  const userList = useSelector((state) => state.allUsers);
  const { users } = userList;
  const postList = useSelector((state) => state.postList);
  const { posts, loading } = postList;
  useEffect(() => {

      dispatch(listpost());
    

   
      dispatch(listCategory());
    

   
      dispatch(listSubCategory());
   
      dispatch(listRss());
   
      dispatch(allUserAction());
    
  }, [dispatch]);

  const data = {
    labels: ['Posts', 'Users', 'Categories', 'Sub Categories', 'RSS'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          posts && posts.length,
          users && users.length,
          categories && categories.length,
          subCategories && subCategories.length,
          rss && rss.length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
                  <div class="card">
                    <div class="card-body">
                      {/* <h4 class="card-title">All news categories</h4> */}
                      <div className="col-sm-9 myChart">
                        {loading === true ? (
                          <ClipLoader
                            color="skyblue"
                            loading="true"
                            size={54}
                          />
                        ) : categoryList.loading === true ? (
                          <ClipLoader
                            color="skyblue"
                            loading="true"
                            size={54}
                          />
                        ) : subCategoryList.loading === true ? (
                          <ClipLoader
                            color="skyblue"
                            loading="true"
                            size={54}
                          />
                        ) : userList.loading === true ? (
                          <ClipLoader
                            color="skyblue"
                            loading="true"
                            size={54}
                          />
                        ) : rssList.loading === true ? (
                          <ClipLoader
                            color="skyblue"
                            loading="true"
                            size={54}
                          />
                        ) : (
                          <Doughnut data={data} />
                        )}

                        {/* <Doughnut data={data} /> */}
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

export default Dashboard;
