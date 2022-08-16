import styled from "styled-components";
import Perfil from "../Assets/img/perfil.svg"
import Footer from "./Footer";
import {useNavigate} from "react-router-dom"


export default function TelaHome(){

    const navigate = useNavigate();

    const usuario = localStorage.getItem("perks")
    const usuarioDados = JSON.parse(usuario)
    
    const atualizado = localStorage.getItem("atualizado")
    const atualizaoDados = JSON.parse(atualizado)


    const perk = usuarioDados.membership;
    const tetes = atualizaoDados === null? "" :atualizaoDados.membership;

    console.log(tetes)

    return(
        <>
            <Conteiner>
                <Topo>
                    {atualizaoDados.membership === undefined?  <img src={usuarioDados.membership.image} alt="foto"/> : <img src={atualizaoDados.membership.image} alt="foto"/>}
                    <Perfi onClick={()=>{
                        navigate(`/`)
                    }}>
                        <img src={Perfil} alt="perfil"/>
                    </Perfi>
                </Topo>
                <Sessao>
                    <h1>Olá, {usuarioDados.name}</h1>
                    {atualizaoDados.membership === undefined? 
                        perk.perks.map((perk,index)=>{
                            return(
                                <Botao key={index} onClick={()=>{
                                    window.open(`${perk.link}`, '_blank')
                                }}>{perk.title}</Botao>
                            )
                        })
                    : tetes.perks.map((perk,index)=>{
                        return(
                            <Botao key={index} onClick={()=>{
                                window.open(`${perk.link}`, '_blank')
                            }}>{perk.title}</Botao>
                        )
                    })}
                 
                </Sessao>
                <Footer/>
            </Conteiner>
        </>
    )
}
const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #0E0E13;
    padding: 30px;

    img{
        margin-top: 0px;
        width: 299px;
        height: 49px;
    }
    h1{
        color:white;
    }
`;
const Topo = styled.div`
    display:flex;
    justify-content: space-between;
    img{
        Width: 74px;
        Height: 50px;
    }
`
const Perfi = styled.div`
    img{
        Width: 34px;
        Height: 32px;
        margin-left: 200px;
    }
`
const Sessao = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    margin-top:15px;
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;

        color: #FFFFFF;
    }
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
`;
