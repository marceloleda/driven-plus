import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



export default function TelaPlano(){
    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)
    const {idPlano} = useParams();
    const [plano, setPlano] = useState([]);
    console.log(plano)


    useEffect(()=>{
        const URL= `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.get(URL, config);
        promise.then((response)=>{
            setPlano(response.data)
        })
        promise.catch((err)=> console.log(err.message))
    },[])
    return(
        <>
            <Conteiner>
                <img src={plano.image} alt="image"/>
                <h1>{plano.name}</h1>
                <Informacoes>
                    <h2>Benefícios:</h2>
                </Informacoes>

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
        width: 140px;
        height: 95px;
    }
    h1{
        margin-top:12px;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;

        color: #FFFFFF;
    }
`;

const Informacoes = styled.div`

`;