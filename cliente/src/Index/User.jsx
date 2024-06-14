import React from 'react';
import { RightOutline, MailOutline, AppOutline } from 'antd-mobile-icons'
import { Tabs } from 'antd-mobile'
import "./User.css"
const User = () => {
    return (
        <div>
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
                        <RightOutline />
                    </div>
                </div>
                <div className='User_cente'>
                    <div className='User_cente_one'>会员中心</div>
                    <div>活动中心</div>
                </div>
                <Tabs defaultActiveKey='1'>
                    <Tabs.Tab title='音乐' key='1'>

                    </Tabs.Tab>
                    <Tabs.Tab title='好友' key='2'>
                        2
                    </Tabs.Tab>
                    <Tabs.Tab title='密友时刻' key='3'>
                        3
                    </Tabs.Tab>
                    <Tabs.Tab title='话题' key='4'>
                        4
                    </Tabs.Tab>
                    <Tabs.Tab title='作者' key='5'>
                        5
                    </Tabs.Tab>
                    <Tabs.Tab title='喜欢' key='6'>
                        6
                    </Tabs.Tab>
                    <Tabs.Tab title='动态' key='7'>
                        7
                    </Tabs.Tab>
                </Tabs>
            </div>

        </div>
    );
};

export default User;