import React from 'react';
import './home.css'
import { Tabs } from 'antd-mobile'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='home-container'>
            <div className='home-top'>
                <input placeholder=' 搜索你想听的歌曲' onFocus={()=>{navigate('/search')}} className='home-inp'></input>
                <img src='../2.png' className='home-img' onClick={()=>{navigate('/play')}}></img>
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Tabs defaultActiveKey='/home/tui' onChange={(e) => {
                    navigate(e)
                }} style={{borderColor:'black',width:'100%'}}>
                    <Tabs.Tab title='推荐' key='/home/tui'>
                    </Tabs.Tab>
                    <Tabs.Tab title='歌单' key='/home/dan'>
                    </Tabs.Tab>
                    <Tabs.Tab title='流行' key='/home/liu'>
                    </Tabs.Tab>
                    <Tabs.Tab title='网红' key='/home/hong'>
                    </Tabs.Tab>
                    
            </Tabs>
            {/* <img src='../3.png' style={{width:'10%',height:'10%'}} onClick={()=>{navigate('/fenlei')}}></img> */}
            </div>
            
            <Outlet></Outlet>
            
        </div>
    );
};

export default Home;