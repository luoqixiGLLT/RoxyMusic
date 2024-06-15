
import React, { useEffect, useState } from 'react'
import http from "../../../http";
import { io } from 'socket.io-client';
import { useProxy } from 'valtio/utils'
import play from '../../../store/play';
import { useNavigate } from 'react-router-dom';
import "../../User.css"
export default function One() {
  let plays = useProxy(play)
  const navigate=useNavigate()
  return (
    <div>
      <div className='userShow'>
        {
          plays.sing.map(item => {
            return (
              <div className='userbigbox' key={item.id} onClick={()=>{
                navigate(`/sign/username=${item.name}`)
                localStorage.setItem("sign", JSON.stringify(item))
              }}>
                <div className='useBox'>
                  <img src={`../../../../public/sign/${item.img}.png`} className='Img'></img>
                  <div className='ss'>
                    <p>{item.name}</p>
                  </div>
                  <button className='userbnt'>已关注</button>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
