import Footer from "./footer"
import NavBar from "./nav"
import styles from "../styles/layout.module.css"
import {useEffect, useState} from "react"
import axios from "axios"

export default function Layout({children, ...props}) {
    const [config, setConfig] = useState(null)
    useEffect(() => {
        axios.get("/api/about/")
            .then(res => {
                setConfig(res.data)
            })
    }, [])
    return (
        <>
            <NavBar config={config} account={props.account} />
            <main className={styles.main}>
                {children}
                <Footer config={config}/>
            </main>
        </>
    )
}