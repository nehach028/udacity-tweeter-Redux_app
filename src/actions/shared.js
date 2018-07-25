import { getInitialData } from  '../utils/api'
import { receiveUsers } from '../actions/users';
import { receiveTweets } from '../actions/tweets';
import { setAuthedUser } from "../actions/authedUser";
import { hideLoading, showLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'
export function handelInitialData(){
    return(dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
            .then(({users,tweets})=>{
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}