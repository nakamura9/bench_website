import {useState, useEffect, useReducer, useRef} from "react"
import styles from "../styles/carousel.module.css"
import DeferredImg from "./deferred_img"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const reducer = (state, action) => {
    
    if(action.type == "set-count") {
        return ({...state, imageCount: action.value})
    }

    if(action.type == "nav-left") {
        return ({...state, currentImgIndex: state.currentImgIndex > 0 
                                                ? state.currentImgIndex - 1: 0})
    }

    if(action.type == "nav-right") {
        return ({...state, currentImgIndex: state.currentImgIndex < state.imageCount - 1
                                ? state.currentImgIndex + 1: 0})
    }
}


export default function Carousel(props) {
    const [state, dispatch] = useReducer(reducer, {
        currentImgIndex: 0,
        imageCount: props.img_list.length
    })

    const TrainRef = useRef()

    useEffect(()=> {
        dispatch({type:"set-count", value: props.img_list.length})

    }, [props.img_list])

    useEffect(()=> {
        TrainRef.current.scroll({
            top: 0, 
            left: state.currentImgIndex * props.container.current.offsetWidth,
            behavior: "smooth"
        })

    }, [state.currentImgIndex])


    return (
        <div className={styles.carouselRoot}>
            <div className={styles.carouselContainer} ref={TrainRef}>
            <div className={styles.carouselTrain}>
                    {props.img_list.map((img, i) => (
                        <div className={styles.carouselImg} key={i}>
                            <DeferredImg 
                                
                                delay={(i) * 500}
                                src={img}
                                width={props.container.current.offsetWidth}
                            />
                        </div>
                    ))}
            </div>
        </div>
            <div className={styles.carouselLeft}>
                <FontAwesomeIcon 
                    icon="angle-left" 
                    onClick={() => dispatch({type:"nav-left"})}
                />
            </div>
            <div className={styles.carouselRight}>
                <FontAwesomeIcon 
                    icon="angle-right" 
                    onClick={() => dispatch({type:"nav-right"})}
                />
            </div>
        </div>
        
    )
}