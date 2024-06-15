import React, { useEffect, useState } from 'react'
import http from "../../../http";
import { io } from 'socket.io-client';
import { useProxy } from 'valtio/utils'
import play from '../../../store/play';
import { useNavigate } from 'react-router-dom';
import "../../User.css"
export default function Four() {
    const socket = io('http://localhost:5000');
    socket.on("user_id", (user_id) => {
        play.loginOK(user_id)
        console.log(user_id)
    })
    useEffect(() => {
        // 用户登录时发送用户ID到服务器端
        socket.emit('login', userId);
    }, [])
    let navigate = useNavigate()

    let plays = useProxy(play)
    let user = JSON.parse(localStorage.getItem("user"))
    let [newsData, setnewData] = useState([])
    let userId = JSON.parse(localStorage.getItem("user")).id
    let getData = () => {
        http.get(`/getTalk2`).then(res => {
            setnewData(res.data.data)
            console.log(res)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    let getnew = (id) => {
        let datas = newsData.filter(item => item.senderId == JSON.parse(localStorage.getItem("user")).id && item.senderId2 == id || item.senderId2 == JSON.parse(localStorage.getItem("user")).id && item.senderId == id)
        datas = datas.reverse()
        if (datas.length !== 0) {
            if (datas[0].message) {
                return datas[0].message
            } else {
                return "[消息卡片]"
            }
        } else {
            return "暂无聊天记录"
        }
    }

    return (
        <div>
            <div className='userShow'>
                {
                    plays.user.map(item => {
                        return (
                            <div className='userbigbox' key={item.id} onClick={() => {
                                navigate(`/talk/username=${item.name}`)
                                localStorage.setItem("user2", JSON.stringify(item))
                            }}>
                                <div className='useBox'>
                                    <img src={`../../../../public/img/${item.img}.png`} className='Img'></img>
                                    <div className='ss'>
                                        <p className='titleName'>{item.name}<span className={item.state ? "state1" : "state2"}>{item.state}</span></p>
                                        <p className='titleText'>最新消息：{getnew(item.id)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>

    )
}
