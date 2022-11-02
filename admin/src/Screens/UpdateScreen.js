import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import Button from "@mui/material/Button";
import { listCategory } from "../actions/categoryActions";
import ClipLoader from "react-spinners/ClipLoader";
import { storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { listSubCategory } from "../actions/subCategoryAction";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { listpost } from "../actions/postActions";
import { allUserAction } from "../actions/userActions";
import { useAuth } from "../hooks/user-auth";

// import "./TextEditor.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function UpdateScreen() {
        const Navigate = useNavigate();
      
  const id = useParams();
  const [open, setOpen] = useState(false);
  const postList = useSelector((state) => state.postList);
  const { posts, loading } = postList;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const userList = useSelector((state) => state.allUsers);
  const { users } = userList;
  const handleClose = () => {
    setOpen(false);
  };
  const [afterPostModalOpen, setAfterPostModalOpen] = useState(false);

  // const afterPost = () => {
  //   setAfterPostModalOpen(true);
  // };

  const afterPostHandelClose = () => {
    setAfterPostModalOpen(false);
  };
  const [userInfo, setuserInfo] = useState({
    description: "",
  });

  const ondescription = (value) => {
    setuserInfo({ ...userInfo, description: value });
  };




  const Input = styled("input")({
    display: "none",
  });
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;
  const [imgAlt, setImgAlt] = useState("");
const [isBreaking, setisBreaking] = useState(false);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState();
  const [text, setText] = useState("");
  const [trend, setTrend] = useState();
  const [popular, setPopular] = useState();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [isRight, setIsRight] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [isFetaured, setIsFetaured] = useState();
  const [isFetauredTop, setIsFetauredTop] = useState();
  const [disable, setDisable] = useState(true);
  let [load, setLoad] = useState(false);
  const [subHeading, setSubHeading] = useState();
  const [name, setName] = useState("");
  const [_id, set_id] = useState("");
  const [professionalName, setProfessionalName] = useState("");
  const [socialShare, setSocialShare] = useState(false);
  const [pageTitle, setpageTitle] = useState();
  const [pageDescription, setpageDescription] = useState();
  const [pageKeyWords, setpageKeyWords] = useState();
  const [pageTags, setpageTags] = useState();
const [loadingData, setloadingData] = useState(false)
  const [post, setPost] = useState({})
  const getDataUpdateAble = async() => {
     window.scrollTo({
       top: 0,
       behavior: 'smooth',
     });
setloadingData(true);
const { data, status } = await axios.get(`/api/singlepost/${id.id}`);
if (status===200) {
  setloadingData(false);
}
setPost(...data.post)
  }
  useEffect(() => {
   getDataUpdateAble()
  }, [])
  
  useEffect(() => {
console.log(post);
    setText(post && post.postText);

    setTitle(post && post.postitle);
    setImgAlt(post && post.imgAlt);
    setImage(post && post.img);
    setCategory(post && post.category &&post.category.name &&  post.category.name);
    setSubCategory(post &&post.subCategory &&  post.subCategory.name &&  post.subCategory.name);
    setSubCategoryId(post && post.subCategory &&post.subCategory.id &&  post.subCategory.id);
    setIsRight(post && post.isRight);
    setCategoryId(post && post.category && post.category.id && post.category.id);
    setIsFetaured(post && post.isFetaured);
    setName(post?.author?.name);
    setisBreaking(post?.isBreaking);
    set_id(post?.author?.id);
    setIsFetauredTop(post && post.isFetauredTop);
    setDisable(true);
    setLoad(false);
    setTrend(post && post.isTrending);
    setPopular(post && post.isPopular);
    if (post && post.description) {
      setuserInfo({ description: post.description });
    }
    setSubHeading(post && post.subHeading);
    setSocialShare(post && post.socialShare);
    setpageKeyWords(post && post.keyWords);
    setpageDescription(post && post.pageDescription);
    setpageTitle(post && post.pageTitle);
    setpageTags(post && post.tags);
    setVideo(post && post.video);
    setDisable(false);
   
  }, [post, id.id]);

  const userHandel = (e) => {
    setName(e.target.value);
   
    const filterCategory =
      users &&
      users.filter((curElem) => {
        return curElem.name === e.target.value;
      });
      set_id(filterCategory[0]._id);
  };
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    setLoad(true);
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('upload_preset', 'thehawk');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/thehawk/upload',
      formdata
    );

    setImage(res.data.secure_url);
    setLoad(false);
  };


  const setdatFromMedia = (url) => {
    setImage(url);
    setOpen(false);
  };
  const dispatch = useDispatch();

  const auth = useAuth()
  useEffect(() => {
    dispatch(listCategory());
    dispatch(listSubCategory());
 
      dispatch(listpost());
    
    // setName(auth.user.name);
    // set_id(auth.user._id);
    // setProfessionalName(auth.user.professionalName);
  }, [  dispatch ]);

  const categoryIdHandel = (e) => {
    setCategory(e.target.value);
    setDisable(false);
    const filterCategory =
      categories &&
      categories.filter((curElem) => {
        return curElem.category === e.target.value;
      });
    setCategoryId(filterCategory[0]._id);
  };
  const subCategoryIdHandel = (e) => {
    setSubCategory(e.target.value);
    const filterCategory =
      subCategories &&
      subCategories.filter((curElem) => {
        return curElem.subCategoryName === e.target.value;
      });
    setSubCategoryId(filterCategory[0]._id);
  };

  const postDataSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    const res = await axios.patch(`/api/post/${id.id}`, {
      title,
      text,
      image,
      category,
      categoryId,
      isFetaured,
      isFetauredTop,
      subCategory,
      subCategoryId,
      isRight,
      isBreaking,
      name,
      _id,
      trend,
      popular,
      description: userInfo.description,
      subHeading,
      socialShare,
      professionalName,
      pageTitle,
      pageDescription,
      pageKeyWords,
      pageTags,
      video,
      imgAlt,
    });
    if (res.status === 200) {
      setAfterPostModalOpen(true);
      setTitle("");
      setText("");
      setImage("");
      setCategory("");
      setSubCategory("");
      setSubCategoryId("");
      setIsRight(false);
      setCategoryId("");
      setIsFetaured(false);
setisBreaking(false)
      setIsFetauredTop(false);
      setDisable(true);
      setLoad(false);
      setTrend(false);
      setPopular(false);
      setuserInfo({ ...userInfo, description: "" });
      setSubHeading("");
      setSocialShare(false);
      setpageKeyWords("");
      setpageDescription("");
      setpageTitle("");
      setpageTags("");
      setVideo("");
      setImgAlt("");
      Navigate('/admin/posts');
    }
  };
  
  useEffect(() => {
    dispatch(allUserAction());
   
  }, [dispatch]);

  const [mediaImgFromPost, setMediaImgFromPost] = useState('');
  const [searchMediaUrl, setsearchMediaUrl] = useState('');

    const mediaSearch = async () => {
      // searchMediaUrl;
      const { data } = await axios.post(
        `/api/media/?search=${searchMediaUrl}`,
        {}
      );
      console.log(data);
      if (data) {
        setMediaImgFromPost(data);
      }
    };
  return (
    <>
      <Header />
      <fieldset disabled={loadingData}>
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
                          <h4 class="card-title">Add post</h4>
                          <p class="card-description">All post details</p>
                          <form class="forms-sample">
                            <div class="form-group">
                              <label for="exampleFormControlFile1">
                                Post Title
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
                              <label>Sub Heading</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="Sub Heading"
                                onChange={(e) => setSubHeading(e.target.value)}
                                value={subHeading}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlTextarea1">
                                Post text
                              </label>
                              <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                              ></textarea>
                            </div>
                            <label className="mb-2">Post full text</label>
                            <EditorToolbar toolbarId={"t1"} />
                            <ReactQuill
                              theme="snow"
                              value={userInfo.description}
                              onChange={ondescription}
                              placeholder={"Write the full post content..."}
                              modules={modules("t1")}
                              formats={formats}
                            />
                            <div className="mb-2 mt-3">Post Image</div>
                            {/* <h1>Image uploading {progress}%</h1> */}
                            <label htmlFor="contained-button-file">
                              <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={imageHandler}
                              />
                              <Button
                                variant="contained"
                                component="span"
                                className="mb-2"
                              >
                                Upload
                              </Button>
                            </label>
                            <Button
                              variant="contained"
                              style={{
                                width: "auto",
                                marginLeft: "20px",
                                marginRight: "10px",
                              }}
                              className="mb-2"
                              onClick={handleClickOpen}
                            >
                              Select from media
                            </Button>
                            or Add video url
                            <br />
                            <div class="form-group">
                              <label>Video embeded url</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="iframe/ youtube video embed link"
                                onChange={(e) => setVideo(e.target.value)}
                                value={video}
                              />
                            </div>
                            <span
                              style={{ color: "#ef5350", marginBottom: "20px" }}
                            >
                              {" "}
                              *warning: this data will just working for video
                              section's posts
                            </span>
                            <div class="form-group mt-3">
                              <label for="exampleFormControlFile1">
                                Image Alt (if you upload a new image then add
                                this.)
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="img alt"
                                onChange={(e) => setImgAlt(e.target.value)}
                                value={imgAlt}
                              />
                            </div>
                            <div className="image_previw">
                              <ClipLoader
                                color="skyblue"
                                loading={load}
                                size={50}
                              />

                              <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>
                                  <h3>Medias</h3>
                                  <div class="form-group">
                                    <label>Search</label>
                                    <input
                                      class="form-control"
                                      type="text"
                                      placeholder="Enter Image Alt value to serach a specific image"
                                      onChange={(e) =>
                                        setsearchMediaUrl(e.target.value)
                                      }
                                      // value={video}
                                    />

                                    <button
                                      type="submit"
                                      className="btn btn-primary me-2"
                                      onClick={mediaSearch}
                                      style={{ marginTop: "10px" }}
                                      // disabled={adPostLoad}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </DialogTitle>
                                <DialogContent>
                                  {/* <ClipLoader
                                  color="skyblue"
                                  loading={loading}
                                  size={54}
                                /> */}

                                  {mediaImgFromPost &&
                                    mediaImgFromPost.map((curElem) => (
                                      <>
                                        <img
                                          onClick={() =>
                                            setdatFromMedia(curElem.img)
                                          }
                                          className="m-3"
                                          src={curElem.img}
                                          alt=""
                                          height="100px"
                                          width="100px"
                                        />
                                      </>
                                    ))}
                                </DialogContent>
                                {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
                              </Dialog>
                              <img
                                // alt=""
                                src={image}
                                style={{
                                  "max-width": "80%",
                                  "max-height": "60%",

                                  display: "block",
                                }}
                              />
                            </div>
                            <Dialog
                              className="afterPostModal"
                              open={afterPostModalOpen}
                              onClose={afterPostHandelClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title"></DialogTitle>
                              <DialogContent>
                                <DialogContentText
                                  style={{ textAlign: "center" }}
                                  id="alert-dialog-description"
                                >
                                  See the previw of your post on live
                                  <Button
                                    style={{
                                      width: "83%",
                                      margin: "16px 57px",
                                    }}
                                    variant="outlined"
                                    onClick={afterPostHandelClose}
                                  >
                                    View
                                  </Button>
                                  {/* <Button
                                  style={{ width: "83%", margin: "16px 57px" }}
                                  variant="outlined"
                                  onClick={afterPostHandelClose}
                                  autoFocus
                                >
                                  Create a New post
                                </Button> */}
                                </DialogContentText>
                              </DialogContent>
                            </Dialog>
                            <div
                              class="form-group"
                              style={{ marginTop: "20px" }}
                            >
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
                            <div
                              class="form-group"
                              style={{ marginTop: "20px" }}
                            >
                              <label for="exampleSelectGender">
                                If you want to change the user
                              </label>
                              <select
                                class="form-control"
                                id="exampleSelectGender"
                                onChange={userHandel}
                                value={name}
                              >
                                {users &&
                                  users.map((elem) => (
                                    <option>{elem.name}</option>
                                  ))}
                              </select>
                            </div>
                            <div class="form-group">
                              <label for="exampleSelectGender">
                                Sub Category
                              </label>
                              <select
                                class="form-control"
                                id="exampleSelectGender"
                                onChange={subCategoryIdHandel}
                                disabled={disable}
                                value={subCategory}
                              >
                                <option>
                                  {!subCategory
                                    ? "Select the post Sub Category "
                                    : ""}
                                </option>
                                {subCategories &&
                                  subCategories
                                    .filter(
                                      (person) =>
                                        person.categoryId === categoryId
                                    )
                                    .map((elem) => (
                                      <option>{elem.subCategoryName}</option>
                                    ))}
                              </select>
                            </div>
                            <div class="form-group">
                              <label htmlFor="isfetaured">
                                Add as category fetaured post
                              </label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isfetaured"
                                type="checkbox"
                                onChange={(e) =>
                                  setIsFetaured(e.target.checked)
                                }
                                checked={isFetaured}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isTopfetaured">Add to top</label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isTopfetaured"
                                type="checkbox"
                                onChange={(e) =>
                                  setIsFetauredTop(e.target.checked)
                                }
                                checked={isFetauredTop}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isRight">
                                Add to Right Column
                              </label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isRight"
                                type="checkbox"
                                onChange={(e) => setIsRight(e.target.checked)}
                                checked={isRight}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isRight">Tending?</label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isRight"
                                type="checkbox"
                                onChange={(e) => setTrend(e.target.checked)}
                                checked={trend}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isRight"> DON'T MISS?</label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isRight"
                                type="checkbox"
                                onChange={(e) => setPopular(e.target.checked)}
                                checked={popular}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isRight"> is Breaking</label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                id="isRight"
                                type="checkbox"
                                onChange={(e) =>
                                  setisBreaking(e.target.checked)
                                }
                                checked={isBreaking}
                              />
                            </div>
                            <div class="form-group">
                              <label htmlFor="isRight">
                                Social Share Button?
                              </label>
                              <input
                                style={{
                                  height: "28px",
                                  width: "18px",
                                  display: "block",
                                }}
                                type="checkbox"
                                onChange={(e) =>
                                  setSocialShare(e.target.checked)
                                }
                                checked={socialShare}
                              />
                            </div>
                            <div class="form-group">
                              <label>Tags</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="use comma for write new tags or multiple tags"
                                onChange={(e) => setpageTags(e.target.value)}
                                value={pageTags}
                              />
                            </div>
                            <h5>SEO options</h5>
                            <div class="form-group">
                              <label>Page title</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="Write the page title"
                                onChange={(e) => setpageTitle(e.target.value)}
                                value={pageTitle}
                              />
                            </div>
                            <div class="form-group">
                              <label>Page Description</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="Write the page description"
                                onChange={(e) =>
                                  setpageDescription(e.target.value)
                                }
                                value={pageDescription}
                              />
                            </div>
                            <div class="form-group">
                              <label>Keywords</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="use comma for write new Keywords or multiple Keywords"
                                onChange={(e) =>
                                  setpageKeyWords(e.target.value)
                                }
                                value={pageKeyWords}
                              />
                            </div>
                            <button
                              type="submit"
                              class="btn btn-primary me-2"
                              onClick={postDataSubmit}
                              style={{ width: "13%" }}
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
      </fieldset>
    </>
  );
}

export default UpdateScreen;
