import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useEffect, useState} from "react"

export default function DeferredImg (props) {
    const [src, setSrc] = useState("")
    useEffect(() => {
        if(props.src) {
            setTimeout(() => setSrc(props.src), props.delay)
        }
    }, [props.src])

    if([null, ""].includes(src)) {
        return <FontAwesomeIcon color="#ccc" icon="image" size="10x" />
    }
    return <img src={src} width={props.width} />
}