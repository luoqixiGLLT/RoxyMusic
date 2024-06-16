import React,{useState} from 'react'

export default function Liu() {
  const [pai] = useState([
    {
      title: '流行趋势榜',
      children: [
        { name: '1', song: '三餐四季' }, { name: '2', song: '风吹过的晨曦' }, { name: '3', song: '人间半途' }
      ]
    },
    {
      title: '华语流行榜',
      children: [
        { name: '1', song: '暮色回响' }, { name: '2', song: '去明天' }, { name: '3', song: '平无尽处是春山' }
      ]
    },
    {
      title: '综艺榜',
      children: [
        { name: '1', song: '如果爱忘了(Live)' }, { name: '2', song: '若月亮没来(Live)' }, { name: '3', song: '如果可以(Live)' }
      ]
    }
  ])
  return (
    <div>
      <p style={{ fontSize: '28px', marginLeft: '5%', marginTop: '5%' }}>排行榜</p>

      <div className="scroll-container">
        <div className="scroll-content">
          {
            pai.map((item, index) => {
              return (
                <div className="item2" key={index}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '25px', marginLeft: '10%', marginTop: '10%', fontWeight: 'bold' }}>{item.title} > </p>
                    <img src='../../首页/1.png' style={{ borderRadius: '50%', width: '60px', marginTop: '8%', marginRight: '5%' }}></img>
                  </div>
                  <div style={{ marginLeft: '10%' }} className='pai'>
                    {item.children.map((i, index) => {
                      return (
                        <p key={index}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'oblique' }}>{i.name} </span>
                          <span> {i.song}</span>
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })
          }


          {/* <!-- 添加更多项目 --> */}
        </div>
      </div>
    </div>
  )
}
