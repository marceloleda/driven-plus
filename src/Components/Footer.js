import styled from "styled-components";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function Footer(){
    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)
    const navigate = useNavigate();
    function mudarPlano(){
        navigate(`/subscriptions`)
        alert("Para vê seu plano alterado faça o login novamente!")
    }
    function cancelarPlano(){
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.delete(URL, config);
        promise.then((response)=>{
            navigate(`/subscriptions`)
            alert("Para vê seu plano alterado faça o login novamente!")

        })
        promise.catch((err)=> console.log(err.message))
        
    }
    return(
        <>
            <Conteiner>
                <Botao onClick={()=>{
                    mudarPlano()
                }}>Mudar plano</Botao>
                <Botao onClick={()=>{
                    cancelarPlano()
                }}>Cancelar plano</Botao>

            </Conteiner>
        </>
    )
}
const Conteiner = styled.div`
    position: fixed;
    bottom:20px;

`
const Botao = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 299px;
height: 52px;
margin-top: 16px;
background: #FF4791;
border-radius: 5px;
border:none;
cursor: pointer;
font-family: 'Roboto';
font-size: 20px;
line-height: 26px;
text-align: center;
color: #FFFFFF;
    &:last-child{
        background: #FF4747;
    }
`;
