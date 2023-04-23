import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { StocksPortifolio } from '../cards/user-cards'
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';


function createMockStore(){
    const mockStore = configureStore([])
    const store = mockStore({
        userStocks: [
            { cardStocks: {name: "Test Company", ticker: 'TST', description: 'Lorem Ipsum'}, stocksCLosePrice: {close: 100.00} },
            { cardStocks: {name: "Test Company 2", ticker: 'TST2', description: 'Lorem Ipsum 2'}, stocksCLosePrice: {close: 200.00} } 
        ]}
    )
    return store
}


describe('Renders StockCard correctly', ()=>{

    it('renders default message', ()=>{
        const store = createMockStore()
        store.getState().userStocks = []
        render(
            <Provider store={store}>
                <StocksPortifolio/>
            </Provider>
            )
        const defaultMessage = screen.getByText(/Nenhum produto encontrado/i)
        expect(defaultMessage).toBeInTheDocument()
    })

    it('renders list after receiving stocks information', ()=>{
        const store = createMockStore()
        render(
        <Provider store={store}>
            <StocksPortifolio/>
        </Provider>
        )
        
        const titleElements = screen.getAllByRole('heading3')
        const buttonElements = screen.getAllByRole('button')
        
        expect(titleElements).toHaveLength(2)
        expect(buttonElements).toHaveLength(2)
    })

    it('dispatch remove stock from portifolio when each button is clicked', ()=>{
        const store = createMockStore()
        render(
            <Provider store={store}>
                <StocksPortifolio/>
            </Provider>
        )

        const buttonEl1 = screen.getAllByRole('button')[0]
        const buttonEl2 = screen.getAllByRole('button')[1]
        //Acess the array of actions in this Component
        const actions = store.getActions()

        fireEvent.click(buttonEl1)
        //Verify the action type fired 
        expect(actions[0].type).toEqual("ADD_DELETED_STOCK")

        fireEvent.click(buttonEl2)
        //Verify the action type fired 
        expect(actions[0].type).toEqual("ADD_DELETED_STOCK")

    })
})

//npm test -- src/components/cards/user-cards.test.js