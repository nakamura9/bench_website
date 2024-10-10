import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../styles/reviews.module.css"
import Input from "./input"
import {useState} from "react"
import axios from "axios"
import Context from "../utils/context"
import Modal from "./modal"

const Bar = (props) => {
    return (
        <div className={styles.bar}>
            <div style={{width: `${props.width}%`}}>.</div>
        </div>
    )
}


export default function Reviews(props) {
    const [score, setScore] = useState(5)
    const [review, setReview] = useState("")
    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const submit = (account) => {
        axios({
            url: "/api/review",
            method:"GET",
            params: {
                account: account,
                score:score,
                review:review,
                item: props.product_id
            }
        }).then(res => {
            setMessage("Thank you for your review, it was submitted successfully.")
            setShowModal(true)
        }).catch(err => {
            setMessage("An error occured, your review was not submitted.")
            setShowModal(true)
        })
    }
    
    return (
        <Context.Consumer>{context => (
            <div>
            <div className={styles.score}>
                <div>
                    <p>Average Score</p>
                    <h1>{props.stars.average.score__avg}</h1>
                </div>
                <div className={styles.filledStar}>
                    <div>{Array(5).fill(0).map( (_, i) => <FontAwesomeIcon key={i} icon="star" />)}</div>
                    <div>{Array(4).fill(0).map( (_, i) => <FontAwesomeIcon key={i} icon="star" />)}</div>
                    <div>{Array(3).fill(0).map( (_, i) => <FontAwesomeIcon key={i} icon="star" />)}</div>
                    <div>{Array(2).fill(0).map( (_, i) => <FontAwesomeIcon key={i} icon="star" />)}</div>
                    <div><FontAwesomeIcon icon="star" /></div>
                </div>
                <div className={styles.bars}>
                    <Bar width={props.stars.five}/>
                    <Bar width={props.stars.four}/>
                    <Bar width={props.stars.three}/>
                    <Bar width={props.stars.two}/>
                    <Bar width={props.stars.one}/>
                </div>
            </div>
            <hr />
            {context.account
                ? <div>
                    <div className={styles.reviewStars}>
                        <div>{Array(5).fill(0).map( (_, i) => (
                            <span 
                                className={i+1 > score ? "" : styles.filledStar }
                                onClick={() => setScore(i+1)}
                                key={i}
                            >
                                <FontAwesomeIcon icon="star" />
                            </span>
                        ))} {score} Stars</div>
                    </div>
                    <Input 
                        type="textarea"
                        label="Review"
                        handler={evt => setReview(evt)}
                    />
                    <button 
                        className="btn teal-button"
                        onClick={() => submit(context.account.id)}
                    >Submit Review</button>
                </div>
                : null}
            <div>
                {props.reviews.reverse().map((review, i) =>(
                    <div className={styles.review} key={i}>
                        <h5 className={styles.filledStar}> {review.score} <FontAwesomeIcon icon="star" /> | {review.customer_name}</h5>
                        <p>{review.review}</p>
                    </div>
                ))}

            </div>
            <Modal 
                title="Review"
                content={message}
                show={showModal}
                dismiss={() => {setShowModal(false); setMessage("")}}
            />
        </div>
        )}</Context.Consumer>       
    )
}