import React, {useEffect, useRef, useState} from 'react';
import {NavBar, Toast} from "antd-mobile";
import {Space} from "antd";
import {SearchOutline} from "antd-mobile-icons";
const right = (
    <div style={{fontSize: 24}}>
        <Space style={{'--gap': '16px'}}>
            <SearchOutline className={'m-2'}/>
        </Space>
    </div>
)

const back = () =>
    Toast.show({
        content: '点击了返回区域',
        duration: 1000,
    })

const Play = () => {
    const boxRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(true);

    const getCurrentRotation = (el) => {
        const st = window.getComputedStyle(el, null);
        const tr = st.getPropertyValue("transform") || "matrix(1, 0, 0, 1, 0, 0)";
        const values = tr.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return angle < 0 ? angle + 360 : angle;
    };

    const toggleSpin = () => {
        const box = boxRef.current;
        if (isSpinning) {
            const currentRotation = getCurrentRotation(box);
            box.style.transform = `rotate(${currentRotation}deg)`;
            box.style.animation = 'none';
        } else {
            box.style.animation = '';
            box.classList.add('animate-spin-slow');
        }
        setIsSpinning(!isSpinning);
    };
    return (
        <div>
            <div className={'w-full p-5'}>
                <NavBar right={right} onBack={back}>
                    播放页
                </NavBar>
            </div>
            <div className="w-full p-5 flex flex-col items-center">
                <div className="rounded-full w-72 h-72 bg-gray-500 flex justify-center items-center animate-spin-slow"
                     ref={boxRef}>
                    1231312
                </div>
                <button onClick={toggleSpin} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                    {isSpinning ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default Play;