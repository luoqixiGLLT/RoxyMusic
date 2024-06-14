import React from 'react';
import { RightOutline, MailOutline, AppOutline } from 'antd-mobile-icons'
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
                    <div></div>
                    <div></div>
                </div>
            </div>

        </div>
    );
};

export default User;