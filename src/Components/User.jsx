import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import Send from '@mui/icons-material/Send';
import './User.css'


function User() {
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([]);
  const [client, setClient] = useState([])
  // const [clientId,setClientId] = useState([]);
  const [subscribersId, setSubscribersId] = useState([]);
  const token = useParams();
  const headers = {
    Authorization: token.token
  };
  useEffect(() => {

    axios.get(`https://instagram-backend-lwh2.onrender.com/user/getUser/${token.id}`, { headers })
      .then((res) => {
        console.log("User", res);
        setData([res.data])
        setSubscribersId(res.data.subscribers);
      }).catch((e) => {
        console.log(e);
      })

  }, [token])
  useEffect(() => {

    axios.get("https://instagram-backend-lwh2.onrender.com/auth/me", { headers })
      .then((res) => {
        console.log("Client", res);
        setClient(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }, [])
  // useEffect(() => {} , [data])
  // console.log("SUbs",subscribersId);
  // const clientId = data.filter((i) => i.subscribers);   

  // console.log("yeaaah",clientId.map((i) => i === userId));
  // console.log("clienId",client.map((i) => i._id));



  useEffect(() => {
    axios.get("https://instagram-backend-lwh2.onrender.com/post", { headers })
      .then((res) => {
        // console.log("Posts" ,res.data);
        const posts = res.data.map(i => i)
        setPosts(posts);
      }).catch((e) => {
        console.log(e);
      })
  }, [])
  const subscribe = (id) => {
    axios
      .post(`https://instagram-backend-lwh2.onrender.com/user/subscribe/${id[0]._id}`, {}, { headers })
      .then((res) => {
        console.log('Subscribed!', res.data);
        window.location.reload();
      }).catch((e) => {
        console.log(e)
      })

  }
  // console.log(subscribersId);
  // useEffect(() => {}, [data])
  const Unsubscribe = (id) => {
    // console.log("id",id[0]._id);
    axios
      .post(`https://instagram-backend-lwh2.onrender.com/user/Unsubscribe/${id[0]._id}`, {}, { headers })
      .then((res) => {
        console.log('UnSubscribed!', res.data);
        window.location.reload();
      }).catch((e) => {
        console.log(e)
      })
  }
  // console.log("clientId",client._id);
  // console.log("data",data);
  return (
    <div className='user_wrape'>
      {
        data.map((item) => {
          return (
            <>
              <header className='header header_2'>

                <Link className="logo-container" to={`/${token.token}`}>
                  <img className='logo' src='https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png' />
                </Link>

                <Link to={`/${token.token}`} className='link'>
                  <HomeIcon />
                  <span>Home</span>
                </Link>
                <Link className='link' to={`/user/search/${token.token}`}>
                  <SearchIcon />
                  <span>Search</span>
                </Link>
                <Link className='create_post link' to={`/post/create/${token.token}`}>
                  <AddIcon className='' />
                  <span>Create post</span>
                </Link>
                <Link className="client_block link" to={`/me/${token.token}`}>
                  <PersonIcon />
                  <span>Profile</span>
                </Link>
              </header>
              <div className="user" key={item._id}>
                <div className="header_user">
                  <div className="user_f">
                    <div className="header_user_info_avatar">
                      <img src={"https://instagram-backend-lwh2.onrender.com" + item.avatar} alt="" />
                    </div>
                    <div className="info_wrape">
                      <div className="header_user_info_name">
                        <b>{item.name}</b>
                        <div className="user_actions">
                          {
                            item.subscribers.find(i => i === client._id) ?
                              <button className='folow_btn btn' onClick={() => Unsubscribe(data)}>Unfolow</button>

                              :
                              <button onClick={() => subscribe(data)} className='folow_btn btn'>Folow</button>
                          }
                        </div>
                      </div>
                      <div className="header_user_info_subscribers">
                        <span>Folowers</span>
                        {
                          item.subscribers.length
                        }
                        <div className="header_user_info_posts_length">
                          <span>Posts</span>
                          <b>{posts.map((p) => {
                            return (
                              <>
                                <b>
                                  {
                                    p.user.name === item.name ? posts.length : 0
                                  }
                                </b>

                              </>
                            )
                          })}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user_posts">
                  {
                    posts.map((i, index) => {
                      return (
                        <>
                          {
                            i.user.name === item.name ?
                              <div className="user_post" key={index}>
                                <img src={"https://instagram-backend-lwh2.onrender.com" + i.img} alt="post-img" />
                              </div>
                              : null
                          }
                        </>

                      )
                    })
                  }
                </div>
              </div>
            </>
          )
        })
      }
    </div>
  )
}

export default User