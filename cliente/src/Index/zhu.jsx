import React from 'react'
import { Button } from 'antd-mobile'
import './zhu.css'
import { useNavigate } from 'react-router-dom'
export default function zhu() {
    const navigator = useNavigate()
    const bian = () => {
        navigator('/bian')
    }
    return (
        <div className='zhu'>
            <div className='zhu1'>
                <img src="../../1.jpeg" alt="" className='zhu_img'></img>
                <p className='zhu_p'>小音波1ETL7CX</p>
                <input placeholder='要不写点什么~' className='zhu_input'></input>
            </div>
            <div>
                <p>123</p>
            </div>
            <div className='zhu_box'>
                <div className='zhu_box1'>
                    <p className='zhu_you'>4</p>
                    <p className='zhu_fang'>好友</p>
                </div>
                <div className='zhu_box2'>
                    <p className='zhu_you'>0</p>
                    <p className='zhu_fang'>访客</p>
                </div>
                <div>
                    <Button className='zhu_btn' onClick={bian}>编辑资料</Button>
                </div>
            </div>
            <div className='zhu_div'>
                <div className='zhu_div1'>
                    <div>   <img src="../../img/8.png"></img></div>
                    <div>
                        <h1>喜欢的歌曲</h1>
                        <p>1首</p>
                    </div>
                </div>
                <div className='zhu_div1'>
                    <div>    <img src="../../img/9.png"></img></div>
                    <div>
                        <h1>听歌排行</h1>
                        <p>0首</p>
                    </div>

                </div>
                <div className='zhu_div1'>
                    <div>  <img src="../../img/9.png"></img></div>
                    <div>
                        <h1>音波报告</h1>
                        <p>回顾专属音乐时刻</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
