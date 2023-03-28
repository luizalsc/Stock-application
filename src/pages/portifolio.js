import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const PortifolioForm = ({contributionValue, stockInfo}) => {

    const userStocks = useSelector(state => state.userStocks)

    const [contribution, setContribution] = useState({
        amount: ''
    })
    const [stockInfos, setStockInfos] = useState({
        ticker: ''
    })

    const [percentual, setPercentual] = useState({
        precentual: ''
    })

    const [portifolio, setPortifolio] = useState([])

    const handleContributionChange = (event) => {
        setContribution({amount: event.target.value})
    }

    const handleStockInfoChange = (event) => {
        console.log(event.target.value)
        setStockInfos({ticker: event.target.value})
    }

    const handlePercentualChange = (event) => {
        setPercentual ({
            percentual: event.target.value
        })
    }

    const addToPortifolio = () => {
      
        setPortifolio([...portifolio, {stockInfos, percentual}])
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('port final', portifolio)
    }
            

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='contribution'>Insira o valor que quer aportar</label>
                <br/>

                <input type='number' onChange={handleContributionChange} value={contributionValue} placeholder='Valor total do aporte' id='contribution'></input>
                <br/><br/>

                <label htmlFor='stocks'>Selecione as ações desejadas</label>
                <br/>
                <div>
                    <select name='stocks' onChange={handleStockInfoChange} >
                        {userStocks.length > 0 ? (
                            userStocks.map((stock, index) => (
                                <option  key={index} value={stock.cardStocks.ticker} name={stock.cardStocks.name}>
                                    {stock.cardStocks.name}
                                </option>                       
                        ))
                        ) : (
                            <li>Nenhuma ação encontrada</li>
                        )}
                    </select>
                    <input type='number' placeholder='100' id='number' required onChange={handlePercentualChange}></input>
                    <label htmlFor='number'>%</label>
                    <button onClick={addToPortifolio}>+</button>
                    <br/><br/>
                </div>
                <button type='submit'>Enviar</button>
                
                <br/>
                <br/><br/>
                
            </form> 
              
        </>
    )
}

const Portifolio = () => {
   
    return(
        <>

            <Link to={`/`}>Voltar</Link>
            <StocksPortifolio/>
            <PortifolioForm/>
        </>
    )
}

export { Portifolio }