import {useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Perks from "../Assets/img/Vector.svg"
import Money from "../Assets/img/money.svg"
import UserContext from "../contexts/UserContext";
import FormTelaPlana from "./FormTelaPlana";
import TelaConfirmarCompra from "./TelaConfirmarCompra";
import Seta from "../Assets/img/arrow.svg"



export default function TelaPlano(){
    const navigate = useNavigate();
    const {tasks, setTasks} = useContext(UserContext);
    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)
    const {idPlano} = useParams();
    const [plano, setPlano] = useState([]);
    const [perks,setPerks] = useState([]);
    const [toggle] =useState(false)
    useEffect(()=>{
        const URL= `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.get(URL, config);
        promise.then((response)=>{
            setPlano(response.data)
            setPerks(response.data.perks)
            setTasks({...tasks, 
                preco: response.data.price,
                nome: response.data.name,
                toggle: toggle,
                image: response.data.image,
                perks: response.data.perks
            })

        })
        promise.catch((err)=> console.log(err.message))
    },[])
    return(
        <>
            {tasks.toggle === false ? "" : <TelaConfirmarCompra />}
            <Voltar load={tasks.toggle} onClick={()=>{
                navigate(`/subscriptions`)
            }}>
                <img src={Seta} alt="arrow"/>
            </Voltar>
            <Conteiner load={tasks.toggle}>
                <img src={plano.image} alt="fil"/>
                <h1>{plano.name}</h1>
            </Conteiner>
            <Informacoes>
                <Beneficios load={tasks.toggle}>
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
            <Conteiner load={tasks.toggle}>
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
    opacity:${(props)=> props.load === false? "1" : "0.5"};
    pointer-events: ${(props)=> props.load === false? "" : "none"};

    img{
        width: 140px;
        height: 95px;
        margin-top: 20px;
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
    justify-content: center;
    margin-left:40px;
    margin-top:25px;
 

`;
const Beneficios = styled.div`
    opacity:${(props)=> props.load === false? "1" : "0.5"};

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
const Voltar = styled.div`
margin-left:30px;
margin-top:25px;
cursor: pointer;
Width: 28px;
Height: 28px;
opacity:${(props)=> props.load === false? "1" : "0.5"};
pointer-events: ${(props)=> props.load === false? "" : "none"};

`