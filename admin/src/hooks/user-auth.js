import React, { useState, useContext, createContext, useEffect } from "react";
import Axios from "axios";


const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const getUser = async () => {
      try {
        const res = await Axios.get(`/api/user/me`, {
          withCredentials: true,
        });
        if (res.data) {
            setUser(res.data);
        } else {
            setUser(null);
        }
      } catch (error) {
        
      }
    
        setLoadingUser(false);
    }
    useEffect(() => {

        getUser()
    }, [])

    const signin = (username, password, cb) => {
        return Axios({
          method: 'post',
          data: {
            email: username,
            password: password,
          },
          withCredentials: true,
          url: `/user`,
        }).then((res) => {
          if (res.data ) {
        
            Axios.get(`/api/user/me`, {
              withCredentials: true,
            }).then((res) => {
              setUser(res.data);
              cb();
            });
          } else {

          }
        }
        
      ).catch((err) => {
        console.log(err);
      });;
   
    };

    // const signout = cb => {
    //     Axios.get(`${process.env.REACT_APP_API_DATA}/user/logout`, {
    //       withCredentials: true,
    //     }).then((res) => {
    //       if (res.data === 'success') {
    //         setUser(null);
    //         cb();
    //       }
    //     });
    // };

    return {
        user,
        loadingUser,
        signin,
        // signout
    };
}