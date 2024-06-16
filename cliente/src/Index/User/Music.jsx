import React from 'react'
import { Swiper, Toast } from 'antd-mobile'
import "../User.css"
import { ClockCircleOutline, PlayOutline } from 'antd-mobile-icons'
export default function Music() {
    const colors = [
        { type: "img", src: '../首页轮播图/1.png' },
        { type: "video", src: '../首页轮播图/下载.mp4' },
        { type: "img", src: '../首页轮播图/3.png' },
        { type: "img", src: '../首页轮播图/4.png' },
        { type: "video", src: '../首页轮播图/下载.mp4' },

    ]
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
                onIndexChange={i => {
                    console.log(i, 'onIndexChange1')
                }}
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
                <h1>自建歌单</h1>
            </div>
        </div>
    )
}
