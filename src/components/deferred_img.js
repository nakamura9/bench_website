import {useEffect, useState} from "react"

export default function DeferredImg (props) {
    const [src, setSrc] = useState("")
    useEffect(() => {
        if(props.src) {
            setTimeout(() => setSrc(props.src), props.delay)
        }
    }, [props.src])

    return <img src={src} width={props.width} />
}