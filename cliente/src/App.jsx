import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index.jsx";
import Login from "./Login.jsx";
import Search from "./Search.jsx";

import Play from "./Index/Play.jsx";
//我的子路由
import User from "./Index/User.jsx";
import Zhu from "./Index/zhu.jsx";
import Music from "./Index/User/Music.jsx";
import Friends from "./Index/User/Friends.jsx";
import Brother from "./Index/User/Brother.jsx";
import Talks from "./Index/User/Talks.jsx";
import Author from "./Index/User/Author.jsx";
import Like from "./Index/User/Like.jsx";
import Trends from "./Index/User/Trends.jsx";
import Bian from "./Index/bian.jsx";
//首页子路由
import Home from "./Index/Home.jsx";
import Dan from "./Index/Home/Dan.jsx";
import Hong from "./Index/Home/Hong.jsx";
import Liu from './Index/Home/Liu.jsx';
import Tui from './Index/Home/Tui.jsx';
//分类
import Fenlei from "./Index/Fenlei.jsx";
//好友子路由
import One from "./Index/User/Friends/One.jsx";
import Two from "./Index/User/Friends/Two.jsx";
import Thre from "./Index/User/Friends/Thre.jsx";
import Four from "./Index/User/Friends/Four.jsx";
function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Index />}>
                        <Route path='home' element={<Home />} >
                            <Route path="/home/Dan" element={<Dan />} />,
                            <Route path="/home/Hong" element={<Hong />} />,
                            <Route path="/home/Liu" element={<Liu />} />,
                            <Route path="/home/Tui" element={<Tui />} />,
                        </Route>
                        <Route path='play' element={<Play />} />
                            <Route path="zhu" element={<Zhu />} />
                            <Route path="bian" element={<Bian />} />
                        <Route path='user' element={<User />}  >
                            <Route path="/user/Music" element={<Music />} />,
                            <Route path="/user/Friends" element={<Friends />}>
                                <Route path="/user/Friends/one" element={<One />} />
                                <Route path="/user/Friends/two" element={<Two />} />
                                <Route path="/user/Friends/thre" element={<Thre />} />
                                <Route path="/user/Friends/four" element={<Four />} />
                            </Route>,
                            <Route path="/user/Brother" element={<Brother />} />,
                            <Route path="/user/Talks" element={<Talks />} />,
                            <Route path="/user/Author" element={<Author />} />,
                            <Route path="/user/Like" element={<Like />} />,
                            <Route path="/user/Trends" element={<Trends />} />,
                        </Route>
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/fenlei' element={<Fenlei />} />
                </Routes >
            </BrowserRouter >
        </Fragment >
    )
}

export default App
