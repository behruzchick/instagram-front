import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Send from '@mui/icons-material/Send';
import './Me.css'
function Me() {
  const navigate = useNavigate();
  const token = useParams();
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])
  const [name,setName] = useState([])
  const [myPosts,setMyPosts] = useState([])
  const headers = {
    Authorization: token.token
  };
  
  useEffect(() => {

    axios.get("https://instagram-backend-lwh2.onrender.com/auth/me", { headers })
      .then((res) => {
        console.log("data", res);
        setData([res.data]);
        setName(res.data)
      }).catch((e) => {
        console.log(e);
      })
  }, [token])
  // console.log("name",name.name);
  useEffect(() => {
    axios.get("https://instagram-backend-lwh2.onrender.com/post", { headers })
      .then((res) => {
        console.log("Posts", res.data);
        const posts = res.data.map(i => i)
        setPosts(posts);
        const mypost = posts.map((i => i.user.name === name.name) )
        setMyPosts(mypost)
      }).catch((e) => {
        console.log(e);
      })
  }, [name])

  console.log("myPosts" ,myPosts);
  const edit = () => {
    navigate(`/user/edit/${token.token}`)
  }
  const  deleteFn  =(id) => {
    axios
    .post(`https://instagram-backend-lwh2.onrender.com/delete/${id}`,{},{headers})
    .then((res) => {
      console.log("deleted post!" ,res);
      window.location.reload();
    }).catch((e) => {
      console.log(e);
    })
  }
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
              <div className="user">
                <div className="header_user">
                  <div className="header_user_info_avatar">
                    <img src={"https://instagram-backend-lwh2.onrender.com" + item.avatar} alt="" />
                  </div>
                  <div className='info_wrape'>
                    <div className="header_user_info">
                      <div className="header_user_info_name">
                        <b>{item.name}</b>
                        <div className="user_actions">
                          <span className='user_edit_btn' onClick={() => edit()}>Edit profile</span>
                        </div>
                      </div>
                    </div>
                    <div className="header_user_info_subscribers">

                      <b>{
                        item.subscribers.length
                      }</b>
                      <span>Folowers</span>

                      <div className="header_user_info_posts_length">

                        {posts.map((p) => {
                          return (
                            <>
                              <b>
                                {
                                  p.user.name === item.name ? myPosts.length : 0
                                }
                              </b>

                            </>
                          )
                        })}
                        <span>Posts</span>
                      </div>
                    </div>
                    <div className="bio">
                      <p>{item.bio}</p>
                    </div>
                  </div>

                </div>
                <div className="user_posts">
                  {
                    posts.map((i) => {
                      return (
                        <>
                          {
                            i.user.name === item.name ? <div to={`/post/${i._id}`} className="user_post">
                              <DeleteIcon className='delete_icon' onClick={() => deleteFn(i._id)}/>
                              <img src={"https://instagram-backend-lwh2.onrender.com" + i.img} alt="post-img" />
                            </div> : null
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

export default Me