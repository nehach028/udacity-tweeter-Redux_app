import React , { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet  } from "../actions/tweets";

class Tweet extends  Component{
    toParent=(e,id)=>{
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }  
    handleLike=(e)=>{
        e.preventDefault()
        const { dispatch, tweet, authedUser }=this.props
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))

    }  
    render(){
        const {tweet} = this.props
        const { 
             name, avatar, hasLiked, likes, parent, text, id, timestamp, replies
        } = tweet
        if(tweet===null){
            return <p>This Tweet Does'nt exist</p>
        }
       
        return(
            <Link className='tweet' to={`/tweet/${id}`}>
                <img
                    src={avatar}
                    alt={'Avtar of ${name}'}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (<button className='replying-to' onClick={(e)=>this.toParent(e,parent.id)}>
                        Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={(e)=>this.handleLike(e)}>
                            {hasLiked=== true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon'/>
                            }
                        </button>
                        <span>{likes!==0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}
function mapStateToProps({ authedUser,users,tweets },{ id }){
    const tweet=tweets[id]
    const parentTweet=tweet?tweets[tweet.replyingTo]:null
    return {
        authedUser,
        tweet: tweet?formatTweet(tweet,users[tweet.author],authedUser,parentTweet):null

    }
}
export default withRouter(connect(mapStateToProps)(Tweet))