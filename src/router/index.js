import { createRouter, createWebHistory } from "vue-router"

import UserLogin from '../components/UserLogin.vue'
import Explore from '../components/Explore.vue'
import UserInfo from '../components/UserInfo.vue'
import NewQuestion from '../components/NewQuestion.vue'
import Home from '../components/Home.vue'
import QuestionWaiting from '../components/QuestionWaiting.vue'
import UserCreator from '../components/UserCreator.vue'
import NewAnswer from '../components/NewAnswer.vue'
import PageNotFound from '../components/PageNotFound.vue'
import Auth from '../components/Auth.vue'
import Navbar from '../components/Navbar2.vue'
import AnswerDetailList from '../components/AnswerDetailList.vue'
import AnswerDetailOne from '../components/AnswerDetailOne.vue'
import QuestionSearch from '../components/QuestionSearch.vue'
import Manage from '../components/Manage.vue'
import Editor from '../components/item/TextEditor.vue'
import ImgUploadSupport from '../components/ImgUploadSupport.vue'
import ModifyAnswer from '../components/ModifyAnswer.vue'
import ModifyQuestion from '../components/ModifyQuestion.vue'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/explore',
        component: Explore
    },
    // {
    //     path: '/follow',
    //     component: Follow
    // },
    {
        path: '/user/login',
        component: UserLogin
    },
    {
        path: '/user/:uid',
        component: UserInfo
    },
    {
        path: '/user/:uid/creator',
        component: UserCreator
    },
    {
        path: '/question/waiting',
        component: QuestionWaiting
    },
    {
        path: '/question/new',
        component: NewQuestion
    },
    {
        path: '/question/:qid',
        component: AnswerDetailList
    },
    {
        path: '/question/:qid/modify',
        component: ModifyQuestion
    },
    {
        path: '/question/:qid/answer/new',
        component: NewAnswer
    },
    {
        path: '/question/:qid/answer/:aid',
        component: AnswerDetailOne
    },
    {
        path: '/question/:qid/answer/:aid/modify',
        component: ModifyAnswer
    },
    {
        path: '/404',
        component: PageNotFound
    },
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/navbar',
        component: Navbar
    },
    {
        path: '/question/search/:str',
        component: QuestionSearch
    },
    {
        path: '/manage',
        component: Manage
    },
    {
        path: '/editor',
        component: Editor
    },
    {
        path: '/support/imgupload',
        component: ImgUploadSupport
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})

