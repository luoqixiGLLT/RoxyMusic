import React from 'react'
export default function Dan() {
  return (
    <div>
      <p style={{ fontSize: '24px', marginLeft: '5%', marginTop: '5%' }}>最热歌单</p>

      <div className="scroll-container">
        <div className="scroll-content">
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单2.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>属于Z世代的T-POP</p>
          </div>
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单1.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>波点音乐XCU8E</p>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '24px', marginLeft: '5%', marginTop: '5%' }}>流行歌单</p>
    </div>
  )
}
