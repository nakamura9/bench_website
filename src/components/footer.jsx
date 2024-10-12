import styles from "../styles/layout.module.css"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Footer(props) {
    console.log({props})
    return (
        <footer className={styles.footer}>
            <div>
                <h5>About</h5>
                <hr />
                <ul>
                    <li><FontAwesomeIcon icon={"question"}/> <Link to="/about/">About</Link></li>
                    <li><FontAwesomeIcon icon={"list"}/> <Link to="/faq/">FAQ</Link></li>
                </ul>
            </div>
            <div>
                <h5>Contact</h5>
                <hr />
                <ul>
                    <li><Link><FontAwesomeIcon icon={"at"}/> Email</Link></li>
                    <li><FontAwesomeIcon icon={"phone"}/> {
                        props.config && props.config.company && props.config.company.telephone 
                            ? props.config.company.telephone
                            : "Telephone"}</li>
                    <li><FontAwesomeIcon icon={"home"}/> Address</li>
                </ul>
            </div>
            <div>
                <h5>Social</h5>
                <hr />
                <ul>
                    <li><FontAwesomeIcon icon={["fab", "instagram"]}/> Instagram</li>
                    <li><FontAwesomeIcon icon={["fab", "facebook"]}/> Facebook</li>
                    <li><FontAwesomeIcon icon={["fab", "whatsapp"]}/> Whatsapp</li>
                </ul>
            </div>
        </footer>
    )
} 