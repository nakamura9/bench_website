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
                {props.config && props.config.company && props.config.company.email &&
                    <li><a href={`mailto:${props.config.company.email}`}><FontAwesomeIcon icon={"at"}/> Email</a></li>}
                    {props.config && props.config.company && props.config.company.telephone &&
                        <li><FontAwesomeIcon icon={"phone"}/> {props.config.company.telephone}</li>
                    }
                    <li><Link to="/contact"><FontAwesomeIcon icon={"home"}/> Address</Link></li>
                </ul>
            </div>
            <div>
                <h5>Social</h5>
                <hr />
                <ul>
                    {props.config && props.config.company && !["", undefined, null].includes(props.config.company.instagram_id) &&
                        <li><a href={props.config.company.instagram_id}><FontAwesomeIcon icon={["fab", "instagram"]}/> Instagram</a></li>}
                    {props.config && props.config.company && !["", undefined, null].includes(props.config.company.facebook_id) &&
                        <li><a href={props.config.company.facebook_id}><FontAwesomeIcon icon={["fab", "facebook"]}/> Facebook</a></li>}
                    {props.config && props.config.company && props.config.company.whatsapp_id &&
                        <li><a href={`https://wa.me/${props.config.company.whatsapp_id}`}><FontAwesomeIcon icon={["fab", "whatsapp"]}/> Whatsapp</a></li>
                    }
                    
                </ul>
            </div>
        </footer>
    )
} 