import React from "react";
import { getByTestId, render, screen, within } from "@testing-library/react";
import { UserForm } from "./user-form";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>

it('stock research should be rendered', ()=>{
    render (<UserForm/>, {wrapper: ReduxProvider})
    const stockInputEl = screen.getByPlaceholderText(/aapl/i)
    expect(stockInputEl).toBeInTheDocument()
})

it('button should be rendered', ()=> {
    render(<UserForm/>, {wrapper: ReduxProvider})
    const buttonInputEl = screen.getByRole('button')
    expect(buttonInputEl).toBeInTheDocument()
})

