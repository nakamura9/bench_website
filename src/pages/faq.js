import {useState, useEffect} from "react"
import axios from "axios"
import styles from "../styles/faq.module.css"
import Spinner from "../components/spinner"
import { BASE_URL } from "../constants"

const Question = (props) => {
    const [show, setShow] = useState(false)
    return (
        <li 
            className={styles.question}
            onClick={() => setShow(!show)}
        >
            <h4> <span className={styles.q}>Q</span> {props.question}</h4>
            <div 
                className={show ? styles.answerVisible : styles.answerHidden}
            > 
                <span className={styles.a} >A</span> 
                {props.answer}
            </div>
        </li>
    )
}


export default  function FAQ(props) {
    const [faqs, setFaqs]  = useState([])
    useEffect(() => {
        axios.get(`${BASE_URL}/faq/`)
            .then(res => {
                setFaqs(res.data)
            })
    }, [])

    if(faqs.length === 0) {
        return <Spinner />
    }

    return (
        <div>
            <h1>Frequently Asked Questions</h1>
            <div>
                {faqs.map(cat =>(
                    <div key={cat.name} className={styles.category}>
                        <h3>{cat.name}</h3>
                        <p>{cat.description}</p>
                        <ul>
                            {cat.faqitem_set.map((q, i)=> (
                                <Question {...q} key={i} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}