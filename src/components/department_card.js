import styles from "../styles/components.module.css"
import {Link} from "react-router-dom"

export default function Card(props)  {
    return (
        <div className={[styles.departmentCard, styles.card].join(" ")} style={{height: "fit-content", border: "1px solid #ccc"}}>
            {props.image 
                ? <img src={props.image}/> 
                : null}
            <div className={styles.cardBody} >
                
            <Link to={"/department/" + props.id}><h4>{props.name}</h4></Link>
                <ul>
                    {props.categories.map(cat => (
                        <li key={cat.id}><Link to={`/category/${cat.id}/`}>{cat.name}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}