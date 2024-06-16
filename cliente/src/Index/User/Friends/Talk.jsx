import React, { useEffect, useRef, useState } from 'react'
import "../../User.css"
import { io, Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom"
import http from "../../../http";
import anime from "animejs"
import { UnorderedListOutline, AddCircleOutline, EnvironmentOutline, FolderOutline, PhoneFill } from 'antd-mobile-icons'
import { Button, Popup, NavBar } from 'antd-mobile'
import { Input, message } from 'antd';
import { CloseOutline } from "antd-mobile-icons";
let roomId = '005'
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

    let [wsSocket, setSock] = useState(null);
    let [called, setCalled] = useState(false);
    let [caller, setCaller] = useState(false);
    let [calling, setCalling] = useState(false);
    let [Communicating, setCommunicating] = useState(false);
    let localVideoRef = useRef(null);
    let remoteVideoRef = useRef(null);
    let [peer, setPeer] = useState(null);
    let [RemoteVideo, setRemoteVideo] = useState(null);
    let [localStream, setLocalStream] = useState(null);
    let roomId = "005";
    const callRemote = async () => {
        console.log("发起视频");
        setCaller(true);
        setCalling(true);
        await getLocalStream();
        wsSocket.emit("callRemote", roomId);
    };
    const acceptCall = () => {
        // 用户B收到用户A的请求
        setCaller(true)
        console.log("同意视频邀请");
        wsSocket.emit("acceptCall", roomId);

    };

    const hangUp = () => {
        wsSocket.emit("hangUp", roomId);
        reset();
    };

    const reset = () => {
        setCalled(false);
        setCaller(false);
        setCalling(false);
        setCommunicating(false);
        setPeer(null);
        localVideoRef.current.srcObject = null;
        remoteVideoRef.current.srcObject = null;
        setLocalStream(null);
        console.log("挂断结束视频-------");
    };

    const getLocalStream = async () => {
        let obj = { audio: true, video: true };
        const stream = await navigator.mediaDevices.getUserMedia(obj);
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
        setLocalStream(stream);
        return stream;
    };

    useEffect(() => {
        const initializeSocket = () => {
            const socket = io("http://localhost:3000"); // 对应服务的端口
            setSock(socket);
            console.log(socket);
            socket.on("connectionSuccess", () => {
                console.log("连接成功:");
            });
            socket.emit("joinRoom", roomId); // 前端发送加入房间事件
            socket.on("callRemote", () => {
                if (!caller) {
                    setCalled(true); // 接听方
                    setCalling(true); // 视频通话中
                }
            });
            socket.on("acceptCall", async () => {
                if (caller) {
                    // 用户A收到用户B同意视频的请求
                    peer = new RTCPeerConnection()
                    console.log(localStream);
                    console.log(typeof localStream);
                    // 添加本地音视频流
                    if (peer.addStream) {
                        peer.addStream(localStream);
                    } else {
                        console.error('RTCPeerConnection does not support addStream method.');
                    }
                    peer.onicecandidate = (event) => {
                        if (event.candidate) {
                            console.log("用户A获取candidate信息", event.candidate);
                            socket.emit("sendCandidate", { roomId, candidate: event.candidate });
                        }
                    };
                    peer.onaddstream = (event) => {
                        console.log("用户A收到用户B的stream", event.stream);
                        setCalling(false);
                        setCommunicating(true);
                        setRemoteVideo(event.stream);
                    };
                    const offer = await peer.createOffer({
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1,
                    });
                    console.log("offer", offer);
                    await peer.setLocalDescription(offer);
                    socket.emit("sendOffer", { offer, roomId });
                }
            });

            // 收到offer
            socket.on("sendOffer", async (offer) => {
                if (called) {
                    console.log("收到offer", offer);
                    const peer = new RTCPeerConnection();
                    const stream = await getLocalStream();
                    peer.addStream && peer.addStream(stream);
                    peer.onicecandidate = (event) => {
                        if (event.candidate) {
                            console.log("用户B获取candidate信息", event.candidate);
                            socket.emit("sendCandidate", { roomId, candidate: event.candidate });
                        }
                    };
                    peer.onaddstream = (event) => {
                        console.log("用户B收到用户A的stream", event.stream);
                        setCalling(false);
                        setCommunicating(true);
                        setRemoteVideo(event.stream);
                    };
                    await peer.setRemoteDescription(offer);
                    const answer = await peer.createAnswer();
                    console.log("用户B生成answer", answer);
                    await peer.setLocalDescription(answer);
                    socket.emit("sendAnswer", { answer, roomId });
                }
            });
            // 用户A收到answer
            socket.on("sendAnswer", async (answer) => {
                if (caller) {
                    await peer.setRemoteDescription(answer);
                }
            });
            // 收到candidate信息
            socket.on("sendCandidate", async (candidate) => {
                console.log("收到candidate信息", candidate);
                await peer.addIceCandidate(candidate);
            });
            // 挂断
            socket.on("hangUp", () => {
                reset();
            });
        };

        initializeSocket();


    }, [caller]);
    const [visible, setVisible] = useState(false)
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
                    <Button color='warning' size="small" onClick={() => { addMassage() }}>发送</Button>
                </div>
                <div>
                    <ul className='ul'>
                        <li className="li" onClick={() => { setVisible1(true) }}><p><UnorderedListOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><FolderOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><EnvironmentOutline style={{ marginTop: "10px" }} fontSize={28} /></p></li>
                        <li className="li"><p><PhoneFill style={{ marginTop: "10px" }} onClick={() => {
                            setVisible(true)
                        }} fontSize={28} />
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
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                onClose={() => {
                    setVisible(false)
                }}
                bodyStyle={{ height: '100vh' }}
                position={'top'}
            >
                <div>
                    <NavBar back='返回' backArrow={<CloseOutline />} onBack={() => setVisible(false)}>
                        通话
                    </NavBar>
                </div>
                <div className="flex items-center flex-col text-center p-12 h-screen">
                    <div className="relative h-full mb-4 fBox">
                        <video
                            id="localVideo"
                            ref={localVideoRef}
                            className="w-96 h-full bg-gray-200 mb-4 object-cover"
                            autoPlay
                            muted
                        ></video>
                        <video
                            id="remoteVideo"
                            ref={remoteVideoRef}
                            className="w-32 h-48 absolute bottom-0 right-0 object-cover"
                            autoPlay
                        ></video>
                        {caller && calling && (
                            <div className="absolute top-2/3 left-36 flex flex-col items-center">
                                <p className="mb-4 text-white">等待对方接听...</p>
                                <img
                                    onClick={hangUp}
                                    src="../1.png"
                                    className="w-16 cursor-pointer"
                                    alt=""
                                />
                            </div>
                        )}
                        {called && calling && (
                            <div className="absolute top-2/3 left-32 flex flex-col items-center">
                                <p className="mb-4 text-white">收到视频邀请...</p>
                                <div className="flex">
                                    <img
                                        onClick={hangUp}
                                        src="../../../1.png"
                                        className="w-16 cursor-pointer mr-4"
                                        alt=""
                                    />
                                    <img
                                        onClick={acceptCall}
                                        src="../../../2.png"
                                        className="w-16 cursor-pointer"
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={callRemote} style={{ marginRight: '10px' }}>
                            发起视频
                        </button>
                        <button onClick={hangUp} style={{ marginLeft: '10px' }}>
                            挂断视频
                        </button>
                    </div>
                </div>
            </Popup >
        </div >
    )
}
