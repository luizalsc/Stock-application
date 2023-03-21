import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const PortifolioForm = () => {

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        contributionAmount: ''
    })

    const handleIpuntChange = (event) => {
        dispatch()
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        const fetchData = async () => {
            
        }

        setInputs({
            contributionAmount: event.target.value
        })

        fetchData()  
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleIpuntChange} value={inputs.stocksTicker}></input>
                <button type='submit'>Enviar</button>
            </form>   
        </>
    )
}


const Portifolio = () => {

    const userStocks = useSelector(state => state.userStocks)

    const dispatch = useDispatch()
        
    return(
        <>

            <Link to={`/`}>Voltar</Link>
            <StocksPortifolio/>
            <PortifolioForm/>
        </>
    )
}

export { Portifolio }