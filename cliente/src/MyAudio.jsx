import React, {useEffect, useState} from 'react';
import mp3 from './風と行く道.flac'
import {Button} from "antd";

const MyAudio = () => {
    const ref = React.useRef();
    const [duration, setDuration] = useState(0)
    const [now, setNow] = useState('0:00:00')

    function realFormatSecond(second) {
        var secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)

            let hours = Math.floor(second / 3600)
            second = second - hours * 3600
            let mimute = Math.floor(second / 60)
            second = second - mimute * 60

            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }

    return (
        <div>
            <audio
                src={mp3}
                ref={ref}
                controls
                onLoadedMetadata={() => setDuration(realFormatSecond(ref.current.duration))}
                onTimeUpdate={() => setNow(realFormatSecond(ref.current.currentTime))}
            ></audio>
            <div>
                <Button>播放</Button>
                <Button>{now}</Button>

                <Button>{duration}</Button>
            </div>
        </div>
    );
};

export default MyAudio;