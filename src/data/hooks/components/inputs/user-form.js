import { useState } from "react"
import { useDispatch } from "react-redux"
import { getTickers, getTickerDetails } from "../../../services/fetch-api"
import { renderStocks } from "../../../store/actions/render-stock"
import { getStocksDetails } from '../../../store/actions/render-stock-details'
import { StockCard } from "../card/stock-card"

const UserForm = () => {

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        stocksTicker: '',
        search: false
    })

    const handleIpuntChange = (event) => {
        setInputs({
            stocksTicker: event.target.value
        })
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        const fetchData = async () => {
            
            const newStock = await getTickers(inputs.stocksTicker)
            const stockDetails = await getTickerDetails(inputs.stocksTicker)


            dispatch(renderStocks(newStock))
            dispatch(getStocksDetails(stockDetails))

            setInputs({
                search: true
            })     
        }


        fetchData()  
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleIpuntChange} value={inputs.stocksTicker}></input>
                <button type='submit'>Enviar</button>
                <StockCard/>
            </form>   
            
        </>
    )
}

export { UserForm }

//{inputs.search == true ? <StockCard/> : <p>Coloque a sigla de uma ação (ex: GOOGL)</p>}



