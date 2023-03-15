import { useState } from "react"
import { useDispatch } from "react-redux"
import { getTickers } from "../../../services/fetch-api"
import { renderStocks } from "../../../store/actions/render-stock"
import { StockCards } from "../cards/user-cards"


const UserForm = () => {

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        stocksTicker: '',
        clicked: false
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
                clicked: true
            })     
        }


        fetchData()  
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleIpuntChange} value={inputs.stocksTicker}></input>
                <button type='submit'>Enviar</button>
                {inputs.clicked == true ? <StockCards/> : <p>Coloque a sigla da sua ação (ex: GOOGL)</p>}
            </form>   
            
        </>
    )
}

export { UserForm }



