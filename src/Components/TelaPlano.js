import { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";



export default function TelaPlano(){
    const {idPlano} = useParams();

    useEffect(()=>{
        const URL= `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
    },[])
    return(
        <>

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