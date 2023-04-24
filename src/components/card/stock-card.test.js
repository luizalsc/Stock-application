import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { StockCard } from "./stock-card";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { addStocksToPortifolio } from "../../data/store/actions/stock-portifolio";
import reducer from "../../data/store/reducers/stock-portifolio"

function createMockStore(){
    const mockStore = configureStore([])
    const store = mockStore({
        cardStocks: {results: {name: "Test Company", ticker: 'TST', description: 'Lorem Ipsum'}}, 
        stockDetails: {close: 100.00},
        userStocks: []
    }
    )
    return store
}

describe('Renders StockCard correctly', ()=>{

    it('renders default message', ()=>{
        const store = createMockStore()
        store.getState().cardStocks.results = undefined
        render(
            <Provider store={store}>
                <StockCard/>
            </Provider>
            )
        const message = screen.getByText(/Pesquise uma sigla de ação/i)
        expect(message).toBeInTheDocument()
    })

    it('renders stock information after fetch', ()=>{
        const store = createMockStore()
        render(
        <Provider store={store}>
            <StockCard/>
        </Provider>
        )
        const nameEl = screen.getByText('Test Company')
        const tickerEl = screen.getByText('TST')
        const descriptionEl = screen.getByText('Lorem Ipsum')
        

        expect(nameEl).toBeInTheDocument()
        expect(tickerEl).toBeInTheDocument()
        expect(descriptionEl).toBeInTheDocument()
    })

    it('renders button', ()=>{
        const store = createMockStore()
        render(
        <Provider store={store}>
            <StockCard/>
        </Provider>
        )
        const buttonEl = screen.getByRole('button') 
        expect(buttonEl).toBeInTheDocument()
    })

    it('dispatch the correct action when button is clicked', ()=>{
        const store = createMockStore()
        render(
            <Provider store={store}>
                <StockCard/>
            </Provider>
        )

        const buttonEl = screen.getByRole('button')
        //Acess the array of actions in this Component
        const actions = store.getActions()
        fireEvent.click(buttonEl)
        //Verify the action type fired 
        expect(actions[0].type).toEqual("ADD_STOCK_TO_PORTIFOLIO")
    })

    it('dispatch the correct payload when button is clicked', ()=>{
        const store = createMockStore()
        render(
            <Provider store={store}>
                <StockCard/>
            </Provider>
        )

        const expectedPayload =  {"cardStocks": {"description": "Lorem Ipsum", "name": "Test Company", "ticker": "TST"}, "stocksCLosePrice": {"close": 100}}

        const buttonEl = screen.getByRole('button')
        //Acess the array of actions in this Component
        const actions = store.getActions()
        fireEvent.click(buttonEl)
        //Verify the action type fired 
        expect(actions[0].payload).toEqual(expectedPayload)
    })

    it('add stock to userStocks when action is dispatched', ()=>{
        const store = createMockStore()
        render(
            <Provider store={store}>
                <StockCard/>
            </Provider>
        )

        const expectedUserStocks =  [{"cardStocks": {"description": "Lorem Ipsum", "name": "Test Company", "ticker": "TST"}, "stocksCLosePrice": {"close": 100}}]

        const buttonEl = screen.getByRole('button')
        //Acess the array of actions in this Component
        const actions = store.getActions()
        fireEvent.click(buttonEl)
        //Verify the new store state

        expect(reducer(store.getState().userStocks, addStocksToPortifolio(actions[0].payload))).toEqual(expectedUserStocks)  
        expect(reducer(store.getState().userStocks, addStocksToPortifolio(actions[0].payload))).not.toEqual(store.getState().userStocks)
        })
})
    
    



//npm test -- src/components/card/stock-card.test.js




