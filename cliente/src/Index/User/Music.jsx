import React from 'react'
import { Swiper, Toast, Popup } from 'antd-mobile'
import "../User.css"
import { useState } from 'react'
import { ClockCircleOutline, PlayOutline } from 'antd-mobile-icons'
import http from '../../http'
import { useEffect } from 'react'
export default function Music() {
    const colors = [
        { type: "img", src: '../首页轮播图/1.png' },
        { type: "img", src: '../首页轮播图/2.png' },
        { type: "img", src: '../首页轮播图/3.png' },
        { type: "img", src: '../首页轮播图/4.png' },
        { type: "video", src: 'https://v3-weba.douyinvod.com/07d6281057145aafb95832b732e61e8d/666bf6a9/video/tos/cn/tos-cn-ve-0026c800/okPFEEh0LAuNb0zpAFQfYhGtINovyThArQAFJA/?a=6383&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=1492&bt=1492&cs=0&ds=3&eid=21760&ft=3PhjVQujppftD7LdZsQ.C_fauVq0Ine.RUtc6BDcOTpqTQdHDD2pewqK0y2-ousZ.&mime_type=video_mp4&qs=0&rc=ZzQ7ZWRkZmc5N2dkNTplM0BpM3J4dDg6Zjx0bjMzNGQzM0BjNWBgYi0yXjUxMGIuLTNeYSMvZnFhcjRnLTFgLS1kLi9zcw%3D%3D&btag=80000e00010000&cquery=100e&dy_q=1718347901&feature_id=1229c61d4e863560fb994c11be849377&l=20240614145141CA303E0A545D17177BFA' },

    ]
    // 弹框
    const [visible1, setVisible1] = useState(false)
    const back = () =>
        Toast.show({
            content: '点击了返回区域',
            duration: 1000,
        })
     // 添加歌单
    const [Musiclist, setMusiclist] = useState('')
    const addmusiclist = async () => {
        let from={
            title:Musiclist,
            info:'',
            cover:'',

        }
        const res = await http.post('add_playlist',Musiclist)
        console.log(res.data);
    }
   
    const items = colors.map((color, index) => (
        <Swiper.Item key={index}>
            <div
                style={{ background: color }}
                onClick={() => {
                    Toast.show(`你点击了卡片 ${index + 1}`)
                }}
            >
                {color.type === 'img' ? (
                    <img src={color.src} alt={`Image ${index + 1}`} style={{ width: '100%', height: '178px' }} />
                ) : (
                    <video controls style={{ width: '100%', height: '178px' }}>
                        <source src={color.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
        </Swiper.Item>
    ))

    return (
        <div>
            <Swiper
                loop
                autoplay
            >
                {items}
            </Swiper>
            <div className='Music_div'>
                <div className='Music_right'>
                    <img src="../5.png" alt=""></img>
                    <div>
                        <p>我喜欢的</p>
                        <p>1</p>
                    </div>
                </div>
                <div className='Music_left'>
                    <div className='Music_left_one'><div><ClockCircleOutline fontSize={32} className='Musice_biao' /><p>最近</p></div><p>28</p></div>
                    <div className='Music_left_two'><div><PlayOutline fontSize={32} className='Musice_biao' />本地</div></div>
                </div>
            </div>
            <div>
                <h1 onClick={() => {
                    setVisible1(true)
                }}>自建歌单</h1>
                <Popup
                    visible={visible1}
                    onMaskClick={() => {
                        setVisible1(false)
                    }}
                    onClose={() => {
                        setVisible1(false)
                    }}
                    bodyStyle={{ height: '40vh' }}
                >
                    <p>
                    <button>取消</button> <span>新建歌单</span> <button onClick={addmusiclist}>完成</button>
                    </p>
                    <input placeholder='请输入歌单名称' value={Musiclist} onChange={(e) => {
                        setMusiclist(e.target.value)
                    }} className='Music_input'></input>
                </Popup>
            </div>
        </div>
    )
}
