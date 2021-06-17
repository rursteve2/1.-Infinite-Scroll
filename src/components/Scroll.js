import React, {useState, useEffect, useRef, useCallback} from 'react'
import FetchData from './FetchData'
import LoadingIcon from '../Pulse-1.1s-200px.svg'

export default function Scroll() {
    const [page, setPage] = useState(0)
    const [comments, toggleComments] = useState(false)
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
                <div key={i} style={{backgroundColor: el.dominant_color}} className="pin">
                    <div className='imagelink'>
                        <img id={el.image_signature} className='mainimg' alt='' src={el.images['736x'].url} />
                        <a href={el.link} target="_blank" rel='noreferrer' className='hoverdomainlink'>
                            {el.domain}
                        </a>
                    </div>
                    <div className='pininfo'>
                    <a href="#"><svg className="pininfoicon" height="20" width="20" viewBox="0 0 24 24" aria-label="More options" role="img"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path></svg></a>
                    <a href={el.images.orig.url + '?force=true'} download target="_blank" rel='noreferrer'><svg className="pininfoicon" height="20" width="20" viewBox="0 0 24 24" aria-label="Send" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg></a>
                        <a href={el.link} className='domainlink'>
                            <p>{el.domain}</p>
                        </a>
                        <h5 className='title'>{el.title ? el.title : ''}</h5>
                        <p className='description'>{el.description}</p>
                        <p className='likes'>Likes: {el.like_count}</p>
                        <p className='pintimes'>Pinned {el.repin_count} times</p>
                        <p className='pinuser'>By:
                            <a className='pinusername' target="_blank" rel='noreferrer' href={`https://www.pinterest.com/${el.pinner.username}`}>
                                {el.pinner.username}
                            </a>
                        </p>
                    </div>
                        <div className='commentcontainer'>
                            {el.comments.data[0] ? <a className='commentnumber' onClick={() => toggleComments(comments ? false : true)}><h5>Comments: {el.comments.data.length}</h5></a> : ''}
                            {el.comments.data[0] ? el.comments.data.map((item, j) => (
                            <div key={j} className='singlecomment' style={comments ? {display: 'flex'} : {display: 'none'}}>
                                <img className='usercommentphoto' alt='' src={'https://via.placeholder.com/48'} />
                                <div className='usercommentcontainer'>
                                    <a className='commentusername' target="_blank" rel='noreferrer' href={`https://www.pinterest.com/${item.commenter.username}`}>
                                        <p>{item.commenter.username}</p>
                                    </a>
                                    <p className='commenttext'>{item.text}</p>
                                </div>
                                
                            </div>
                            )) : null}
                        </div>
                </div>
            ))}
            </div>
            <div ref={loadingRef}>
                <img src={LoadingIcon} alt='Loading...'/>
            </div>
        </div>
    )
}
