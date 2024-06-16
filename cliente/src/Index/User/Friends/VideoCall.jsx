import React, {useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {Popup, Button, NavBar} from "antd-mobile";
import {CloseOutline} from "antd-mobile-icons";

let roomId = '005'
const VideoCall = (props) => {
    const [state, setState] = useState({
        wsSocket: null, //实例
        called: false, // 是否是接收方
        caller: false, // 是否是发起方
        calling: false, // 呼叫中
        communicating: false, // 视频通话中
        localVideo: null, // video标签实例，播放本人的视频
        remoteVideo: null, // video标签实例，播放对方的视频
        peer: null,
        localStream: null,
    })
    const callRemote = async () => {
        console.log("发起视频");
        state.caller = true;
        state.calling = true;
        // await getLocalStream()
        // 向信令服务器发送发起请求的事件
        await getLocalStream();
        state.wsSocket.emit("callRemote", roomId);
    }
    const acceptCall = () => {
        console.log("同意视频邀请");
        state.wsSocket.emit("acceptCall", roomId);
    }
    const reset = () => {
        state.called = false;
        state.caller = false;
        state.calling = false;
        state.communicating = false;
        state.peer = null;
        state.localVideo.srcObject = null;
        state.remoteVideo.srcObject = null;
        state.localStream = undefined;
        console.log("挂断结束视频-------");
    }
    const getLocalStream = async () => {
        let obj = {audio: true, video: true};
        const stream = await navigator.mediaDevices.getUserMedia(obj); // 获取音视频流
        state.localVideo.srcObject = stream;
        state.localVideo.play();
        state.localStream = stream;
        return stream;
    }
    useEffect(() => {
        state.localVideo = document.getElementById("localVideo");
        state.remoteVideo = document.getElementById("remoteVideo");

        let sock = io("localhost:8000"); // 对应服务的端口
        // 连接成功
        sock.on("connectionSuccess", (sock) => {
            console.log("连接成功:");
        });
        sock.emit("joinRoom", roomId); // 前端发送加入房间事件

        sock.on("acceptCall", async () => {
            if (state.caller) {
                // 用户A收到用户B同意视频的请求
                state.peer = new RTCPeerConnection();
                // 添加本地音视频流
                state.peer.addStream && state.peer.addStream(state.localStream);

                // 通过监听onicecandidate事件获取candidate信息
                state.peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log("用户A获取candidate信息", event.candidate);
                        // 通过信令服务器发送candidate信息给用户B
                        sock.emit("sendCandidate", {roomId, candidate: event.candidate});
                    }
                };

                // 接下来用户A和用户B就可以进行P2P通信流
                // 监听onaddstream来获取对方的音视频流
                state.peer.onaddstream = (event) => {
                    console.log("用户A收到用户B的stream", event.stream);
                    state.calling = false;
                    state.communicating = true;
                    state.remoteVideo.srcObject = event.stream;
                    state.remoteVideo.play();
                };

                // 生成offer
                let offer = await state.peer.createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1,
                });
                console.log("offer", offer);
                // 设置本地描述的offer
                await state.peer.setLocalDescription(offer);
                // 通过信令服务器将offer发送给用户B
                sock.emit("sendOffer", {offer, roomId});
            }
        });

        // 收到offer
        sock.on("sendOffer", async (offer) => {
            if (state.called) {
                // 接收方 - 用户B
                console.log("收到offer", offer);
                // 创建自己的RTCPeerConnection
                state.peer = new RTCPeerConnection();
                // 添加本地音视频流
                const stream = await state.getLocalStream();
                state.peer.addStream && state.peer.addStream(stream);
                // 通过监听onicecandidate事件获取candidate信息
                state.peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log("用户B获取candidate信息", event.candidate);
                        // 通过信令服务器发送candidate信息给用户A
                        sock.emit("sendCandidate", {roomId, candidate: event.candidate});
                    }
                };

                // 接下来用户A和用户B就可以进行P2P通信流
                // 监听onaddstream来获取对方的音视频流
                state.peer.onaddstream = (event) => {
                    console.log("用户B收到用户A的stream", event.stream);
                    state.calling = false;
                    state.communicating = true;
                    state.remoteVideo.srcObject = event.stream;
                    state.remoteVideo.play();
                };

                // 设置远端描述信息
                await state.peer.setRemoteDescription(offer);
                let answer = await state.peer.createAnswer();
                console.log("用户B生成answer", answer);
                await state.peer.setLocalDescription(answer);
                // 发送answer给信令服务器
                sock.emit("sendAnswer", {answer, roomId});
            }
        });

        // 用户A收到answer
        sock.on("sendAnswer", async (answer) => {
            if (state.caller) {
                // 接收方 - 用户A   判断是否是发送方
                // console.log('用户A收到answer',answer);
                await state.peer.setRemoteDescription(answer);
            }
        });

        // 收到candidate信息
        sock.on("sendCandidate", async (candidate) => {
            console.log("收到candidate信息", candidate);
            // await state.peer.addIceCandidate(candidate) // 用户A和用户B分别收到candidate后，都添加到自己的peer对象上
            // await state.peer.addCandidate(candidate)
            await state.peer.addIceCandidate(candidate);
        });

        // 挂断
        sock.on("hangUp", () => {
            state.reset();
        });

        state.wsSocket = sock;
    }, []);
    const [visible,setVisible] = useState(false)
    return <div>
            <Button
                onClick={() => {
                    setVisible(true)
                }}
            >
                发起通话
            </Button>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                onClose={() => {
                    setVisible(false)
                }}
                bodyStyle={{height: '100vh'}}
                position={'top'}
            >
                <div className={'w-full p-2 h-full bg-gray-400'}>
                    <div>
                        <NavBar back='返回' backArrow={<CloseOutline />} onBack={() => setVisible(false)}>
                            通话
                        </NavBar>
                    </div>
                    <div>

                    </div>
                </div>
            </Popup>
    </div>
};

export default VideoCall;