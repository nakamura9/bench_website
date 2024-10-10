import styles from '../styles/components.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function EmptyList(props){
    return (
        <div className={styles.emptyList}>
                <FontAwesomeIcon size='7x' icon="list"/>
                <h3>{props.message ? props.message : "This view has no items!"}</h3>
        </div>
    )
}