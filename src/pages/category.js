import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Card from "../components/product"
import styles from "../styles/department.module.css"
import Filters from "../components/filters"
import EmptyList from "../components/empty_list"
import { BASE_URL } from "../constants"
import Spinner from "../components/spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default  function Category(props) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [img, setImg ] = useState(null)
    const [description, setDescription ] = useState("")
    const [name, setName ] = useState("Category")
    const {id} = useParams()
    const [page, setPage] = useState(1)

    useEffect(() => {
        if(!id) {
            return
        }
        axios.get(`${BASE_URL}/category/${id}`)
            .then(res => {
                setProducts(res.data.products || [])
                setName(res.data.name)
                setDescription(res.data.description)
                setImg(res.data.image)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [id]);

    const goToPage = () => {

        setLoading(true)
        axios.get(`${BASE_URL}/product/?page=${page}&category=${id}`)
            .then(res => {
                setProducts(res.data.results || [])
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(goToPage, [page])


    return (
        <div>
            <h1>{name}</h1>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <img src={img}/>
                    <hr />
                    <p>{description}</p>
                    
                    <Filters setProducts={setProducts}/>
                </div>
                <div className={styles.products}>
                    {loading && <Spinner />}
                    {!loading && products.length === 0 && <EmptyList message="This category has no items!" />}
                    
                    <div className={styles.productList}>
                        {products.map(p => <Card key={p.name} {...p}/>)}
                    </div>
                    {products && (
                        <div className={styles.pageButtons}>
                            {page > 1 && <button onClick={() => setPage(page - 1)} ><FontAwesomeIcon icon={'angle-left'} /> Previous Page</button>}
                            <button onClick={() => setPage(page + 1)}>Next Page <FontAwesomeIcon icon={'angle-right'} /></button>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    )
}