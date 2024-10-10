
import styles from "../styles/Index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useState, useEffect} from "react"
import DepartmentCard from "../components/department_card"
import axios from "axios"
import Card from "../components/product"
import {Link} from "react-router-dom"
import Spinner from "../components/spinner"
import { ArticleCard } from "../components/blog"
import { BASE_URL } from "../constants"

export default function Index() {
  const [departments, setDepartments] = useState([])
  const [featured, setFeatured] = useState([])
  const [results, setResults] = useState([])
  const [articles, setArticles] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/index`)
            .then(res => {
              console.log(res.data.articles)
                setDepartments(res.data.departments)
                setFeatured(res.data.featured_items)
                setData(res.data.settings)
                setArticles(res.data.articles)
            }).catch(err => {
              console.log(err)
            })
  }, [])

  const search = (val) => {
    if(!val || val.length < 3) {
      setResults([])
      return
    }
    axios({
      url: `${BASE_URL}/product`, 
      params: {name__icontains: val}
    }).then(res => {
        setResults(res.data)    
    })
  }


  return (
    <div >
      <section className={styles.section} >
        <div 
          style={{backgroundImage: `url(${data ? data.home_page_background_image : ""})`}}
          className={styles.heroContainer}
        >
        <div className={styles.hero} >
          <h1>{data ? data.home_page_title : ""}</h1>
          <p>{data ? data.home_page_slogan : ""}</p>
          <div className={styles.search}>
            <input 
              type="text"
              placeholder="Search..."
              onChange={evt => search(evt.target.value)}
            />
            <button>
              <FontAwesomeIcon icon="search" />
            </button>
            {results.length > 0
              ? <div className={styles.results}>
                  {results.map((res, i) => (
                    <div className={styles.result} key={i}>
                        <div>
                          <img src={res.img} />
                        </div>
                        <div>
                          <Link to={`/product/${res.id}`}><h4>{res.name} </h4></Link>
                          <p>{res.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              : null
            }
            
          </div>
        </div>
        </div>
      </section>
      {departments.length > 0 && <section className={styles.section}>
        <h2>Explore</h2>
        <div className={styles.departmentCards}>
          {departments.map(dept => <DepartmentCard key={dept.id} {...dept} />)}
        </div>
      </section>}
      {featured.length > 0 && <section className={styles.section}>
        <h2>Featured</h2>
        <div className={styles.productList}>
          {featured.map(p => <Card key={p.name} {...p}/>)}
        </div>
      </section>}
      {articles.length > 0 && <section className={styles.section}>
        <h2>Latest Posts</h2>
        <div className={styles.productList}>
          {articles.map(p => <ArticleCard key={p.id} id={p.id} title={p.title} image={p.title_photo}/>)}
        </div>
      </section>}      
    </div>
  )
}
