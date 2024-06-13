// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {TabBar} from "antd-mobile";
import {PlayOutline, UserOutline} from "antd-mobile-icons";
import {HomeOutlined} from "@ant-design/icons";

const tabs = [
    {
        key: 'home',
        icon: <HomeOutlined/>,
    },
    {
        key: 'play',
        icon: <PlayOutline/>,
    },
    {
        key: 'user',
        icon: <UserOutline/>,
    },
]
const Index = () => {
    const navigate = useNavigate()
    const onChange = val => {
        navigate(`/${val}`)
    }
    return (
        <div className={'w-full h-svh'}>
            <div className={'w-full h-[95%] overflow-auto'}>
                <Outlet/>
            </div>
            <div className={'w-full h-[5%]'}>
                <TabBar onChange={onChange}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon}/>
                    ))}
                </TabBar>
            </div>
        </div>
    );
};

export default Index;