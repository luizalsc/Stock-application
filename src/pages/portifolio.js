import {StocksPortifolio} from '../data/hooks/components/cards/user-cards'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'


const PortifolioForm = ({contributionValue, stockInfo}) => {

    const [contribution, setContribution] = useState({
        amount: ''
    })
    const [stockInfos, setStockInfos] = useState({
        name: '',
        price:''
    })
    const [portifolio, setPortifolio] = useState({})

    const handleContributionChange = (event) => {
        setContribution({
            amount: event.target.value
        })
    }

    const handleStockInfoChange = (event) => {
        setStockInfos({
            name: event.target.value,
            price:''
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setPortifolio({ stock: stockInfos.name, contribution: contribution })
        console.log(portifolio)

        if(portifolio == {}){
            return 
        }
        return (
            <StockList portifolio={portifolio}/>
        )


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
                <StocksSelector/>
                <StockOptions onChange={handleStockInfoChange} value={stockInfo}/>
                <br/>
                <br/><br/>
                <button type='submit'>Submit</button>
            </form> 
              
        </>
    )
}

const StockList = (portifolio) => {

    return(
        <ul>
            {portifolio.map((stock, index) => (
                <li key={index}>
                    <p>{stock.stock}</p>
                </li>
            ))}

        </ul>
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

const StockOptions = () => {

    const userStocks = useSelector(state => state.userStocks)

    const handleCheckboxChange = (e) => {

        const selectedStock = e.target.value
        console.log(selectedStock)
        
        return((prev)=> 
            prev.some(data => data === selectedStock ) ? 
            prev.filter(data => data !== selectedStock ) :  
            [...prev, selectedStock]
      )   

    }

    return(
        <>
            <ul id='stocks'>
                {userStocks.length > 0 ? (
                    userStocks.map((stock, index) => (
                    <li key={index}>
                        <input type='checkbox' value={stock.cardStocks.name} id={stock.index} onChange={handleCheckboxChange}/>
                        <label htmlFor={stock.index}>{stock.cardStocks.name}</label>
                    </li>
                ))
                ) : (
                    <li>Nenhuma ação encontrada</li>
                )}
            </ul>
            
            <input type='number' placeholder='100' id='number'></input>
            <label htmlFor='number'>%</label>
            
        </>
        )

}

const StocksSelector = () => {

    const userStocks = useSelector(state => state.userStocks)

    // const [inputs, setInputs] = useState({
    //     selectedstock: ''
    // })

    // const handleIpuntChange = (event) => {
    //     setInputs({
    //         selectedstock: event.target.value
    //     })
    // }
    // const addNewSelectStock = (newStock) => {
    //     console.log(inputs)
    // }


    return(
        <>  
            
                <select name='stocks'>
                    {userStocks.length > 0 ? (
                        userStocks.map((stock, index) => (
                            <option key={index} value={stock} name={stock.cardStocks.name}>
                                {stock.cardStocks.name}
                            </option>                       
                    ))
                    ) : (
                        <li>Nenhuma ação encontrada</li>
                    )}
                </select>
                <input type='number' placeholder='100' id='number' required></input>
                <label htmlFor='number'>%</label>
                <button onClick={()=>{}}>Enviar</button>
            
        </>
        )

}
//-------------- FORM ORIGINAL ------------
// const PortifolioForm = () => {

//     const dispatch = useDispatch()

//     const [inputs, setInputs] = useState({
//         contributionAmount: ''
//     })

//     const handleIpuntChange = (event) => {
//         setInputs({
//             contributionAmount: event.target.value
//         })
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         return(inputs.contributionAmount)
//     }

//     return(
//         <>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='contribution'>Insira o valor que quer aportar</label>
//                 <br/>
//                 <input type='number' onChange={handleIpuntChange} value={inputs.contributionAmount} placeholder='Valor total do aporte' id='contribution'></input>
//                 <button type='submit'>Enviar</button>
//             </form> 
//                 <br/><br/>
//                 <label htmlFor='stocks'>Selecione as ações desejadas</label>
//                 <br/>
//                 <StocksSelector/>
//                 <StockOptions/>
//                 <br/>
//                 <br/><br/>
              
//         </>
//     )
// }