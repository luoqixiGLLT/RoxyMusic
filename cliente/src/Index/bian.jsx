import React from 'react'
import { RightOutline, MailOutline, AppOutline, LeftOutline } from 'antd-mobile-icons'
import './bian.css'
import { useNavigate } from 'react-router-dom'
export default function bian() {
   const navigator = useNavigate()
      const onto = ()=>{
          navigator('/zhu')
      }
  return (
    <div className='bian'>
      <div className='bian_box1'>
        <LeftOutline className='bian_left' onClick={onto}></LeftOutline>
        <p className='bian_p1'>编辑个人资料</p>
      </div>
      <div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>头像</p></div>
          <div className='bian_p3'>
            <img src='1.jpeg' className='bian_img'></img>
            <RightOutline className='bian_right' />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>昵称 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>小音波1ETL7CX</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>状态 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>隐身</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>标签 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>请选择标签</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>性别 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>♂</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>简介 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>填写个人简介</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>生日 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>输入生日信息</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>学校 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>输入学校名称</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>地区 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>输入所在地区</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>ID </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>30330569</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>二维码 </p></div>
          <div className='bian_p3'>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
        <div className='bian_box'>
          <div>
            <p className='bian_p2'>背景 </p></div>
          <div className='bian_p3'>
            <p className='bian_p4'>默认背景</p>
            <RightOutline className='bian_right'onClick={()=>{navigator('/zi')}} />
          </div>
        </div>
      </div>
    </div>
  )
}
