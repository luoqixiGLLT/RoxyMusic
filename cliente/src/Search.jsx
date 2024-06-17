import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { DeleteOutline, RedoOutline } from 'antd-mobile-icons'
export default function Search() {
  const list = [
    { name: '若月亮还没来', new: 0, hot: 1 },
    { name: '如果爱忘了', new: 0, hot: 0 },
    { name: '承诺', new: 0, hot: 0 },
    { name: '原来', new: 0, hot: 1 },
    { name: '人间半途', new: 1, hot: 0 },
    { name: '冬眠', new: 0, hot: 0 },
    { name: 'aespa', new: 0, hot: 0 },
    { name: '暮色回响', new: 0, hot: 0 },
    { name: '表白', new: 0, hot: 0 },
  ]
  const navigator = useNavigate()
  const onto = () => {
    navigator('/home')
  }
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')))
  const [name, setName] = useState('')
  const en = (e) => {
    if (e.keyCode === 13) {
      setName('')
      let historys = [...history]
      historys.push(name)
      setHistory(historys)
      localStorage.setItem('history', JSON.stringify(historys))
      navigator('/sou')
      localStorage.setItem('name', JSON.stringify(name))
      console.log(historys);
    }

  }
  const his = (item) => {
    localStorage.setItem('name', JSON.stringify(item))
    navigator('/sou/dan')
  }
  return (
    <div className="search">
      <div className='Search_box'>
        <div className='Search_box2'>
          <div className='Search_box1'>
            <SearchOutlined className='Search_sou' /><input placeholder='若月亮没来' value={name} onChange={(e) => { setName(e.target.value) }} onKeyDown={en} className='Search_input'></input>
          </div>
          <button className='Search_but' onClick={onto}>取消</button>
        </div>
        <div className='Search_box4'>
          <div className='Search_box4_1'>
            <img src='./6.png' className='Search_img'></img>
            <p className='Search_p1'>歌手</p>
          </div>
          <div className='Search_box4_1'>
            <img src='./7.png' className='Search_img'></img>
            <p className='Search_p1'>识曲</p>
          </div>
          <div className='Search_box4_1'>
            <img src='./8.png' className='Search_img'></img>
            <p className='Search_p1'>曲风</p>
          </div>
        </div>
        <div className='Search_box5'>
          <div className='Search_box5_1'>
            <p className='Search_box5_p'>历史记录</p>
            <DeleteOutline className='Search_del' />
          </div>
          <div>
            {history.map(item => {
              return <button onClick={() => { his(item) }} className='Search_box5_but'>{item}</button>
            })}
          </div>
        </div>
        <div className='Search_box5'>
          <div className='Search_box5_1'>
            <p className='Search_box5_p'>大家都在搜</p>
            <RedoOutline className='Search_del' />
          </div>
          <div className='Search_box5_2'>
            {list.map(item => {
              return <div className='Search_box5_3'>
                <button className='Search_box5_but' onClick={() => { his(item.name) }}>{item.hot === 1 ? '🔥' : ''}{item.new === 1 ? '🆕' : ''} {item.name}</button>
              </div>

            })}
          </div>
        </div>
      </div>
    </div>
  )
}
