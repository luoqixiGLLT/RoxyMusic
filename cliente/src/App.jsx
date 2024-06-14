import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index.jsx";
import Login from "./Login.jsx";
import Home from "./Index/Home.jsx";
import Play from "./Index/Play.jsx";
import User from "./Index/User.jsx";
import Music from "./Index/User/Music.jsx";
import Friends from "./Index/User/Friends.jsx";
import Brother from "./Index/User/Brother.jsx";
import Talks from "./Index/User/Talks.jsx";
import Author from "./Index/User/Author.jsx";
import Like from "./Index/User/Like.jsx";
import Trends from "./Index/User/Trends.jsx";
function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Index />}>
                        <Route path='home' element={<Home />} />
                        <Route path='play' element={<Play />} />
                        <Route path='user' element={<User />}  >
                            <Route path="/user/Music" element={<Music />} />,
                            <Route path="/user/Friends" element={<Friends />} />,
                            <Route path="/user/Brother" element={<Brother />} />,
                            <Route path="/user/Talks" element={<Talks />} />,
                            <Route path="/user/Author" element={<Author />} />,
                            <Route path="/user/Like" element={<Like />} />,
                            <Route path="/user/Trends" element={<Trends />} />,
                        </Route>
                    </Route>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Fragment >
    )
}

export default App
