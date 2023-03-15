import { useState } from "react"
import { useDispatch } from "react-redux"
import { getTickers } from "../../../services/fetch-api"
import { renderStocks } from "../../../store/actions/render-stock"
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
            
            dispatch(renderStocks(newStock))

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
                {inputs.search == true ? <StockCard/> : <p>Coloque a sigla de uma ação (ex: GOOGL)</p>}
            </form>   
            
        </>
    )
}

export { UserForm }



