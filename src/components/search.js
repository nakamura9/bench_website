import React, {useState} from 'react'
import styles from '../styles/components.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { BASE_URL } from '../constants'
import {Link} from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

export default function Search(props) {
    const [results, setResults] = useState([])
    const [show, setShow] = useState(false)
    const [searching, setSearching] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const search = (val) => {
        if(!val || val.length < 3) {
          setShow(false)
          setResults([])
          return
        }
        setShow(true)
        setSearching(true)
        axios({
          url: `${BASE_URL}/product`, 
          params: {name__icontains: val}
        }).then(res => {
            setResults(res.data)
            setSearching(false)
        })
      }
    return (
        <div className={styles.searchContainer} style={{width: `${expanded ? 200 : 40}px`}}>
            <div className={styles.search}><input 
              type="text"
              placeholder="Search..."
              onChange={evt => search(evt.target.value)}
              onBlur={() => setTimeout(() => setShow(false), 500)}
            />
            <button onClick={() => setExpanded(!expanded)}>
              <FontAwesomeIcon icon="search" />
            </button>
            </div>
             {show && expanded
                ? <div className={styles.results}>
                    {results.length > 0 
                        ? results.map((res, i) => (
                            <div className={styles.result} key={i}>
                                <div>
                                <img src={res.img} />
                                </div>
                                <div>
                                <Link to={`/product/${res.id}`}><h4>{res.name} </h4></Link>
                                <p>{res.description}</p>
                                </div>
                            </div>))
                        : (<div className={styles.pendingSearchWindow}>
                            {searching ? <TailSpin /> : <p>No results found</p>}
                        </div>)}
                  </div>
                : null
            }
            
    </div>
    )
}