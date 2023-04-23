import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Wallet } from '../wallet'
import { Calculator } from '../calculator'
import { portifolioCalculator } from '../calculator'

const PortifolioForm = ({contributionValue, portifolioInfo}) => {

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
        const total = portifolio.reduce((acc, i)=> acc + parseInt(i.percentual.percentual), 0)

        setStockInfos({ticker: ticker, price: price})
        
        if(total == 100){
            alert(`Você já usou todo seu aporte`)
            event.target.disabled = true
            return
        }
    }

    const handlePercentualChange = (event) => {

        const percentualInput = event.target
        const previousTotalValue = portifolio.reduce((previousTotalValue, stock) => previousTotalValue + parseInt(stock.percentual.percentual), 0)
        const total = parseInt(percentualInput.value) + previousTotalValue

        if(total > 100 && previousTotalValue < 100){
            alert(`Digite um valor inteiro até ${100-previousTotalValue}`)
            percentualInput.value = 100 - previousTotalValue
        }else if(previousTotalValue === 100){
            alert(`Você já usou todo seu aporte`)
            percentualInput.value = 0
            percentualInput.required = false
            percentualInput.disabled = true
        } 

        setPercentual ({percentual: event.target.value})  
    }

    const addToPortifolio = (event) => {
        const value = event.target.value
        const repeatedSotcks = portifolio.filter(item => item.stockInfos.ticker === value)
        const total = portifolio.reduce((acc, i)=> acc + parseInt(i.percentual.percentual), 0)

        if(repeatedSotcks.length > 0){
            alert(`Você já adicionou ${value}. Cada ação só pode ser adicionada uma única vez`)
            return
        }
        if(total == 100){
            alert(`Você já usou todo seu aporte`)
            event.target.disabled = true
            return
        }
        setPortifolio([...portifolio, {stockInfos, percentual}])
    }

    const handleSubmit = (event) => {

        event.preventDefault()
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
                    <select
                        name='ticker'
                        onChange={handleStockInfoChange}
                        defaultValue={'-Selecione-'}>
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
                    <input
                        type='number'
                        name ='percentual'
                        placeholder='100'
                        id='number'
                        onChange={handlePercentualChange}></input>
                    <label htmlFor='number'>%</label>
                    <button
                        onClick={addToPortifolio}
                        type='reset'
                        value={stockInfos.ticker}>+</button>
                    <br/><br/>
                </div>

                <label htmlFor='contribution'>Insira o valor que quer aportar</label>
                <br/>
                <input
                    type='number'
                    onChange={handleContributionChange}
                    value={contributionValue}
                    placeholder='Valor total do aporte'
                    id='contribution'
                    name='amount'
                    required></input>

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

export { PortifolioForm }