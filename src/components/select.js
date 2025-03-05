import styles from "../styles/components.module.css"

export default function Select(props) {

    return (<div className={styles.input}>
        <label>{props.label}</label>
        <select onChange={(evt) => props.handler(evt.target.value)}>
            {props.options.map(opt  => (<option selected={opt.value===props.selected} value={opt.value}>{opt.label}</option>))}
        </select>
    </div>)
}