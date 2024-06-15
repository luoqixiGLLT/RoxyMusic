import { proxy } from "valtio";
import test from '../static/test.jpg'

const play = proxy({
    play: false,
    user: [
        { id: "1", user: "admin", pwd: "123456", name: "张三", img: "1", state: false },
        { id: "2", user: "admin1", pwd: "123456", name: "李四", img: "2", state: false },
        { id: "3", user: "admin2", pwd: "123456", name: "王五", img: "3", state: false },
        { id: "4", user: "admin3", pwd: "123456", name: "六子", img: "4", state: false },
    ],
    loginOK(state) {
        let ids = [...Object.keys(state.payload)]
        let states = [...play.user]
        ids.forEach(item => {
            let index = states.findIndex(item2 => item2.id === item)
            states[index].state = true
            let newObj = states[index]
            states.splice(index, 1)
            states.unshift(newObj)

        })
        play.user = states
    }
})

export default play