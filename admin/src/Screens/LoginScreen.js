import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth} from '../hooks/user-auth'
import Swal from 'sweetalert2'
import {  useLocation, useNavigate } from "react-router-dom";
import { signin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = useAuth()

  const submit = async (e) => {
    e.preventDefault();
    // dispatch(signin(email, password));
    auth.signin(email, password, () => navigate('/admin/dashboard'));
  };
  
  
 
   
  return (
    <>
    
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <h4 style={{ textAlign: "center" }}>Thehawk</h4>

                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <a
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={submit}
                      >
                        Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
