import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const PortifolioForm = ({contributionValue, stockInfo, portifolioInfo}) => {

    const dispatch = useDispatch()

    const userStocks = useSelector(state => state.userStocks)

    //----Implementar um único handleChange pra todo o form, de preferência usando o redux tb
    // const [state, setState] = useState({
    //     amount:'',
    //     ticker:'',
    //     percentual:''
    // })
    // const handleChange = (event) => {
    //     const value = event.target.value
    //     setState({...state, [event.target.name]: value})
    // }
    //----------------------------------------------------
    const [wallet, setWallet] = useState([])

    const [contribution, setContribution] = useState({
        amount: ''
    })
    const [stockInfos, setStockInfos] = useState({
        ticker: '',
        price: ''
    })
    const [percentual, setPercentual] = useState({
        precentual: ''
    })
    const [portifolio, setPortifolio] = useState([])

    const handleContributionChange = (event) => {
        setContribution({amount: event.target.value})
    }

    const handleStockInfoChange = (event) => {
        const value = event.target.value
        const price = value.split(' ')[1]
        const ticker = value.split(' ')[0]
        setStockInfos({ticker: ticker, price: price})
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
        const response = portifolioCalculator(contribution.amount, portifolio)
        setWallet(response)
        return(response)
    }     

    return(
        <>
            <form onSubmit={handleSubmit} value={portifolioInfo}>

                <label htmlFor='stocks'>Selecione as ações desejadas</label>
                <br/>
                <div>
                    <select name='ticker' onChange={handleStockInfoChange} defaultValue={'-Selecione-'}>
                        <option value='-Selecione-' disabled>-Selecione-</option>
                        {userStocks.length > 0 ? (
                            userStocks.map((stock, index) => (
                                <option key={index} value={`${stock.cardStocks.ticker} ${stock.stocksCLosePrice.close}`} name={stock.cardStocks.ticker}>
                                    {stock.cardStocks.ticker} - {stock.stocksCLosePrice.close}
                                </option>                       
                        ))
                        ) : (
                            <li>Nenhuma ação encontrada</li>
                        )}
                    </select>
                    <input type='number' name ='percentual' placeholder='100' id='number' required onChange={handlePercentualChange}></input>
                    <label htmlFor='number'>%</label>
                    <button onClick={addToPortifolio} type='reset'>+</button>
                    <br/><br/>
                </div>

                <label htmlFor='contribution'>Insira o valor que quer aportar</label>
                <br/>
                <input type='number' onChange={handleContributionChange} value={contributionValue} placeholder='Valor total do aporte' id='contribution' name='amount' required></input>

                <br/><br/>
                <button type='submit'>Calcular</button>
                <br/>
                <br/><br/>
            </form> 
            
            <Wallet portifolioInfo={portifolio}/>
            <Calculator inputsInfo={wallet}/>
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

const Select = (props) => {
    return (
        <>
            <select>{props.children}</select>
        </>
    )
}

Select.defaultProps = {
    selected: '-Selecione-'
}

function portifolioCalculator(amount, portifolio){
    
    const response = portifolio.map(stock => (
        (parseInt(amount)*parseInt(stock.percentual.percentual)/100)/parseInt(stock.stockInfos.price)))
    const result = response.map(stocksUnits => parseInt(stocksUnits))
    const tickers = portifolio.map(stock => stock.stockInfos.ticker)

    const finalResult = tickers.map((e,i) => `${result[i]} ações da ${e}`)

    return (finalResult)
}

const Wallet = (props) => {

    return(
        <>
        <h1>Ações escolhidas</h1>
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
        </>
    )
}
//-----------------------------------------

const Calculator = (props) => {

    const usersWallet = props.inputsInfo
    console.log(usersWallet)
    return(
        <div>
             {usersWallet.length > 0 ? (
            <>
            <p>Você deve comprar:</p>
            <ul>
                {usersWallet.map((units, index) => (
                    <li key={index} >
                        <p>{units}</p>
                    </li>                       
                ))}
            </ul>
            </>) : (<></>)}
        </div>
    )
}

export { Portifolio }