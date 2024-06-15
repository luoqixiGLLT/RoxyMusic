import React from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { useState } from 'react'


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
  const [pai] = useState([
    {
      title: '热歌榜',
      children: [
        { name: '1', song: '如果爱忘了(Live)' }, { name: '2', song: '晴天' }, { name: '3', song: '搁浅' }
      ]
    },
    {
      title: '欧美热歌榜',
      children: [
        { name: '1', song: 'Whataya Want From Me' }, { name: '2', song: 'Rend Moon' }, { name: '3', song: 'LOVELY BY YOU' }
      ]
    },
    {
      title: '韩国热歌榜',
      children: [
        { name: '1', song: 'Armageddon' }, { name: '2', song: 'Supernova' }, { name: '3', song: 'SHEESH' }
      ]
    },
    {
      title: '日本热歌榜',
      children: [
        { name: '1', song: 'Dear John' }, { name: '2', song: 'Say Something' }, { name: '3', song: 'LOVE' }
      ]
    }
  ])
  const [ge] = useState([
    {
      name: 'SeneaRin',
      img: '../../首页/2.png'
    },
    {
      name: '小林未郁',
      img: '../../首页/3.png'
    },
    {
      name: 'EGQIST',
      img: '../../首页/4.png'
    },
    {
      name: 'Aim',
      img: '../../首页/5.png'
    },
    {
      name: '周杰伦',
      img: '../../首页/6.png'
    },
  ])
  return (
    <div>
      <Swiper
        loop
        autoplay
      >
        {items}
      </Swiper>
      <p style={{ fontSize: '28px', marginLeft: '5%', marginTop: '5%' }}>排行榜</p>
      <div className="scroll-container">
        <div className="scroll-content">
          {
            pai.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '25px', marginLeft: '10%', marginTop: '10%', fontWeight: 'bold' }}>{item.title} > </p>
                    <img src='../../首页/1.png' style={{ borderRadius: '50%', width: '60px', marginTop: '8%', marginRight: '5%' }}></img>
                  </div>
                  <div style={{ marginLeft: '10%' }} className='pai'>
                    {item.children.map((i, index) => {
                      return (
                        <p key={index}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'oblique' }}>{i.name} </span>
                          <span> {i.song}</span>
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })
          }


          {/* <!-- 添加更多项目 --> */}
        </div>
      </div>
      <p style={{ fontSize: '28px', marginLeft: '5%', marginTop: '5%' }}>歌手</p>

      <div className="scroll-container">
        <div className="scroll-content">
          {
            ge.map((item, index) => {
              return (
                <div className="items" key={index}>
                  <img src={item.img} style={{ borderRadius: '50%', width: '70px', marginTop: '18%', marginLeft: '16%' }}></img>
                  <p style={{ marginLeft: '23%', marginTop: '5%' }}>{item.name}</p>
                  <div className='but'>+</div>
                </div>
              )
            })}
          {/* <!-- 添加更多项目 --> */ }
        </div>
      </div>
    </div>
  )
}
