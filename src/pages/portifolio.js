import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const PortifolioForm = ({contributionValue, stockInfo, portifolioInfo}) => {

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
        console.log(event)
        setStockInfos({ticker: event.target.value})
    }

    const handlePercentualChange = (event) => {


        const total = portifolio.reduce((total, stock) => total + parseInt(stock.percentual.percentual), 0)
        const currentValue = parseInt(event.target.value) + total

        if(currentValue > 100 && total < 100){
            alert(`Digite um valor inteiro até ${100-total}`)
            event.target.value = 100-total
        }else if(total === 100){
            alert(`Você já usou todo seu aporte`)
            event.target.value = 0
        }
        
        setPercentual ({percentual: event.target.value})  
    }

    const addToPortifolio = () => {

        setPortifolio([...portifolio, {stockInfos, percentual}])
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(portifolio)

        return(portifolio)
    }
            

    return(
        <>
            <form onSubmit={handleSubmit} value={portifolioInfo}>
                <label htmlFor='contribution'>Insira o valor que quer aportar</label>
                <br/>

                <input type='number' onChange={handleContributionChange} value={contributionValue} placeholder='Valor total do aporte' id='contribution'></input>
                <br/><br/>

                <label htmlFor='stocks'>Selecione as ações desejadas</label>
                <br/>
                <div>
                    <select name='stocks' onChange={handleStockInfoChange}>
                        {userStocks.length > 0 ? (
                            userStocks.map((stock, index) => (
                                <option key={index} value={stock.cardStocks.ticker} name={stock.cardStocks.ticker}>
                                    {stock.cardStocks.name} - {stock.stocksCLosePrice.close}
                                </option>                       
                        ))
                        ) : (
                            <li>Nenhuma ação encontrada</li>
                        )}
                    </select>
                    <input type='number' placeholder='100' id='number' required onChange={handlePercentualChange}></input>
                    <label htmlFor='number'>%</label>
                    <button onClick={addToPortifolio} type='reset'>+</button>
                    <br/><br/>
                </div>
                <button type='submit'>Enviar</button>
                <br/>
                <br/><br/>
            </form> 
            
            <Wallet portifolioInfo={portifolio}/>
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

const Wallet = (props) => {

    const userStocks = useSelector(state => state.userStocks)

    return(
        <ul>
            {props.portifolioInfo.length > 0 ? (
                props.portifolioInfo.map((stock, index) => (
                    <li key={index} value={stock.stockInfos.ticker}>
                        <p>{stock.stockInfos.ticker} - {stock.percentual.percentual}%</p>
                    </li>                       
            ))
            ) : (
                <li>Adicione suas ações</li>
            )}
        </ul>


    )

    
}


// const summation = portifolioInfo.reduce((summation, number) => summation + number.percentual.percentual, 0)