import { useEffect, useState } from "react"
import { StockCards } from "../data/hooks/components/cards/user-cards"
import { UserForm } from "../data/hooks/components/inputs/user-form"


async function getInitialTicker() {
              
    const response = await fetch(`https://api.polygon.io/v3/reference/tickers/GOOGL?apiKey=Di9sCRa_Bj2l8cpNdcSXk4E3rpAp1aFP`)

    return(await response.json())
}



const Home = () => {

    const [stock, setStock] = useState({
        stock: {}
    })

    useEffect(() => {
        const fetchData = async () => {

            const initialStock = await getInitialTicker()
            setStock({
                stock: initialStock.results
            })
            
        }
       
        fetchData() 
    }, [])


    return (
        <main>
            <h1>Home</h1>
                <UserForm/>
            <section>
                <StockCards stock={stock.stock}></StockCards>
            </section>
        </main>
    )
}

export { Home }