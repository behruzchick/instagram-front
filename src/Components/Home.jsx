import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './Home.css'
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import inputEmoji from 'react-input-emoji'
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import Send from '@mui/icons-material/Send';

function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const token = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)
  const [openComment, SetOpenComment] = useState(false)
  const [commentschema, setCommentSchema] = useState([]);
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState([])
  const [emoji, setEmoji] = useState("");
  const [postId, setPostId] = useState("");

  const headers = {
    Authorization: token.token
  };

  const [data, setData] = useState([])

  useEffect(() => {
    const headers = {
      Authorization: token.token
    };
    axios.get("https://instagram-backend-lwh2.onrender.com/auth/me", { headers })
      .then((res) => {
        console.log("Client", res);
        setData(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }, [token])

  useEffect(() => {
    axios.get("https://instagram-backend-lwh2.onrender.com/post", { headers })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        // const likeIds = res.data.map((i) =>  i.like)
        // console.log("likeds",liked);
        setLiked([res.data[1].like])
        // setPostId(postIds)
      }).catch((e) => {
        console.log(e);
      })
  }, [data]);

  const addComment = (id) => {
    try {
      axios
        .post(`https://instagram-backend-lwh2.onrender.com/post/comment/${id}`, {
          comment: comment
        }, { headers })
        .then((res) => {
          alert("Succefful added comment")
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
    } catch (error) {
      console.log(error);
    }
  }


  const toggleComments = (postId) => {
    try {
      axios
        .get(`https://instagram-backend-lwh2.onrender.com/post/comment/${postId}`, { headers })
        .then((data) => {
          console.log("Comments: ", data);
          setCommentSchema(data.data)
          console.log("PostId:", postId);
          setLoading(true)
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          SetOpenComment((prevOpenComments) => ({
            ...prevOpenComments,
            [postId]: !prevOpenComments[postId]
          }));
          setLoading(false)
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get("https://instagram-backend-lwh2.onrender.com/users", { headers })
      .then((res) => {
        console.log("users", res);
        setUsers(res.data)
      }).catch((e) => {
        console.log(e);
      })
  }, [postId])

  // const test = liked.map (i => i[0] === data._id  ?  "true" : "false");
  // console.log("Likeds :", test);x
  // console.log(test.map(i => i === true )) ;

  useEffect(() => { }, [loading])

  const like = (id) => [
    axios
      .post(`https://instagram-backend-lwh2.onrender.com/post/like/${id}`, {}, { headers })
      .then((res) => {
        console.log("liked!", res);
        navigate(`/${token.token}`)
        window.location.reload();
      }).catch((e) => {
        console.log(e);
      })
  ]
  const unLike = (id) => {
    axios
      .post(`https://instagram-backend-lwh2.onrender.com/post/Unlike/${id}`, {}, { headers })
      .then((data) => {
        navigate(`/${token.token}`)
        window.location.reload();
      }).catch((e) => {
        console.log(e);
      })
  }
  const f = (id) => {
    data._id === id ? navigate(`/me/${token.token}`) : navigate(`/user/${id}/${token.token}`)
  }
  const k = (id) => {
    data._id === id ? navigate(`/me/${token.token}`) : navigate(`/user/${id}/${token.token}`)
  }

  const subscribe = (id) => {
    console.log(id);
    axios
      .post(`https://instagram-backend-lwh2.onrender.com/user/subscribe/${id}`, {}, { headers })
      .then((res) => {
        console.log('Subscribed!', res.data);
        window.location.reload();
      }).catch((e) => {
        console.log(e)
      })

  }
  // const Unsubscribe = (id) => {
  //   console.log("id",id);
  //   axios
  //     .post(`https://instagram-backend-lwh2.onrender.com/user/Unsubscribe/${id}`, {}, { headers })
  //     .then((res) => {
  //       console.log('UnSubscribed!', res.data);
  //       window.location.reload();
  //     }).catch((e) => {
  //       console.log(e)
  //     })
  // }


  return (
    <div className='wrappe'>
      <header className='header'>

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
          <span>
            Profile</span>
        </Link>
      </header>
      <main className='post_main'>
        <div className="posts_wrape">
          {
            posts.map((item) => {
              return (
                <div className='post'>
                  <div className="post_block" key={item._id}>
                    <div className='user_info'>
                      <img className='user_img' src={"https://instagram-backend-lwh2.onrender.com" + item.user.avatar} alt="" onClick={() => f(item.user._id)} />
                      <b className="user_name" onClick={() => f(item.user._id)}>
                        {item.user.name}
                      </b>

                      {
                        item.user._id === data._id ? null : item.user.subscribers.find(i => i === data._id) ? null : <button className="g" onClick={() => subscribe(item.user._id)}>Folow</button>
                      }
                    </div>
                    <div className="post_media_wrapper">
                      <img src={"https://instagram-backend-lwh2.onrender.com" + item.img} alt="" />
                    </div>
                    <div className="post_actions">
                      <div className="like_btn">
                        {

                          item.like.find((i) => i === data._id) ? <FavoriteIcon className={item.like.find((i) => i === data._id) ? "liked" : null} onClick={() => unLike(item._id)} /> : <FavoriteBorderIcon className={item.like === data._id ? null : "post_buttons"} onClick={() => like(item._id)} />
                        }
                        <span>{item.like.length} likes</span>
                      </div>
                      <div className="comment_btn">
                        <CommentIcon className='post_buttons' onClick={() => toggleComments(item._id)} />
                      </div>

                    </div>
                    <div className="post_title_wrapper">
                      <b className='title_user_name' onClick={() => k(item.user._id)}>{item.user.name}</b><p>{item.title}</p>
                    </div>
                    <span className='comment_view_span' onClick={() => toggleComments(item._id)}>View all {item.comments.length} comments</span>
                    <div className="input_block">
                      <input type="text" onChange={(e) => setComment(e.target.value)} className='comment_input' placeholder='Add comment...' /> <button className='input_btn'>Pulish</button>
                    </div>
                  </div>
                  {
                    openComment[item._id] && (
                      <div className={openComment === false ? "null_comment" : "comment_block"}>
                        <div className="comment_actions">
                          <div className="comments">
                            {
                              commentschema.map((i, index) => {
                                return (
                                  <div className="user_comment" key={index} onClick={()=> k(item.user._id)}>
                                    <Link to={`/user/${i._id}/${token.token}`} onClick={()=> k(item.user._id)} className="user_info">
                                      <img className="user_img" src={"https://instagram-backend-lwh2.onrender.com" + i.user.avatar} onClick={()=> k(item.user._id)} />
                                      <p className='user_comment_name'>{i.user.name}</p>
                                    </Link>
                                    {
                                      loading === true ? <h4>Loading...</h4> : <b>{i.comment}</b>
                                    }

                                  </div>
                                )
                              })
                            }
                          </div>
                          <form className='comment_form'>
                            <div className="emoji_block">
                            <span className='emoji' onClick={() => setComment("😭")}>😭</span>
                            <span className='emoji' onClick={() => setComment("🤣")}>🤣</span>
                            <span className='emoji' onClick={() => setComment("💀")}>💀</span>
                            <span className='emoji' onClick={() => setComment("😅")}>😅</span>
                            <span className='emoji' onClick={() => setComment("😀")}>😀</span>
                            <span className='emoji' onClick={() => setComment("🤬")}>🤬</span>
                            <span className='emoji' onClick={() => setComment("😱")}>😱</span>
                            <span className='emoji' onClick={() => setComment("🔞")}>🔞</span>
                            <span className='emoji' onClick={() => setComment("💩")}>💩</span>
                            <span className='emoji' onClick={() => setComment("☕")}>☕</span>
                            </div>
                            <div className="form_block">
                              <input type="text" className='comment_input' placeholder='Add comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                              <button className='form_block_btn' onClick={() => addComment(item._id)}>Send</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )
                  }
                </div>


              )
            })
          }

        </div>
      </main>
      <div className="recomended_users_wrape">
        <h3>Recomended for you</h3>
        <div className='users_wrape'>
          {
            users.map((i) => {
              return (
                <>
                  {
                    i.subscribers.length >= 2 && i.name !== data.name ? <div className='recomended_user' onClick={() => k(i._id)}>
                      <img src={"https://instagram-api-hyw5.onrender.com" + i.avatar} alt="user-img" className='user_img' />
                      <b className='recomended_user_name'>{i.name}</b>
                      <button onClick={() => k(i._id)} className='folow_btn'>View profile</button>
                    </div> : null
                  }

                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home