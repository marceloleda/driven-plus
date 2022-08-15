import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { createGlobalStyle } from "styled-components";


import TelaCadastro from "./Components/TelaCadastro";
import TelaLogin from "./Components/TelaLogin";
import { useState } from "react";
import TelaInscricao from "./Components/TelaInscricao";
import TelaPlano from "./Components/TelaPlano";
import TelaHome from "./Components/TelaHome";


export default function App(){
    const [tasks, setTasks] = useState([]);
    const contextValue = { tasks, setTasks };
    return(
        <>
            <GlobalStyle/>
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaLogin/>}/>
                        <Route path="/sign-up" element={<TelaCadastro/>}/>
                        <Route path="/subscriptions" element={<TelaInscricao/>}/>
                        <Route path="/subscriptions/:idPlano" element={<TelaPlano/>}/>
                        <Route path="/home" element={<TelaHome/>}/>

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

