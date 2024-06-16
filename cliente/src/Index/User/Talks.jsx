import React from 'react'
import { Empty } from 'antd-mobile'
export default function Talks() {
  return (
    <div><Empty
      style={{ padding: '64px 0' }}
      imageStyle={{ width: 128 }}
      description='暂无数据'
    /></div>
  )
}
