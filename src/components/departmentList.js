import {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import styles from "../styles/components.module.css"
import { BASE_URL } from "../constants"


export default function DepartmentList (props) {
    const [departments, setDepartments] = useState([])
        useEffect(() => {
            axios.get(`${BASE_URL}/department/`)
                    .then(res => {
                        setDepartments(res.data)
                    })
    }, [])
    
    return (<div>
        <ul className={styles.departmentList}>
           {departments.map(dept => (
               <li key={dept.name}>
                   <Link to={"/department/" + dept.id}>{dept.name}</Link>
                   <ul className={styles.categoryList}>
                       {dept.categories.map(cat => (
                           <li key={cat.name}><Link to={`/category/${cat.id}/`}>{cat.name}</Link></li>
                       ))}
                   </ul>
               </li>
           ))}
        </ul>
    </div>)
}