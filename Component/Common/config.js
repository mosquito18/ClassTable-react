'use strict'
//http://rapapi.org/mockjs/22491/api/comment?accessToken=ouxiaoje
const config={
    api:{
        base:'http://rapapi.org/mockjs/22491/',
        list:'api/list',
        video:'api/list/vedio',
        comment:'api/comment',
        comments:'api/comments',
        signup:'api/user/signup',
        verify:'api/user/verify',
        up:'api/up',

    },
    map:{
        method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
        follow: 20,
        timeout: 8000,
        size: 0,
    }
}

module.exports =config