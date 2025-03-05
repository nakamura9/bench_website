import axios from "axios"
import { useReducer } from "react"
import Input from "./input"
import { BASE_URL } from "../constants"
import Select from "./select"

const reducer = (state, action) => {
    console.log(action)
    const newState = {...state}
    newState[action.name] = action.value
    return newState
}

export default function Filters(props) {
    const [state, dispatch] = useReducer(reducer, { name: "", min_price: "", max_price: "", sort_by: "new"}) 

    const search = () => {
        const params = {}
        if(state.name.length > 0 ) {
            if(state.name.length < 3) {
                return
            }
            params["name__icontains"] = state.name
        }

        if(state.min_price && state.min_price.length > 0) {
            params["itemprice__rate__gte"] = state.min_price
        }

        if(state.mmax_price && state.max_price.length > 0) {
            params["itemprice__rate__lte"] = state.max_price
        }
        
        axios({
          url: `${BASE_URL}/product/`, 
          params: params
        }).then(res => {
            props.setProducts(res.data.results)    
        })
      }
      
    return (
        <div>
            <h4>Filters </h4>
                <Input 
                    type="text"
                    name="name"
                    label="Name"
                    value={state.name}
                    handler={val => dispatch({name: "name", value: val})}
                />
                <Input 
                    type="number"
                    name="min_price"
                    label="Min. Price"
                    value={state.min_price}
                    handler={val => dispatch({name: "min_price", value: val})}
                />
                <Input 
                    type="number"
                    name="max_price"
                    label="Max. Price"
                    value={state.max_price}
                    handler={val => dispatch({name: "max_price", value: val})}
                />

                <Select 
                    selected={state.sort_by}
                    handler={val => dispatch({name: "sort_by", value: val})}
                    options={[
                        {label: 'Price - Lowest First', value: 'cheap'}, 
                        {label: 'Price - Highest First', value: 'expensive'}, 
                        {label: 'Modified - Newest First', value: 'new'}, 
                        {label: 'Modified - Oldest First', value: 'old'}
                    ]} 
                    label="Sort By"
                />
                <button 
                    className="teal-button btn"
                    onClick={search}
                >
                    Filter
                </button>
        </div>
    )
}