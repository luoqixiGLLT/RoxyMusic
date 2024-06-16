import React, { useEffect, useRef, useState } from 'react'
import "../../User.css"
import { useNavigate, useParams } from "react-router-dom"
import { Card } from '@nutui/nutui-react'
import { io } from 'socket.io-client';
import http from "../../../http";
import anime from "animejs"
import { UnorderedListOutline, AddCircleOutline, EnvironmentOutline, FolderOutline, PhoneFill } from 'antd-mobile-icons'
import { Button, Popup } from 'antd-mobile'
import { Input, message } from 'antd';
const socket = io('http://localhost:5000');
export default function Talk() {
    //要发送的消息
    let [content, setContent] = useState("")
    //聊天记录
    //登录后的ID
    let [user_id, setUser_id] = useState("")
    let [talk, setTalk] = useState([]);
    let [username, setUsername] = useState({})
    let [username2, setUsername2] = useState({})
    let [isShow, setShow] = useState(false)
    let [fz, setfz] = useState([])
    const [visible1, setVisible1] = useState(false)
    let navigate = useNavigate()
    let refTalk = useRef(null)
    if (refTalk.current) {
        let count = refTalk.current.scrollHeight
        refTalk.current.scrollTop = count
    }

    let userId = JSON.parse(localStorage.getItem("user")).id
    let recipientId = JSON.parse(localStorage.getItem("user2")).id

    useEffect(() => {
        setuser()
        getData()
        fzData()

        // 监听私聊消息
        socket.on('private_message', (data) => {
            getData()
        });
        // 错误处理
        socket.on('error', (errorMessage) => {
            console.error(errorMessage);
        });
        return () => {
            // 清理Socket.IO监听器
            socket.off('private_message');
            socket.off('error');
        };
    }, [userId]);

    let addMassage = async (product = null) => {
        let data = {
            senderId: JSON.parse(localStorage.getItem("user")).id,
            message: content,
            senderId2: JSON.parse(localStorage.getItem("user2")).id,
            product: product
        }
        //将数据发送给后端
        socket.emit('private_message', data);
        //将数据添加的到数据库
        http.post("addNews", data)
        setContent("")

    }


    let getData = () => {
        http.get(`getTalk/?user1=${JSON.parse(localStorage.getItem("user")).id}&user2=${JSON.parse(localStorage.getItem("user2")).id}`).then(res => {
            setTalk(res.data.data)
            console.log(res)
        })
    }
    let fzData = () => {
        http.get(`getFz`).then(res => {
            setfz(res.data.data)
        })
    }
    let setuser = async () => {
        await setUsername(JSON.parse(localStorage.getItem("user")))
        await setUsername2(JSON.parse(localStorage.getItem("user2")))
    }



    useEffect(() => {
        let count = refTalk.current.scrollHeight
        refTalk.current.scrollTop = count
    }, [talk])

    useEffect(() => {
        // const animation = anime({
        //     targets: '.rightUser',
        //     scale: [
        //         { value: .1, easing: 'easeOutSine', duration: 500 },
        //         { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        //     ],
        //     delay: anime.stagger(200, { grid: [14, 5], from: 'center' })
        // });
        // const animation2 = anime({
        //     targets: '.leftUser',
        //     scale: [
        //         { value: .1, easing: 'easeOutSine', duration: 500 },
        //         { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        //     ],
        //     delay: anime.stagger(200, { grid: [14, 5], from: 'center' })

        // });
    }, [fz])
    return (
        <div className='bgTalk'>
            <div className='Talktop'>
                <p className='Talkback' onClick={() => { navigate(-1) }}>返回</p>
                <p>{username2.name}</p>
            </div>
            <div className={!isShow ? 'wlBox' : 'wlBox2'} ref={refTalk}>
                {
                    talk.map((item, index) => {
                        if (item.senderId === userId) {
                            return <div key={index} className='rightUser'>
                                {item.message ? <div className='rightContent'>
                                    <p>{item.message}</p>
                                </div> : ""}
                                {item.product ? <div className="cards"><Card
                                    style={{ background: "white", padding: "10px", boxSizing: "content-box" }}
                                    src={item.product.src}
                                    title={item.product.title}
                                    price={item.product.price}
                                    vipPrice={item.product.vipPrice}
                                    shopDescription={item.product.shopDescription}
                                    delivery={item.product.delivery}
                                    shopName={item.product.shopName}
                                /></div>
                                    : ""}
                                <div className='rightImg'>
                                    <img className='rightImg' src={`/img/${username.img}.png`}></img>
                                </div>
                            </div>
                        } else {
                            return <div key={index} className='leftUser'>

                                <div className='leftImg'>
                                    <img className='leftImg' src={`/img/${username2.img}.png`}></img>
                                </div>
                                {item.message ? <div className='leftContent'>
                                    {/* <h3>{username2.name}<span className='Usertiem'>{dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")}</span></h3> */}
                                    <p>{item.message}</p>
                                </div> : ""}
                                {item.product ? <div className="cards2"><Card
                                    style={{ background: "white", padding: "10px", boxSizing: "content-box" }}
                                    src={item.product.src}
                                    title={item.product.title}
                                    price={item.product.price}
                                    vipPrice={item.product.vipPrice}
                                    shopDescription={item.product.shopDescription}
                                    delivery={item.product.delivery}
                                    shopName={item.product.shopName}
                                /></div>
                                    : ""}
                            </div>
                        }
                    })
                }
            </div>
            <div className={isShow ? 'masageADD masageADD2' : "masageADD"}>
                <div className='flexBtn'>
                    <span onClick={() => {
                        setShow(!isShow)
                        getData()

                    }}><AddCircleOutline fontSize={24} /></span>
                    <Input className='inputs' placeholder="开始发送消息~~" value={content} onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            addMassage()
                        }
                    }} onChange={(e) => { setContent(e.target.value) }} />
                    <Button  color='warning' size="small" onClick={() => { addMassage() }}>发送</Button>
                </div>
                <div>
                    <ul className='ul'>
                        <li className="li" onClick={() => { setVisible1(true) }}><p><UnorderedListOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><FolderOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><EnvironmentOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><PhoneFill style={{ marginTop: "10px" }} fontSize={28} />
                        </p></li>
                    </ul>
                </div>
                <Popup
                    visible={visible1}
                    onMaskClick={() => {
                        setVisible1(false)
                    }}
                    bodyStyle={{
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        minHeight: '40vh',
                    }}
                >
                    <div className="product">
                        {

                            fz.map((state, index) => {
                                return <div key={index} onClick={() => {
                                    addMassage(state._id)

                                    setShow(false)
                                    setVisible1(false)
                                }}>
                                    <Card
                                        className="card"
                                        src={state.src}
                                        title={state.title}
                                        price={state.price}
                                        vipPrice={state.vipPrice}
                                        shopDescription={state.shopDescription}
                                        delivery={state.delivery}
                                        shopName={state.shopName}
                                    />
                                </div>
                            })
                        }

                    </div>
                </Popup>
            </div>
        </div>
    )
}
