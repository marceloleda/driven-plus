import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { createGlobalStyle } from "styled-components";


import TelaCadastro from "./Components/TelaCadastro";
import TelaLogin from "./Components/TelaLogin";
import { useState } from "react";


export default function App(){
    const [tasks, setTasks] = useState([]);
    const contextValue = {tasks, setTasks}
    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaLogin/>}/>
                        <Route path="/cadastro" element={<TelaCadastro/>}/>

                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
    body{
        Width: 375px;
        background: #0E0E13;
        font-family: 'Lexend Deca', sans-serif;
    }
`

