import {useState, useEffect} from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import styles from "../styles/blog.module.css"
import Spinner from "../components/spinner"
import { useParams } from "react-router-dom"
import {BASE_URL} from '../constants'

export default  function Article(props) {
    const [article, setArticle] = useState(null)
    const {id} = useParams()
    console.log({id})
    useEffect(() => {

        axios.get(`${BASE_URL}/blog/${id}`)
            .then(res => {
                setArticle(res.data)
            }).catch(err => {
                console.log({err})
            })
    }, [id])
    if(!article) {
        return <Spinner />      
    }
    return (
        <div className={styles.blogContainer}>
            <img className={styles.titleImg} src={article.title_photo}/>
            <h1>{article.title}</h1>
            <div className={styles.byLine}>
                <div>
                    <img src={article.author.photo} alt="" />
                </div>
                <div>
                    <h4>{article.author.name}</h4>
                    <p>{new Date(article.modified).toDateString()}</p>
                </div>
            </div>
            <div className={styles.articleContent}>
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
        </div>
    )
}