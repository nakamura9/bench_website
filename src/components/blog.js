import styles from "../styles/blog.module.css"
import cardStyles from "../styles/components.module.css"
import {Link} from "react-router-dom"

const Tag = (props) => {
    return <div className={styles.tag}>{props.name}</div>
}

const Author = (props) => {
    return <div className={styles.author}>
        <div className={styles.authorImg}>
            <img src={props.src}/>
        </div>
        <h4>{props.name}</h4>
        <p>{props.bio}</p>
    </div>
}

const ArticleCard = (props) => {
    return (
        <div className={cardStyles.card}>
            <img src={props.image}/>
            <div className={cardStyles.cardBody}>
                <h4><Link to={`/blog/${props.id}/`}>{props.title}</Link></h4>
                <p>{props.author}</p>
            </div>
        </div>
    )
}

export {Author, ArticleCard, Tag}