import {useState} from 'react';

export default function useModal(props) {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    const toggle = (msg) => {
        setShow(!show)
        setMessage(msg)
    }
    const obj = {
        show: show,
        message: message
    }
    
    return {toggle, show} 
}