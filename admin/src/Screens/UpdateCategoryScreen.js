import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../actions/categoryActions';
function UpdateCategoryScreen() {
  const navigate = useNavigate();
       
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const dispatch = useDispatch();
  useEffect(() => {

      dispatch(listCategory());
    
  }, [dispatch ]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageKeywords, setPageKeywords] = useState('');
  const [image, setImage] = useState('');
  const [addTop, setaddTop] = useState(false);

  const [addToMenu, setAddToMenu] = useState(false);
  const [blueSection, setBlueSection] = useState();
  const [isGridSection, setIsGridSection] = useState();
  const [addToComminSection, setAddToComminSection] = useState();
  const [isPlainSection, setIsPlainSection] = useState();
  const [gridWithWizard, setGridWithWizard] = useState();
  const [isVideoSection, setIsVideoSection] = useState();

  const id = useParams();

  useEffect(() => {
    const upDateAblePost =
      categories &&
      categories.filter((curElem) => {
        return curElem._id === id.id;
      });
    const data = upDateAblePost && upDateAblePost[0];
    setTitle(data && data.category);
    setText(data && data.categoryText);
    setImage(data && data.categoryImg);
    setaddTop(data && data.addTop);
    setAddToMenu(data && data.addToMenu);
    setBlueSection(data && data.isblueSection);

    setIsGridSection(data && data.isGridSection);

    setAddToComminSection(data && data.addToComminSection);
    setIsPlainSection(data && data.isPlainSection);
    setGridWithWizard(data && data.gridWithWizard);
    setIsVideoSection(data && data.isVideoSection);
    setPageTitle(data && data.categoryPageTitle);
    setPageKeywords(data && data.categoryPageKeyWords);
  }, [categories, id.id]);

  const categoryDataSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`/api/category/${id.id}`, {
      title,
      text,
      image,
      addTop,
      addToMenu,
      blueSection,
      isGridSection,
      addToComminSection,
      isPlainSection,
      gridWithWizard,
      isVideoSection,
      pageTitle,
      pageKeywords,
    });
    if (res.status === 200) {
      setTitle('');
      setText('');
      setImage('');
      setaddTop(false);
      setAddToMenu(false);
      setBlueSection(false);
      setIsGridSection(false);
      setAddToComminSection(false);
      setIsPlainSection(false);
      setGridWithWizard(false);
      setIsVideoSection(false);
      setPageTitle('');
      setPageKeywords('');
      navigate('/admin/all_category');
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
                  <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Update the category</h4>
                        <p class="card-description">All catrgory details</p>
                        <form class="forms-sample">
                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Category
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                          </div>

                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Page title
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="enter page title"
                              onChange={(e) => setPageTitle(e.target.value)}
                              value={pageTitle}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlFile1">
                              Page keywords
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="use comma to type multiple keywords"
                              onChange={(e) => setPageKeywords(e.target.value)}
                              value={pageKeywords}
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                              Page description
                            </label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              onChange={(e) => setText(e.target.value)}
                              value={text}
                            ></textarea>
                          </div>

                          <div class="form-group">
                            <label htmlFor="isfetaured">Add to menu</label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isfetaured"
                              type="checkbox"
                              onChange={(e) => setAddToMenu(e.target.checked)}
                              checked={addToMenu}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="isTopfetaured">
                              Add to GridSection
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isTopfetaured"
                              type="checkbox"
                              onChange={(e) =>
                                setIsGridSection(e.target.checked)
                              }
                              checked={isGridSection}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="isTopfetaured">
                              Add to add To Common Section
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isTopfetaured"
                              type="checkbox"
                              onChange={(e) =>
                                setAddToComminSection(e.target.checked)
                              }
                              checked={addToComminSection}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="isTopfetaured">
                              Add to Plain Section
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isTopfetaured"
                              type="checkbox"
                              onChange={(e) =>
                                setIsPlainSection(e.target.checked)
                              }
                              checked={isPlainSection}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="isTopfetaured">
                              Add to video Section
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isTopfetaured"
                              type="checkbox"
                              onChange={(e) =>
                                setIsVideoSection(e.target.checked)
                              }
                              checked={isVideoSection}
                            />
                          </div>
                          <div class="form-group">
                            <label htmlFor="isTopfetaured">
                              Add to grid with wizard
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isTopfetaured"
                              type="checkbox"
                              onChange={(e) =>
                                setGridWithWizard(e.target.checked)
                              }
                              checked={gridWithWizard}
                            />
                          </div>

                          <div class="form-group">
                            <label htmlFor="isRight">
                              Is blusection Category?
                            </label>
                            <input
                              style={{
                                height: '28px',
                                width: '18px',
                                display: 'block',
                              }}
                              id="isRight"
                              type="checkbox"
                              onChange={(e) => setBlueSection(e.target.checked)}
                              checked={blueSection}
                            />
                          </div>
                          <button
                            type="submit"
                            class="btn btn-primary me-2"
                            onClick={categoryDataSubmit}
                            style={{ width: '13%' }}
                          >
                            update
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

export default UpdateCategoryScreen;
