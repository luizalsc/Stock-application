import { useState } from "react"
import { getTickers } from "../../../services/fetch-api"
import { StockCards } from "../cards/user-cards"

const UserForm = () => {

    const [inputs, setInputs] = useState({
        stocksTicker:'' 
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
            console.log(newStock)
        }
       
        fetchData()  
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleIpuntChange} value={inputs.stocksTicker}/>
                <input type='submit'/>
            </form>   
            
        </>
    )
}

export { UserForm }


//------TENTATIVA 01--------
// const [inputs, setInputs] = useState({
//     stocksTicker:'',
//     newStock: {}
// })

// const handleIpuntChange = (event) => {
//     setInputs({
//         stocksTicker: event.target.value,
//         newStock: {}
//     })
// }

// const handleSubmit = (event) => {

//     event.preventDefault()
//     const fetchData = async () => {
//         const newStock = await getTickers(inputs.stocksTicker)
//         setInputs({
//             stocksTicker: event.target.value,
//             newStock: newStock.results
//         })
//         return(inputs.newStock)
//     }
    
   
//     fetchData()  
// }

// return(
//     <>
//         <form onSubmit={handleSubmit}>
//             <input type='text' onChange={handleIpuntChange} value={inputs.stocksTicker}/>
//             <input type='submit'/>
//         </form>
//         <StockCards stocks={inputs}></StockCards>



