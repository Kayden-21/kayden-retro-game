import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./ui/components/Header/Header";
import {Login} from "./ui/components/Login/Login";
import {Score} from "./ui/components/Score/Score";
import {Footer} from "./ui/components/Footer/Footer";
import {BodyWrapper, MainWrapper} from "./App.styles";
import {Game} from "./ui/components/Game/Game";

function App() {
    return (
        <BrowserRouter>
            <BodyWrapper>
                <Header/>
                <MainWrapper>
                    <Routes>
                        <Route path={'/'} element={<Login/>}/>
                        <Route path={'/score'} element={<Score/>}/>
                        <Route path={'/game'} element={<Game/>}/>
                    </Routes>
                </MainWrapper>
                <Footer/>
            </BodyWrapper>
        </BrowserRouter>

    );
}

export default App;
