import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allUserAction } from "../actions/userActions";
function UpdateUserScreen() {
    const Navigate = useNavigate();
 

  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [professionalName, setProfessionalName] = useState();
  const [password, setPassword] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [linkedIn, setLinkedIn] = useState();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.allUsers);
  const {  users } = userList;
  useEffect(() => {

      dispatch(allUserAction());
    
  }, [dispatch ]);

  const id = useParams();

  useEffect(() => {
    const upDateAblePost =
      users &&
      users.filter((curElem) => {
        return curElem._id === id.id;
      });
    const data = upDateAblePost && upDateAblePost[0];
    setName(data && data.name);

    setAvatar(data && data.avatar);

    setLinkedIn(data &&data.socilaLinks &&  data.socilaLinks.linkedIn &&data.socilaLinks.linkedIn );
    setEmail(data && data.email);
    setProfessionalName(data && data.professionalName);
    setPassword(data && data.password);
    setFacebook(data && data.socilaLinks && data.socilaLinks.facebook);
    setTwitter(data && data.socilaLinks && data.socilaLinks.twitter);
    setBio(data && data.bio);

  }, [users, id.id]);

  const [load, setLoad] = useState();
  const postDataSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`/api/user/${id.id}`, {
      name,
      email,
      password,
      avatar,
      bio,
      facebook,
      twitter,
      linkedIn,
      professionalName,
    });

    if (res.status === 200) {
      setLinkedIn("");
      setName("");
      setPassword("");
      setAvatar("");
      setEmail("");
      setProfessionalName("");
      setPassword("");
      setFacebook("");
      setTwitter("");
      setBio("");
      Navigate('/admin/all_users');
    }
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

     setAvatar(res.data.secure_url);
     setLoad(false);
   };


  useEffect(() => {
    setLoad(false);
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
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Add a new user</h4>
                        <p className="card-description">All Author details</p>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Name</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Professional Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="enter a professional name of that user"
                              onChange={(e) =>
                                setProfessionalName(e.target.value)
                              }
                              value={professionalName}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">email</label>
                            <input
                              className="form-control"
                              type="email"
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              placeholder="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div className="mb-2">Profile Image</div>
                          {/* <h1>Image uploading {progress}%</h1> */}
                          <label htmlFor="contained-button-file">
                            <Input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              type="file"
                              onChange={imageHandler}
                              style={{ display: "none" }}
                            />
                            <Button
                              variant="contained"
                              component="span"
                              className="mb-2"
                            >
                              Upload
                            </Button>
                          </label>
                          <div className="image_previw">
                            <ClipLoader
                              color="skyblue"
                              loading={load}
                              size={50}
                            />
                            <img
                              src={avatar}
                              style={{
                                "max-width": "80%",
                                "max-height": "60%",
                              }}
                            />
                          </div>

                          <p className="card-description">About details</p>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">bio</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="enter a short bio text of the user."
                              onChange={(e) => setBio(e.target.value)}
                              value={bio}
                            />
                          </div>
                          <p className="card-description">
                            <b> Social links</b>#
                          </p>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              facebook
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="facebook profile link"
                              onChange={(e) => setFacebook(e.target.value)}
                              value={facebook}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">twitter</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="twitter profile link"
                              onChange={(e) => setTwitter(e.target.value)}
                              value={twitter}
                            />
                          </div>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              linkedIn
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="linkedIn profile link"
                              onChange={(e) => setLinkedIn(e.target.value)}
                              value={linkedIn}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
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

export default UpdateUserScreen;
