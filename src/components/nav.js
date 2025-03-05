import styles from "../styles/layout.module.css"
import {Link} from "react-router-dom"
import {useEffect, useState, useContext} from "react"
import Context from "../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import Search from "./search"
import { BASE_URL } from "../constants"


const CurrencyWidget = (props) => {
    const context = useContext(Context)

    const toggleCurrency = (e) => {
        e.stopPropagation()
        axios({
            method: "GET",
            url: `${BASE_URL}/get-exchange-rate/`,
            params: {currency: e.target.value}
        }).then(res => {
            const currency_obj = context.currencies.filter(c => c.id === e.target.value)[0]
            context.updateCurrency(currency_obj)
            context.updateExchangeRate(res.data.rate)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
    <li>
        <div style={{width: "100%"}}>
            <label>Currency: </label>
            <select 
                onClick={toggleCurrency}
                className={styles.select}
            >
                {context.currencies.map(c => (
                    <option key={c.id} value={c.id}>{c.symbol}</option>
                ))}
            </select>
        </div>
    </li>
)}

const AccountMenu = props => {
    const [show, setShow] = useState(false)
    const context = useContext(Context)
    if(props.mobile)  {
        return (
                <li>
                <span>Account</span>
                <ul className={styles.mobileNavDropdownList}>
                    {context.account
                        ? <>
                            <li><Link to="/wishlist"> <FontAwesomeIcon icon="heart" /> Wishlist</Link></li>
                            <li><Link to="/cart"><FontAwesomeIcon icon="heart" />  Cart</Link></li>
                            <li><Link to="/account">My Account</Link></li>
                          </>
                        : null
                    }
                    <CurrencyWidget />
                </ul>
            </li>
        )
    }

    return (
        <Context.Consumer>{context => (
            <li 
          className={styles.navDropdown}
          onClick={()=> setShow(!show)}
        >
            <span className={styles.accountButton}>Account</span>
            <ul
              className={styles.navDropdownList}
              style={{display: show ? "block": "none"}}
            >
                
                    
                {context.account
                    ? <>
                        <li><Link to="/wishlist"><FontAwesomeIcon icon="heart"/>  <span>Wish List</span></Link></li>
                        <li><Link to="/cart"><FontAwesomeIcon icon="shopping-cart"/> <span>Cart</span></Link></li>
                        <li><Link to="/account"><FontAwesomeIcon icon="user"/> <span>My Account</span></Link></li>
                      </>
                    : <>
                        <li><Link to="/login"><FontAwesomeIcon icon={"lock"} /> <span>Login</span></Link></li>
                        <li><Link to="/sign-up"><FontAwesomeIcon icon={"user"} /> <span>Sign Up</span></Link></li>
                      </>
                }
                <CurrencyWidget  />
            </ul>
        </li>
        )}</Context.Consumer>
    )
}


export default function Navbar(props) {
    const [show, setShow] = useState(false)
    const [mobile, setMobile] = useState(false)
    const context = useContext(Context)

    useEffect(() => {
        setMobile(window.screen.width < 576)
    }, [])
    return (
        <>
        <nav className={styles.nav}>
            <div>
                <Link to="/"><img src={props.config ? props.config.company.logo : "img"}/></Link>
            </div>
            <div>
                
                <button 
                    className={styles.mobileButton}
                    onClick={() => setShow(!show)}
                >
                    <FontAwesomeIcon icon="bars"/>
                </button>
                <ul 
                    className={styles.navList} 
                    style={{
                        left: show ? "0px": "-60vw"
                    }}
                    onClick={() => mobile ? setShow(false) : null}
                >
                    <li><Search /></li>
                    <li style={{
                        display: show ? "inline-block": "none"
                    }}><Link to="/"><img src={props.config ? props.config.company.logo : "img"}/></Link></li>
                    {context.departments.map(d => <li key={d.id}><Link to={`/department/${d.id}`}>{d.name}</Link></li>)}
                    
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <AccountMenu mobile={mobile}/>
                </ul>
            </div>
        </nav>        
        <div className={styles.mobileOverlay} style={{display: mobile ? show ? "block": "none" : "none"}}></div>
        </>
    )
}