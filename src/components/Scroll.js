import React, {useState, useEffect, useRef, useCallback} from 'react'
import FetchData from './FetchData'

export default function Scroll() {
    const [page, setPage] = useState(0)
    const loadingRef = useRef(null)
    const { loading, error, list } = FetchData(page)

    const triggerObserver = useCallback((entries) => {
        const target = entries[0];
        console.log(target)
        if (target.isIntersecting) {
          setPage(prev => prev + 1);
        }
      }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshhold: 1
        }
        const observer = new IntersectionObserver(
            triggerObserver,
            options
        )
        if(loadingRef.current) observer.observe(loadingRef.current)
    }, [triggerObserver])

    if(error) {
        alert(error)
    }

    return (
        <div>
            <div>
            {list[0] && list.map((el, i) => (
                <div key={i} style={{backgroundColor: el.dominant_color}}>
                    <h5>{el.title ? el.title : 'No Title Provided'}</h5>
                    {/* <p>Uploaded: {el.created_at.toLocaleString('en-US')}</p> */}
                    <p>Likes: {el.like_count}</p>
                    <p>Pinned {el.repin_count} times</p>
                    <p>Pinned By: 
                        <a href={`https://www.pinterest.com/${el.pinner.username}`}>
                            {el.pinner.full_name}
                        </a>
                    </p>
                    <h6>Description: {el.description}</h6>
                    <a href={el.link}>
                    <img alt='' src={el.images['474x'].url} />
                    </a>
                    <div>
                        {el.comments.data[0] ? el.comments.data.map((item, j) => (
                        <div key={j}>
                            <p>{item.commenter.full_name}</p>
                            <p>{item.text}</p>
                            
                        </div>
                        )) : null}
                    </div>
                </div>
            ))}
            </div>
            <div ref={loadingRef}>
                <p>Loading...</p>
            </div>
        </div>
    )
}
