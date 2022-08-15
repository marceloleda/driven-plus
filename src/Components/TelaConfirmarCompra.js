import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function TelaConfirmarCompra(){
    const {tasks, setTasks} = useContext(UserContext);
    console.log(tasks)
    return(
        <>
            <Confirmar>
                <h1>Tem certeza que deseja assinar o plano {tasks.nome} (R$ {tasks.preco})?</h1>
                <Botoes>
                    <BotaoConfirmar onClick={()=>{
                        setTasks({...tasks, toggle: false})
                    }} >Não</BotaoConfirmar>
                    <BotaoConfirmar onClick={()=>{
                        setTasks({...tasks, confirmarCompra: true})
                    }}>Sim</BotaoConfirmar>

                </Botoes>
            </Confirmar>
        </>
    );
}
const Confirmar = styled.div`
    z-index:1000;
    position: fixed;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 240px;
    height: 210px;
    left: 64px;
    top: 229px;
    padding: 25px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 12px;
    h1{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;

        color: #000000;
    }
`
const BotaoConfirmar = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border:none;
    cursor: pointer;

    width: 95px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    &:first-child{
        background: #CECECE;
        color: #FFFFFF;

    }
`
const Botoes = styled.div`
    display:flex;
    width: 200px;
    margin-top:50px;
    justify-content: space-between;
`