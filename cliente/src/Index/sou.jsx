import React, { useState, useEffect } from 'react'
import './sou.css'
import { Tabs } from 'antd-mobile'
import { useNavigate,Outlet } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
export default function sou() {
  const navigator = useNavigate()
  const onto = () => {
    navigator('/home')
  }
  const [name, setName] = useState(JSON.parse(localStorage.getItem('name')))
  const en = (e) => {
    if (e.keyCode === 13) {
      setName('')
      localStorage.setItem('name', JSON.stringify(name))
    }
  }
  const onsou=()=>{
    navigator('/search')
  }
  return (
    <div className='Sou_box'>
      <div className='Search_box2'>
        <div className='Search_box1'>
          <SearchOutlined className='Search_sou' /><input placeholder='若月亮没来' value={name} onChange={(e) => { setName(e.target.value) }} onClick={onsou} onKeyDown={en} className='Search_input'></input>
        </div>
        <button className='Search_but' onClick={onto}>取消</button>
      </div>
      <div>
        <Tabs defaultActiveKey='1' onChange={(e) => {
          navigator(e)
        }}>
          <Tabs.Tab title='综合' key='/sou/zong'>
          </Tabs.Tab>
          <Tabs.Tab title='单曲' key='/sou/dan'>
          </Tabs.Tab>
          <Tabs.Tab title='歌单' key='/sou/arr'>
          </Tabs.Tab>
          <Tabs.Tab title='歌手' key='/sou/shou'>
          </Tabs.Tab>
        </Tabs>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
