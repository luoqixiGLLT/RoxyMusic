import React from 'react';
import { RightOutline, MailOutline, AppOutline } from 'antd-mobile-icons'
import { Tabs } from 'antd-mobile'
import "./User.css"
import { Outlet, useNavigate } from 'react-router-dom';
const User = () => {
    const nai = useNavigate()
    const onto=()=>{
        nai('/zhu')
    }
    return (
        <div className='User'>
            <div className='User_body'>
                <div className='User_top'>
                    <MailOutline fontSize={28} />
                    <div></div>
                    <AppOutline fontSize={28} />
                </div>
                <div className='User_text'>
                    <div>
                        <img src="../../1.jpeg" alt="" className='User_img'></img>
                        <p className='User_p'>小音波1ETL7CX</p>
                    </div>
                    <div className='User_left' >
                        <RightOutline onClick={onto} />
                    </div>
                </div>
                <div className='User_cente'>
                    <div className='User_cente_one'>会员中心</div>
                    <div>活动中心</div>
                </div>
                <Tabs defaultActiveKey='1' onChange={(e) => {
                    nai(e)
                }}>
                    <Tabs.Tab title='音乐' key='/user/Music'>
                    </Tabs.Tab>
                    <Tabs.Tab title='好友' key='/user/Friends'>
                    </Tabs.Tab>
                    <Tabs.Tab title='密友时刻' key='/user/Brother'>
                    </Tabs.Tab>
                    <Tabs.Tab title='话题' key='/user/Talks'>
                    </Tabs.Tab>
                    <Tabs.Tab title='作者' key='/user/Author'>
                    </Tabs.Tab>
                </Tabs>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default User;