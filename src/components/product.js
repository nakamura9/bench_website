import styles from "../styles/components.module.css"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addToCart, addToWishList } from "../utils/shopping"
import Context  from "../utils/context"
import Price from "./price"

export default function Card(props)  {
    return (<Context.Consumer>{context =>(
        <div className={styles.card}>
            <div className={styles.cardImg}>
                {props.img 
                    ? <img src={props.thumbnail}/> 
                    : null}
            </div>
            <div className={styles.cardBody}>
                
                <h4 className={styles.productLabel}><Link to={`/product/${props.id}`}>{props.name}</Link></h4>
                <h4 className={styles.productPrice}><Price price={props.unit_sales_price} /></h4>
                {context.account 
                    ? <div className={styles.btnGroup}>
                            <button
                              className={styles.addToCart}
                              onClick={() => addToCart(props.id, context.account.id, 1, context.renderMessage)}
                            > 
                                <FontAwesomeIcon icon="shopping-cart"/> Add to Cart
                            </button>
                            {props.noWishListButton 
                                ? null
                                : <button 
                                    className={styles.addToWishList}
                                    onClick={() => addToWishList(props.id, context.account.id, context.renderMessage)}
                                  >
                                    <FontAwesomeIcon icon="heart"/> 
                                  </button>}
                        </div>
                    : null}
                
            </div>
        </div>
    )}</Context.Consumer>)
}