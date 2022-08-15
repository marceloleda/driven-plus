import {useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Assets/img/Vector.svg"
import Money from "../Assets/img/money.svg"
import UserContext from "../contexts/UserContext";
import FormTelaPlana from "./FormTelaPlana";



export default function TelaPlano(){
    const {tasks, setTasks} = useContext(UserContext);
    console.log(tasks)
    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)
    const {idPlano} = useParams();
    const [plano, setPlano] = useState([]);
    const [perks,setPerks] = useState([]);
    console.log(plano)

    useEffect(()=>{
        const URL= `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.get(URL, config);
        promise.then((response)=>{
            setPlano(response.data)
            setPerks(response.data.perks)
        })
        promise.catch((err)=> console.log(err.message))
    },[])
    return(
        <>
            <Conteiner>
                <img src={plano.image} alt="image"/>
                <h1>{plano.name}</h1>
            </Conteiner>
            <Informacoes>

                <Beneficios>
                    <Topico>
                        <img src={Perks} alt="beneficio"/>
                        <h2>Benefícios:</h2>
                    </Topico>
                    {perks.map((perk, index)=>
                        <h2 key={index}>{perk.id}. {perk.title}</h2> 
                    )}
                    <Topico>
                        <img src={Money} alt="beneficio"/>
                        <h2>Preco:</h2>
                    </Topico>
                    <h2>R$ {plano.price} cobrados mensalmente</h2> 
                </Beneficios>
            </Informacoes>
            <Conteiner>
                <FormTelaPlana/>
            </Conteiner>

        </>
    );
}
const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    background: #0E0E13;

    img{
        width: 140px;
        height: 95px;
        margin-top: 90px;
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
    display:flex;
    flex-direction: column;
    margin-left:30px;
    margin-top:25px;
 

`;
const Beneficios = styled.div`
    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: #FFFFFF;
    }
`;
const Topico = styled.div`
display:flex;
margin-bottom:10px;
margin-top:10px;

img{
    Width:12px;
    Height:16px;
    margin-right:5px;
}
h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
}

`