import React from 'react';
import { RightOutline, MailOutline, AppOutline } from 'antd-mobile-icons'
import { Tabs } from 'antd-mobile'
import { Carousel } from 'antd';
import "./User.css"
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const User = () => {
    return (
        <div className='User_one'>
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
                    <span className='User_cente_two'>|</span>
                    <div>活动中心</div>
                </div>
                <Tabs defaultActiveKey='1' className='tab'>
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
            <div>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>

        </div>
    );
};

export default User;