import styles from "../styles/about.module.css"
import {useState, useEffect} from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import Spinner from "../components/spinner"
import { BASE_URL } from "../constants"


export default  function About(props) {
    const [data, setData] = useState(null)
  
    useEffect(() => {
        axios.get(`${BASE_URL}/settings/1/`)
            .then(res => {
                setData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    if(!data) {
        return <Spinner />
    }
    return (
        <div>
            <h1>About Us</h1>
            <div className={styles.container}>
                <div>
                    <h2 className="text-center">{data.company.name}</h2>
                    <hr />
                    {data.about_page_image ? <img src={data.about_page_image} /> : null}
                    <ReactMarkdown>{data.about_page_text}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}