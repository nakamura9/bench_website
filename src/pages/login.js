import Input from "../components/input"
import formStyles from "../styles/forms.module.css"
import {Link, redirect} from "react-router-dom"
import {useReducer, useEffect, useState} from "react"

import axios from "axios"
import Modal from "../components/modal"
import Captcha from "../components/captcha"

const reducer = (state, action) => {
    const newState = {...state}
    if(action.type == "toggle") {
        newState.showModal = !state.showModal
    } else {
        newState[action.field] = action.value
    }
    return newState
}

export default  function Login(props) {
    const [captchaValid, setCaptchaValid] = useState(false)
    const [state, dispatch] = useReducer(reducer, {
        username: "",
        password: "",
        showModal: false
    })


    const submit = () => {
        if(!captchaValid) {
            alert("Invalid Captcha!")
            return
        }
        axios({
            url: "/api/login",
            method: "GET",
            params: state
        }).then(res => {
            if(res.data.token) {
                redirect("/account/")
            } else {
                dispatch({type: "toggle"})
            }
        }).catch(err => {
            dispatch({type: "toggle"})
        })
    }

    return (
        <div className={formStyles.container}>
            <div className={formStyles.card}>
                <h1>Sign In</h1>
                <Input 
                    label="Username"
                    name="username"
                    type="text"
                    value={state.username}
                    handler={(val) => dispatch({field: "username", value: val})}
                />
                <Input 
                    label="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    handler={(val) => dispatch({field: "password", value: val})}
                />
                <Captcha validate={setCaptchaValid} />
                <p>Don"t have an account? <Link href="/sign_up"><b>Sign Up</b></Link></p>
                <button
                    className={formStyles.button}
                    onClick={submit}
                >
                    Login
                </button>
            </div>
            <Modal 
                title="Error"
                content="Failed to authenticate user."
                show={state.showModal}
                dismiss={() => dispatch({type: "toggle"})}
                />
        </div>
    )
}