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
      <div className="scroll-container">
        <div className="scroll-content">
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单3.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>蔡建亚 给世界最悠长的吻</p>
          </div>
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单4.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>这就是K歌之王 陈奕迅</p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '24px', marginLeft: '5%', marginTop: '5%' }}>动漫歌单</p>
      <div className="scroll-container">
        <div className="scroll-content">
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单5.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>狐妖小红娘 寻觅过四季</p>
          </div>
          <div className='item1'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(../../首页/歌单6.png)' }}>

            </div>
            <p style={{ marginLeft: '3%', marginTop: '5%', fontSize: '20px' }}>【光遇】 千万朵玫瑰</p>
          </div>
        </div>
      </div>
    </div>
  )
}
