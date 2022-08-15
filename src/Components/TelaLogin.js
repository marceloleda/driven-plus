import { useState } from "react";
import styled from "styled-components";
import Logo from "../Assets/img/Driven.svg"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";




export default function TelaLogin(){
    const { tasks, setTasks } = useContext(UserContext);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [login, setLogin] = useState({
        email: "",
        senha: ""
    })
    const dadosUsuario = JSON.stringify(usuario)
    localStorage.setItem("usuario", dadosUsuario)
    

    function enviar(event){
        event.preventDefault();
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/login`;
        const dados = {
            email: login.email,
            password: login.senha
        }
        const promise = axios.post(URL, dados)
        promise.then((response)=>{
            setUsuario(response.data)
            console.log(response.data)
            navigate(`${usuario.membership !== null? "/subscriptions" : "/home"}`)

        })
        console.log(usuario.membership)

        promise.catch(err => {
            if(err.message === "Request failed with status code 422"){
                alert(`Dados digitados podem esta errados`)
            }
           
            alert(`Verifique se seus dados foram digitados corretamente e tente novamente! ;)`)
            console.log(err.message)
        })
    }




    return(
        <>
            <Conteiner>
                <img src={Logo} alt="logo"/>
                <form onSubmit={enviar}>
                    <Inserir id="email" type="email" placeholder="email" value={login.email} onChange={(e)=>
                    setLogin({...login, email: e.target.value})
                    } required/>

                    <Inserir id="senha" type="password" placeholder="senha" value={login.senha} onChange={(e)=>
                    setLogin({...login, senha: e.target.value})
                    }required/>

                    <Botao type="submit">ENTRAR</Botao>
                </form>
                <Cadastro>
                    <Link to={`/sign-up`} >
                        <h2>Não possuí uma conta? Cadastre-se</h2>
                    </Link>
                </Cadastro>

            </Conteiner>
        </>
    );
}

const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    Height:100vh;
    background: #0E0E13;

    img{
        margin-top: 0px;
        width: 299px;
        height: 49px;
    }
    h1{
        color:white;
    }
`;

const Inserir = styled.input`
    width: 299px;
    height: 52px;
    margin-bottom: 16px;
    margin-left: 36px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    &:first-child{
        margin-top: 100px;
    }
`;
const Botao = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 299px;
    height: 52px;
    margin-left: 36px;
    background: #FF4791;
    border-radius: 5px;
    border:none;
    cursor: pointer;
    font-family: 'Lexend Deca';
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
`;
const Cadastro = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 25px;
    h2{
        color: #FFFFFF;
        text-decoration: underline #FFFFFF;
    }
`;