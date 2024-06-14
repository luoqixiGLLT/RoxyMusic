import {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./Index.jsx";
import Login from "./Login.jsx";
import Search from "./Search.jsx";
import Home from "./Index/Home.jsx";
import Play from "./Index/Play.jsx";
import User from "./Index/User.jsx";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Index/>}>
                        <Route path='home' element={<Home/>} ></Route>
                        <Route path='play' element={<Play/>} />
                        <Route path='user' element={<User/>} />
                    </Route>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/search' element={<Search/>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default App
