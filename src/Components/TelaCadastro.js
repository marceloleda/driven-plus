import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


export default function TelaCadastro(){
    const navigate = useNavigate();
    const [ cadastro, setCadastro] = useState({
        nome:"",
        CPF: "",
        email: "",
        senha: ""
    })
    function cadastrar(event){
        event.preventDefault();
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up`; 
        const dados = {
            email: cadastro.email,
            name: cadastro.nome,
            cpf: cadastro.CPF,
            password: cadastro.senha
        }
        const promise = axios.post(URL, dados);
        promise.then((response)=> {
            navigate('/');
        })
        promise.catch(err => {
            if(err.message === "Request failed with status code 409"){
                alert(`Voce ja esta cadastrado `)
            }
            if(err.message === "Request failed with status code 422"){
                alert(`Verifique se seus dados foram digitados corretamente`)
            }
           
            alert(`Opa! Verifique seus dados e tente novanmente ;)`)
            console.log(err.message)
        })

    }
    return(
        <>
            <Conteiner>
                <form onSubmit={cadastrar}>
                    <Inserir id="nome" type="text" placeholder="Nome" value={cadastro.nome} onChange={(e)=>
                    setCadastro({...cadastro, nome: e.target.value})} required/>

                    <Inserir id="CPF" type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Digite um CPF no formato: xxx.xxx.xxx-xx"  placeholder="CPF" value={cadastro.CPF} onChange={(e)=>
                    setCadastro({...cadastro, CPF: e.target.value})} required/>

                    <Inserir id="email" type="email" placeholder="E-mail" value={cadastro.email} onChange={(e)=>
                    setCadastro({...cadastro, email: e.target.value})} required/>

                    <Inserir id="senha" type="password" placeholder="Senha" value={cadastro.senha} onChange={(e)=>
                    setCadastro({...cadastro, senha: e.target.value})} required/>
                    <Botao type="submit">CADASTRAR</Botao>
                </form>
                <Cadastro>
                    <Link to={`/`}>
                        <h2>Já possuí uma conta? Entre</h2>
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
  
`;
const Botao = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 299px;
    height: 52px;
    margin-left: 36px;
    margin-top: 20px;
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