export function loadData(dispatch, data){
    dispatch({
        type: 'LOAD_DATA',
        data
    })
}

export function changeUser(dispatch, userId){
    dispatch({
        type: 'CHANGE_USER',
        userId
    })
}

export function changeFollower(dispatch, userId){
    dispatch({
        type: 'CHANGE_FOLLOWER',
        userId
    })
}

export function postComment(dispatch, content){
    dispatch({
        type: 'POST_COMMENT',
        content
    })
}