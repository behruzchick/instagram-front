import React, { useEffect, useState } from 'react'
import './Search.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
function Search() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("")
    const [data,setData] = useState([]);
    const token = useParams()
    const navigate = useNavigate();
    const headers = {
        Authorization: token.token
    };
    useEffect(() => {
        axios.get("https://instagram-backend-lwh2.onrender.com/auth/me", { headers })
        .then((res) => {
          console.log("Client", res);
          setData(res.data);
        }).catch((e) => {
          console.log(e);
        })

    } , [])
    useEffect(() => {
        axios.get("https://instagram-backend-lwh2.onrender.com/users", { headers })
            .then((res) => {
                console.log(res.data);
                setUsers(res.data)
            }).catch((e) => {
                console.log(e);
            })
    }, [token])
    const k = (id) => {
        data._id === id ? navigate(`/me/${token.token}`) : navigate(`/user/${id}/${token.token}`)
    }
    return (
        <div className='wrape_search'>
            <header className='header'>

                <Link className="logo-container link" to={`/${token.token}`}>
                    <img className='logo' src='https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png' />
                </Link>

                <Link to={`/${token.token}`} className='link home_link'>
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
            <div className='search_wrape'>
                <div className="search_bar">
                    <input type="search" className='search_input' placeholder='Search' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="users_block">
                    {
                        users.filter((item) => {
                            return name.toLowerCase() === '' ? null : item.name.includes(name);
                        }).map((i) => {
                            return (
                                <>
                                    <div className='user_block' onClick={() => k(i._id)}>
                                        <img src={"https://instagram-backend-lwh2.onrender.com" + i.avatar} alt="" />
                                        <b>{i.name}</b>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div >
        </div>
    )
}

export default Search