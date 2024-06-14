import React from 'react';
import './home.css'
import { Button, SearchBar, Space, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home-container'>
            <div className='home-top'>
                <input placeholder=' 搜索你想听的歌曲' onFocus={()=>{navigate('/search')}} className='home-inp'></input>
                <img src='./2.png' className='home-img'></img>
            </div>
            
        </div>
    );
};

export default Home;