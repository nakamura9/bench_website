import {useContext} from 'react'
import Context from '../utils/context'

export default function Price(props) {
    const context = useContext(Context)
    // TODO implement currency toggle
    if(context.hidePrices) {
        return <span></span>
    }
    const price_string = props.price ?  parseFloat(props.price / context.exchangeRate).toFixed("2") : "0.00"
    return <span>{context.currency? context.currency.symbol : "..."} {price_string}</span>
}