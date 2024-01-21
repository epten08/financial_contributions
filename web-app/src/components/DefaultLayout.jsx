import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axios from "axios";
import axiosClient from "../axios-client.js";


export default function DefaultLayout(){

  const {user,token,setToken,setUser} = useStateContext()

  if (!token) {
    return <Navigate to="login" />
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }

  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
      setUser(data)
    })
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/members">Members</Link>
        <Link to="/contributions">Contributions</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
