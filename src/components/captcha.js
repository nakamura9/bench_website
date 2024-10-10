import {useState, useRef, useEffect} from 'react'
import styles from '../styles/components.module.css'

export default function Captcha(props) {
    const [value, setValue] = useState("")
    const [target, setTarget] = useState(0)
    const [valid, setValid] = useState(false)
    const canvasRef = useRef()

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.font = "48px serif"
        // range of 10 - 40 and range of 0 - 10
        const first =  Number.parseInt(10 + (Math.random() * 30))
        const second =  Number.parseInt( (Math.random() * 20))

        context.fillText(`${first} + ${second}=`, 20, 75, 80)
        setTarget(first+second)

    }, [])

    const onInput = (evt) => {
        setValue(evt.target.value)
        setValid(parseInt(evt.target.value) == target)
        if(props.validate) {
            props.validate(parseInt(evt.target.value) == target)
        }
        console.log(parseInt(evt.target.value) == target)
    } 

    return (
        <div className={styles.input}>
            <canvas ref={canvasRef} width={200} height={100}>

            </canvas>
            <br />
            <label htmlFor="">Captcha:</label><br />
            <input 
                type="text" 
                value={value}
                onChange={onInput}
            />
        </div>
    )
}