import React, {useEffect} from 'react'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import '../styles/Root.css'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/spinner'
import { BASE_URL } from '../constants'

const styles = {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}

const Root = (props) => {
    const [config, setConfig] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        axios.get(`${BASE_URL}/settings/1/`)
            .then(res => {
                setConfig(res.data)
                setLoading(false)
            })
    }, [])

    if(loading) {
        return <div style={styles}>
            <Spinner />
            <p>Loading...</p>
        </div>
    }

    return (
        <main>
            <Navbar config={config} />
            <div className="root-content">
                <Outlet />
            </div>
            <Footer config={config} />
        </main>
    )
}

export default Root