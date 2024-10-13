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
                   <Link to={"/department/" + dept.id} className={styles.departmentName}><h4>{dept.name}</h4></Link>
                   <ul className={styles.categoryList}>
                       {dept.categories.map(cat => (
                           <Link to={`/category/${cat.id}/`}><li key={cat.name} >{cat.name}</li></Link>
                       ))}
                   </ul>
               </li>
           ))}
        </ul>
    </div>)
}