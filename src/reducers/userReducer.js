export default function userStore(state = {}, action){

    switch(action.type) {
        case 'LOAD_DATA' : 
            let data = action.data;
            return Object.assign({}, state, data);

        case 'CHANGE_USER':
            let usrId = action.userId;
            let ctSt = JSON.parse(JSON.stringify(state));
            let rtnSt = updateUser(ctSt, usrId);
            return rtnSt;

        case 'CHANGE_FOLLOWER':
            let userId = action.userId;
            let crntState = JSON.parse(JSON.stringify(state));
            let rtrnState = updateFolloState(crntState, userId);
            return rtrnState;

        case 'POST_COMMENT':
            let coment = action.content;
            let cntSt = JSON.parse(JSON.stringify(state));
            let rtState = updatePosts(cntSt, coment);

            return rtState;

        default:
    }

    return state;
}

function updateUser(state, userId) {
    let userList = state.users;
    let cngUser = userList.find(x => x.userId === userId);
    console.log(cngUser);
    let proState = state.profile;
    proState.profileName = cngUser.userName;
    proState.profileImg = cngUser.userImg;
    proState.profileId = cngUser.userId;
    state.profile = proState;

    return state;
}

function updateFolloState(state, userId) {
    let followersList = state.followUsers;
    for(var f=0; f<followersList.length; f++){
        if(followersList[f].userId === userId){
            followersList[f].isFollow = followersList[f].isFollow ? false : true;
        }
    }
    let isFollowCount = followersList.filter(x => x.isFollow === true).length;
    state.profile.following = isFollowCount;
    state.followUsers = followersList;

    return state;
}

function updatePosts(state, coment) {
    let postsList = state.posts;
    postsList.unshift(coment);
    state.posts = postsList;
    state.profile.posts = postsList.length;

    return state;
}