import React from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'


const colors = ['../首页轮播图/1.png', '../首页轮播图/2.png', '../首页轮播图/3.png', '../首页轮播图/4.png']
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className='content'
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      <img src={color}></img>
      {/* {color} */}
    </div>
  </Swiper.Item>
))
export default function Tui() {
  return (
    <div>
      <Swiper
          loop
          autoplay
        >
          {items}
        </Swiper>
    </div>
  )
}
