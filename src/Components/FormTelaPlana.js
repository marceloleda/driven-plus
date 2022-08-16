import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";



export default function FormTelaPlana(){
    const navigate = useNavigate();
    const {tasks, setTasks} = useContext(UserContext)
    const [home, setHome] = useState([])

    const dadosAtualizados = JSON.stringify(home)
    localStorage.setItem("atualizado", dadosAtualizados)

 
    const usuario = localStorage.getItem("usuario")
    const usuarioDados = JSON.parse(usuario)
    
    const {idPlano} = useParams();
    const [compra, setCompra] = useState({
        cardName: "",
        cardNumber: "",
        cvc: "",
        data: ""
    });
    
    function temCerteza(event){
        event.preventDefault();
        setTasks({...tasks, toggle: true});
    }
    if(tasks.confirmarCompra === true  && tasks.toggle === true){
        finalizarCompra();
    }
    
    function finalizarCompra(){
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;
        const body = {
            membershipId: idPlano,
            cardName: compra.cardName,
            cardNumber: compra.cardNumber,
            securityNumber: compra.cvc,
            expirationDate: compra.data
        }
        const config = {
            headers: { Authorization: `Bearer ${usuarioDados.token}` }
        }
        const promise = axios.post(URL, body, config);
        promise.then((response)=>{
            console.log(response.data)
            setHome(response.data)
            navigate("/home")
            console.log(home)
        })
        promise.catch((err)=> {
            alert("Verifique seus dados e tente novamente")
            console.log(err.message)
        })
    }

    return(
        <>
            <Conteiner >
                <form onSubmit={temCerteza}>
                    <Inserir id="cartao" type="text" placeholder="Nome impresso no cartão" value={compra.cardName} onChange={(e)=>
                        setCompra({...compra, cardName: e.target.value})
                        } required/>

                    <Inserir type="text" placeholder="Digitos do cartão" maxlength="10" title="" 
                            value={compra.cardNumber} onChange={(e) => setCompra({...compra, cardNumber: e.target.value})
                        } required/>
                    <Inserir type="number" placeholder="Código de segurança" maxlength="10" title="Digite o codigo CVC do seu cartao. Exemplo: 321" 
                            value={compra.cvc} onChange={(e) => setCompra({...compra, cvc: e.target.value})
                        } required/>
                    <Inserir pattern="\d{2}\/\d{2}" type="text" placeholder="Validade" maxlength="10" title="Digite a data de vencimento. exemplo: DD/MM" 
                            value={compra.data} onChange={(e) => setCompra({...compra, data: e.target.value})
                        } required/>
                    <Botao type="submit">ASSINAR</Botao>
                </form>

            </Conteiner>
        </>
    )
}
const Conteiner = styled.div`
    display:flex;

`
const Inserir = styled.input`
    width: 299px;
    height: 52px;
    margin-bottom: 16px;
    margin-left: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    &:first-child{
        margin-top: 30px;
    }
    &:nth-child(3){
        width: 145px;
    }
    &:nth-child(4){
        width: 145px;
        margin-left: 10px;
    }
`;
const Botao = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 299px;
    height: 52px;
    margin-left: 30px;
    background: #FF4791;
    border-radius: 5px;
    border:none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
`;


