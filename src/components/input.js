import styles from "../styles/components.module.css"

export default function Input(props) {

    return (<div className={styles.input}>
        <label>{props.label}</label>
        {props.type == "textarea"
            ? <textarea 
                name={props.name}
                value={props.value}
                onChange={evt => props.handler(evt.target.value)}
              ></textarea>
            : <input 
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={evt => props.handler(evt.target.value)}
              />}
    </div>)
}