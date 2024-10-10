import styles from "../styles/blog.module.css"
import {useState, useEffect} from "react"
import Input from "../components/input"
import axios from "axios"
import { Tag, Author, ArticleCard } from "../components/blog"
import Spinner from "../components/spinner"
import { BASE_URL } from "../constants"

export default  function Blog(props) {
    const [articles, setArticles] = useState([])
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const [authors, setAuthors] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/blog`)
            .then(res => {
              console.log(res.data)
                setArticles(res.data)
                if(res.data.length > 0) {
                    setTags(res.data[0].all_tags)
                    setAuthors(res.data[0].writers)
                }
            })
    }, [])

    if(articles.length == 0) {
        return <Spinner />
      }

    return (
        <div>
            <div className={styles.header}>
                <h1>Welcome to the Blog!</h1>
                <div className={styles.inlineSearch}>
                    <Input 
                        label="Search"
                        name="search"
                        handler={setSearch}
                        />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h3>Tags</h3>
                    {tags.map(t => <Tag key={t} name={t} />)}
                    <Input 
                      label="Search"
                      name="search"
                      handler={setSearch}
                    />
                    <div className={styles.tags}>

                    </div>
                </div>
                <div className={styles.content}>
                    <h2>Articles</h2>
                    <div className={styles.articles}>
                        {articles && articles.map(a => <ArticleCard 
                                                image={a.title_photo}
                                                title={a.title}
                                                author={a.author.name}
                                                id={a.id}
                                                key={a.id}
                                            />)}
                    </div>
                    <h2>Authors</h2>
                    <div className={styles.authors}>
                        {authors.map(author => <Author 
                                                  src={author.photo}
                                                  name={author.name}
                                                  bio={author.bio}
                                                  key={author.name}
                                                />)}
                    </div>
                </div>
            </div>
        </div>
    )
}