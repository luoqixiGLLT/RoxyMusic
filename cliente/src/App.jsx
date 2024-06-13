import {Fragment} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='/audio' element={<MyAudio/>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default App
