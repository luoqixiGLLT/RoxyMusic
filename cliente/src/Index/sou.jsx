import React, { useState, useEffect } from 'react'
import './sou.css'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
export default function sou() {
   const navigator = useNavigate()
      const onto = ()=>{
          navigator('/home')
      }
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
  const [name, setName] = useState(JSON.parse(localStorage.getItem('name')))
  const en = (e) => {
    if (e.keyCode === 13) {
      setName('')
      localStorage.setItem('name', JSON.stringify(name))
      getlists()
    }

  }
  const [lists, setLists] = useState([])
  const getlists = () => {
    let arr = [...lists]
    let names = localStorage.getItem('name')
    let namess = JSON.parse(names)
    list.forEach(item => {
      if (item.name.includes(namess)) {
        arr.splice(0, 1, item)
      }
    })
    setLists(arr)
  }
  useEffect(() => {
    getlists()
  }, [])
  return (
    <div className='Sou_box'>
      <div className='Search_box2'>
        <div className='Search_box1'>
          <SearchOutlined className='Search_sou' /><input placeholder='若月亮没来' value={name} onChange={(e) => { setName(e.target.value) }} onKeyDown={en} className='Search_input'></input>
        </div>
        <button className='Search_but' onClick={onto}>取消</button>
      </div>
      <div>
        {lists.map(item => {
          return <p>{item.name}</p>
        })}
      </div>
    </div>
  )
}
