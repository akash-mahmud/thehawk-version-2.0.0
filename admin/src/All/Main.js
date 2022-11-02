import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import AddCategory from "../Screens/AddCategory";
import AddPost from "../Screens/AddPost";
import AddSubCategory from "../Screens/AddSubCategory";
import AllPost from "../Screens/AllPost";
import Dashboard from "../Screens/Dashboard";
import LoginScreen from "../Screens/LoginScreen";
import UpdateScreen from "../Screens/UpdateScreen";

import AddRss from "../Screens/AddRss";
import AddUserScreen from "../Screens/AddUserScreen";
import AllRssScreen from "../Screens/AllRssScreen";
import AllUsersScreen from "../Screens/AllUsersScreen";
import AllCategoryScreen from "../Screens/AllCategoryScreen";
// import PrivateRoutes from "../PrivateRoutes";
import AllMedia from "../Screens/AllMedia";
import UpdateUserScreen from "../Screens/UpdateUserScreen";
import UpdateRssScreen from "../Screens/UpdateRssScreen";
import UpdateCategoryScreen from "../Screens/UpdateCategoryScreen";
import UpdateSubCategoryScreen from "../Screens/UpdateSubCategoryScreen";
import AllSubCategoryScreen from "../Screens/AllSubCategoryScreen";
import AllPostScreenForAuthor from "../Screens/AllPostScreenForAuthor";
import ErrorPage from '../Screens/ErrorPage';
import BackupAndRestore from "../Screens/BackupAndRestore";
import { ProvideAuth, useAuth } from "../hooks/user-auth";
import PrivateRoutes from "../PrivateRoutes";

// /all/sub_category

function Main() {
  
  const auth = useAuth();



  console.log(    console.log(auth?.user));
const [user, setUser]= useState("")
  const userExpiry = localStorage.getItem("userInfoExpiry");
  useEffect(() => {
    setUser(localStorage.getItem("userInfo"))
    if (user) {
      if (userExpiry) {
        if (JSON.parse(userExpiry).time < Date.now()) {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("userInfoExpiry");
        }
      }
    }
  }, [user, userExpiry]);

  return (
    <>
         <ProvideAuth>

  
      <Routes>
          <Route element={<PrivateRoutes />}>
          <>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/database/backup" element={<BackupAndRestore />} />

          <Route path="/admin/addpost" element={<AddPost />} />

          <Route path="/admin/all_media" element={<AllMedia />} />
          <Route path="/admin/addcategory" element={<AddCategory />} />
          <Route path="/admin/addrss" element={<AddRss />} />
          <Route path="/admin/posts" element={<AllPost />} />
          <Route
            path="/admin/update_category/:id"
            element={<UpdateCategoryScreen />}
          />
          <Route path="/admin/updateposts/:id" element={<UpdateScreen />} />

          <Route
            path="/admin/update_users/:id"
            element={<UpdateUserScreen />}
          />

          <Route path="/admin/updaterss/:id" element={<UpdateRssScreen />} />

          <Route path="/admin/sub_category" element={<AddSubCategory />} />
          <Route path="/admin/add_user" element={<AddUserScreen />} />
          <Route path="/admin/all_rss" element={<AllRssScreen />} />

          <Route
            path="/admin/all/sub_category"
            element={<AllSubCategoryScreen />}
          />

          <Route path="/admin/all_users" element={<AllUsersScreen />} />
          <Route
            path="/admin/update_subcategory/:id"
            element={<UpdateSubCategoryScreen />}
          />
          <Route path="/admin/all_category" element={<AllCategoryScreen />} />
          <Route
            path="/admin/author_alll_posts"
            element={<AllPostScreenForAuthor />}
          />
          {/* <Route
            path="*"
            element={<ErrorPage />}
          /> */}
                 <Route element={<Navigate to={'/admin/dashboard'} />} path={'*'} exact />
            </>
            
      </Route>

        <Route path="/admin/login" element={<LoginScreen />} />

   

       

        {/* </Route> */}

        {/* <Route
          path="*"
          element={<Navigate to={user ? '/admin/dashboard' : '/admin'} />}
        /> */}
          
        </Routes>
        </ProvideAuth>
    </>
  );
}

export default Main;
