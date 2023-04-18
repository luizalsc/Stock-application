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

export {Wallet}