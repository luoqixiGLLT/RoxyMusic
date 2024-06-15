import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile'
import { useNavigate,Outlet } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

export default function dan() {
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
  const [lists, setLists] = useState([])
  const name = useState(JSON.parse(localStorage.getItem('name')))
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
  }, [name])
  return (
    <div>
      <div>
        {lists.map(item => {
          return <p>{item.name}</p>
        })}
      </div>
    </div>
  )
}
