import Input from "../components/input"
import formStyles from "../styles/forms.module.css"
import {useReducer, useEffect, useState} from "react"
import axios from "axios"
import Modal from "../components/modal"
import {Link, redirect} from 'react-router-dom'
import Captcha from "../components/captcha"



const reducer = (state, action) => {
    const newState = {...state}
    if(action.type === "toggle") {
        newState.showModal = !state.showModal
        newState.error_msg = action.value
        newState.error_title = action.title ? action.title : "Error"
    } else {
        newState[action.field] = action.value
    }
    return newState
}

export default  function SignUp(props) {
    const [captchaValid, setCaptchaValid] = useState(false)

    const [state, dispatch] = useReducer(reducer, {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: "",
        error_msg: "",
        error_title: "Error",
        showModal: false
    })



    const submit = () => {
        if(!captchaValid) {
            alert("Invalid Captcha!")
            return
        }
        const params = {...state}
        delete params.error_msg
        delete params.error_title
        delete params.showModal
        axios({
            url: "/api/sign_up",
            method: "GET",
            params: state
        }).then(res => {
            console.log(res)
            if(res.data.error) {
                const errors = res.data.message 
                    ? Object.values(res.data.message)
                        .map(err => `- ${err}`).join("\n")
                    : "An error occured"
                dispatch({type: "toggle", value: errors})
            } else {
                dispatch({type: "toggle", value: "Account created successfully.", title: "Success!"})
                setTimeout(() => redirect("/login/"), 1000)
            }
            
        }).catch(err => {
            dispatch({type: "toggle", value: "Failed to sign up for an account because of an error."})
        })
    }
    return (
        <div className={formStyles.container}>
            <div className={formStyles.card}>
                <h1>Create Account</h1>
                <Input 
                    label="First Name"
                    name="first_name"
                    type="text"
                    value={state.first_name}
                    handler={(val) => dispatch({field: "first_name", value: val})}
                />
                <Input 
                    label="Last Name"
                    name="last_name"
                    type="text"
                    value={state.last_name}
                    handler={(val) => dispatch({field: "last_name", value: val})}
                />
                <Input 
                    label="User Name"
                    name="username"
                    type="text"
                    value={state.username}
                    handler={(val) => dispatch({field: "username", value: val})}
                />
                <Input 
                    label="Your Email Address"
                    name="email"
                    type="text"
                    value={state.email}
                    handler={(val) => dispatch({field: "email", value: val})}
                />
                <Input 
                    label="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    handler={(val) => dispatch({field: "password", value: val})}
                />
                <Input 
                    label="Repeat Password"
                    name="confirm_password"
                    type="password"
                    value={state.confirm_password}
                    handler={(val) => dispatch({field: "confirm_password", value: val})}
                />
                <Captcha validate={setCaptchaValid} />
                <p>Already have an account? <Link href="/login"><b>Login</b></Link></p>
                <button 
                    className={formStyles.button}
                    onClick={submit}
                >
                    Sign Up
                </button>
                <Modal 
                    title={state.error_title}
                    content={state.error_msg}
                    show={state.showModal}
                    dismiss={() => dispatch({type: "toggle", value:""})}
                />
            </div>
        </div>
    )
}