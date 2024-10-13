import styles from "../styles/about.module.css"
import {useState, useEffect, useReducer, useContext} from "react"
import axios from "axios"
import LeafletMap from '../components/map'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Spinner from "../components/spinner"
import Captcha from "../components/captcha"
import Input from "../components/input"
import Context from "../utils/context"
import { BASE_URL } from "../constants"


const reducer = (state, action) => {
    const newState = {...state}
    if(action.field === "__all") {
        newState['name'] = ""
        newState['email'] = ""
        newState['message'] = ""
    } else {
        newState[action.field] = action.value
    }
    return newState
}

export default  function Contact(props) {
    const context = useContext(Context)

    const [data, setData] = useState(null)
    const [captchaValid, setCaptchaValid] = useState(false)
    const [location, setLocation] = useState([-17.8216, 31.0492])
    const [state, dispatch] = useReducer(reducer, {
        name: "",
        email: "",
        message: ""
    })


    useEffect(() => {
        axios.get(`${BASE_URL}/settings/1/`)
            .then(res => {
                setData(res.data)
                if(res.data.business_gps) {
                    const split = res.data.business_gps.split(",")
                    if(split.length === 2) {
                        setLocation(split)
                    }
                }
            })
    }, [])

    const submit = () => {
        if(!captchaValid) {
            context.renderMessage("Invalid Captcha!")
            return
        }
        if(!state.message || !state.email || !state.name) {
            context.renderMessage("A required field is missing.")
            return
        }
        
        axios({
            url: "/api/submit_contact_form",
            method: "GET",
            params: state
        }).then(res => {
           context.renderMessage("Thank you for getting in touch with us.")
           dispatch({field: "__all"})
        }).catch(err => {
            context.renderMessage("An error occured while sending your message. Please try again later.")
        })
    }

    if(!data) {
        return <Spinner />
    }
    return (
        <div>
            <h1>Contact Us</h1>
            <div className={styles.container}>
                <div>
                <Input 
                    label="Your Name"
                    name="name"
                    type="text"
                    value={state.name}
                    handler={(val) => dispatch({field: "name", value: val})}
                />
                <Input 
                    label="Email"
                    name="email"
                    type="text"
                    value={state.email}
                    handler={(val) => dispatch({field: "email", value: val})}
                />
                <Input 
                    label="Message"
                    name="message"
                    type="textarea"
                    value={state.message}
                    handler={(val) => dispatch({field: "message", value: val})}
                />
                <Captcha validate={setCaptchaValid} />
                <button 
                    className="btn teal-button"
                    onClick={submit}
                >
                        Submit
                </button>
                </div>
                <div>
                    <h3><FontAwesomeIcon icon="home"/> Address</h3>
                    <LeafletMap long={location[0]} lat={location[1]}/>
                    <p style={{whiteSpace:"pre"}}>{data.company.address}</p>
                    <h3>Contact</h3>
                    <h5><FontAwesomeIcon icon="at"/> Email</h5>
                    <span>{data.company.email}</span>
                    <h5><FontAwesomeIcon icon="phone"/> Phone</h5>
                    <span>{data.company.telephone}</span>
                </div>
            </div>
        </div>
    )
}