import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import BackupIcon from '@mui/icons-material/Backup';
import CategoryIcon from '@mui/icons-material/Category';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ClassIcon from '@mui/icons-material/Class';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Group from '@mui/icons-material/Group';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LoupeIcon from '@mui/icons-material/Loupe';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useAuth } from "../hooks/user-auth";
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function Sidebar() {
  const [admin, setAdmin] = useState();
const auth = useAuth()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    setAdmin(user && user.isAdmin && user.isAdmin);
  }, []);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, []);

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          {auth.user && auth.user.isAdmin === true && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/all_rss">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    All rss <RssFeedIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/addrss">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Add Rss <LoupeIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              <i className="mdi mdi-grid-large menu-icon"></i>
              <span className="menu-title">
                Dashboard <HomeIcon style={{ "margin-left": "10px" }} />
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/addpost">
              <i className="mdi mdi-grid-large menu-icon"></i>
              <span className="menu-title">
                Add post <ControlPointIcon style={{ "margin-left": "10px" }} />
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/posts">
              <i className="mdi mdi-grid-large menu-icon"></i>
              <span className="menu-title">
                All Posts <DynamicFeedIcon style={{ "margin-left": "10px" }} />
              </span>
            </Link>
          </li>

          {auth.user && auth.user.isAdmin === true && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/all_media">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    All Media{" "}
                    <PermMediaIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/add_user">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Add user <GroupAdd style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/site_info">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Site info <GroupAdd style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add_pool">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Add Pool <GroupAdd style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add_user">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Add user <GroupAdd style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/all_users">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    All users <Group style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/current_pool">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Current Pool
                    <CategoryIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/addcategory">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    {" "}
                    Add Category{" "}
                    <AddToPhotosIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/all/sub_category">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    All Sub Category{" "}
                    <ClassIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/database/backup">
                  <i className="mdi mdi-grid-large menu-icon"></i>
                  <span className="menu-title">
                    Backup & restore{" "}
                    <BackupIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/sub_category">
                  <i className="mdi mdi-grid-large menu-icon"></i>

                  <span className="menu-title">
                    Add sub Category{" "}
                    <PlaylistAddIcon style={{ "margin-left": "10px" }} />
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
