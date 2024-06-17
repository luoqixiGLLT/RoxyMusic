import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile'
import { useNavigate,Outlet } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

export default function dan() {
  const list = [
    { name: '若月亮还没来', new: 0, hot: 1, a: '张三' },
    { name: '月亮之上', new: 0, hot: 1, a: '张三' },
    { name: '如果爱忘了', new: 0, hot: 0, a: '李四' },
    { name: '承诺', new: 0, hot: 0, a: '王五' },
    { name: '原来', new: 0, hot: 1, a: '赵六' },
    { name: '人间半途', new: 1, hot: 0, a: '张三' },
    { name: '冬眠', new: 0, hot: 0, a: '张三' },
    { name: 'aespa', new: 0, hot: 0, a: '张三' },
    { name: '暮色回响', new: 0, hot: 0, a: '张三' },
    { name: '表白', new: 0, hot: 0, a: '张三' },
  ]
  const [lists, setLists] = useState([])
  const name = useState(JSON.parse(localStorage.getItem('name')))
  const getlists = () => {
    let arr = [...lists]
    let names = localStorage.getItem('name')
    let namess = JSON.parse(names)
    list.forEach(item => {
      if (item.name.includes(namess)) {
        arr.push(item)
      }
    })
    setLists(arr)
  }
  useEffect(() => {
    getlists()
  }, [])
  return (
    <div>
      <div>
        {lists.map(item => {
          return<div className='dan_box'>
          <p className='dan_name'>{item.name}</p>
          <p className='dan_a'>{item.a}</p>
          <button className='dan_but'>播放</button>
      </div>
        })}
      </div>
    </div>
  )
}
