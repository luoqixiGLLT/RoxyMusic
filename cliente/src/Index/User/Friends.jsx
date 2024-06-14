import React from 'react'
import { CapsuleTabs } from 'antd-mobile'
import { Outlet, useNavigate } from 'react-router-dom'
export default function Friends() {
    const nai = useNavigate()
    const times = [
        { key: "/user/Friends/one", title: "关注" },
        { key: "/user/Friends/two", title: "粉丝" },
        { key: "/user/Friends/thre", title: "歌手" },
        { key: "/user/Friends/four", title: "密友" },
    ]
    return (
        <div>
            <div>
                <CapsuleTabs onChange={(e) => {
                    nai(e);
                }}>
                    {
                        times.map(item => {
                            return <CapsuleTabs.Tab title={item.title} key={item.key}>
                            </CapsuleTabs.Tab>
                        })
                    }
                </CapsuleTabs>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
