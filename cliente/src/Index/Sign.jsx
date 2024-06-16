import React from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'
import "./User.css"
import { useNavigate } from 'react-router-dom';
export default function Sign() {
  let sign = JSON.parse(localStorage.getItem('sign'));
  let navigate = useNavigate()
  const back = () =>{
    navigate("/user/Friends/one")
  }
    
  return (
    <div className='sign_body'>
      <NavBar onBack={back}>{sign.name}</NavBar>
      <img src={`../../../../public/sign/${sign.img}.png`}  className='sign_img'></img>
      <div>
        {sign.text}
      </div>
      <img src={`../../../../public/sign/${sign.imgs}.png`} ></img>
    </div>
  )
}
