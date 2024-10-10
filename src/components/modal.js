import styles from '../styles/components.module.css'


export default function Modal(props) {
    return(
        <div className={styles.modal_container} style={{display: props.show ? "block" : "none"}}>
            <div className={styles.modal}>
                <div>
                    <h2>{props.title}</h2>
                </div>
                <div>
                    {props.content}
                    <div className={styles.modal_btn}>
                        <button 
                            className="btn teal-button"
                            onClick={props.dismiss}
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}