import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';



export default function TelaInscricao(){
    const navigate = useNavigate();


    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)

    const [planos, setPlanos] = useState([]);
    
    useEffect(()=>{
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`;
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.get(URL, config);
        promise.then((response)=>{
            setPlanos(response.data)
        })
        promise.catch((err)=> console.log(err.message))

    },[])

    return(
        <>
            <Conteiner>
                <h1>Escolha seu Plano</h1>
                {planos.map((plano, index)=>{
                    return(
                        <Link key={index} to={`/subscriptions/${plano.id}`} style={{ textDecoration: 'none' }}>
                            <Plano >
                                <img src={plano.image} alt={plano.id} />
                                <h2>R$ {plano.price}</h2>
                            </Plano>
                        </Link>
                    )
                })}
               
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
        color:#FFFFFF;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
    }
`;

const Plano = styled.div`
    width: 290px;
    height: 180px;
    display:flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 10px;
 
    img{
        width: 140px;
        height: 95px;
    }
    h2{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`;
