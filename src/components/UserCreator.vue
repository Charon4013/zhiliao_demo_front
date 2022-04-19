<template>
    <el-button @click="btnToQuestion">Question</el-button>
    <el-button @click="btnToAnswer">Answer</el-button>
    <el-divider />

    <el-scrollbar v-if="!questionShow">
        <label>Your question:</label>
        <p v-for="(question, index) in questionList" :key="index" class="scrollbar-demo-item">
            <QuestionDetailItem :questiondata="question"></QuestionDetailItem>
            <el-button type="primary" v-if="isUserOwn" @click="btnToModifyQuestion(question.Id)">修改问题</el-button>
            <el-button type="primary" v-if="isUserOwn" @click="btnToDeleteQuestion(question.Id)">删除问题</el-button>
            <el-divider />
        </p>
    </el-scrollbar>


    <el-scrollbar v-if="!questionAnswerShow">
        <label>Your answer:</label>
        <p v-for="(qaData, index) in questionAnswerList" :key="index" class="scrollbar-demo-item">
            <strong style="font-size: larger;" @click="btnToAnswerDetail(qaData.answer)">{{qaData.question.title}}</strong>
            <AnswerDetailItem :answerdata="qaData.answer"></AnswerDetailItem>
            <el-button type="primary" v-if="isUserOwn" @click="btnToModifyAnswer(qaData.answer.qid, qaData.answer.Id)">修改回答</el-button>
            <el-button type="primary" v-if="isUserOwn" @click="btnToDeleteAnswer(qaData.answer.Id)">删除回答</el-button>
            <el-divider />
        </p>
    </el-scrollbar>

</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue";
import AnswerDetailItem from "./item/AnswerDetailItem.vue";
import { timestamp } from "@antfu/utils";

export default {
    data() {
        return {
            questionList: "",
            questionShow: true,
            questionAnswerList: "",
            questionAnswerShow: true,
            isUserOwn: false,
        }    
    },
    mounted() {
        let tmpUrl = window.location.href.split("/")
        let uid = tmpUrl[tmpUrl.length - 2]
        if (uid == localStorage.uid) {
            this.isUserOwn = true
            console.log("this.isUserOwn", this.isUserOwn);
        }
    },
    methods: {
        btnToQuestion() {
            if (this.questionShow) {
                let tmpUrl = window.location.href.split("/")
                let uid = tmpUrl[tmpUrl.length - 2]

                console.log("uid: ", uid)
                let url = '/user/' + uid + '/question'

                this.$axios
                    .get(url)
                    .then(res => {
                        if (res.data.code == 0) {
                            console.log("UserQuestionData: ", res.data.data)
                            this.questionList = res.data.data
                        } else {
                            this.$router.push('/404')
                        } 
                })
            }
            this.questionShow = !this.questionShow
        },
        btnToAnswer() {
            if (this.questionAnswerShow) {
                console.log("get user answer");
                let tmpUrl = window.location.href.split("/")
                let uid = tmpUrl[tmpUrl.length - 2]

                console.log("uid: ", uid)
                let url = '/user/' + uid + '/answer'
                console.log("url:", url);

                this.$axios
                    .get(url)
                    .then(res => {
                        if (res.data.code == 0) {
                            console.log("UserQuestionData: ", res.data.data)
                            this.questionAnswerList = res.data.data
                        } else {
                            this.$router.push('/404')
                        } 
                })
            }
            this.questionAnswerShow = !this.questionAnswerShow
        },
        btnToAnswerDetail(answer) {
            let qid = answer.qid
            let aid = answer.Id
            console.log("qid, aid: ", qid, aid)
            let url = "/question/" + qid + "/answer/" + aid
            this.$router.push(url)
        },
        btnToModifyAnswer(qid, aid) {
            let url = "/question/"+ qid + "/answer/" + aid + "/modify"
            this.$router.push(url)
        },
        btnToModifyQuestion(qid) {
            let url = "/question/"+ qid + "/modify"
            this.$router.push(url)
        },
        btnToDeleteAnswer(aid) {
            let tmpUrl = window.location.href.split("/")
            let uid = tmpUrl[tmpUrl.length - 2]
            let url = "/user/" + uid + "/answer/delete/" + aid
            console.log(url)
            this.$axios
                .post(url)
                .then( res => {
                    console.log(res.data)
                    if (res.data.code != 0) {
                        alert("Delete fail")
                    } else {
                        this.$router.go(0)
                    }
                })
        },
        btnToDeleteQuestion(qid) {
            let tmpUrl = window.location.href.split("/")
            let uid = tmpUrl[tmpUrl.length - 2]
            let url = "/user/" + uid + "/question/delete/" + qid
            console.log(url)
            this.$axios
                .post(url)
                .then( res => {
                    console.log(res.data)
                    if (res.data.code != 0) {
                        alert("Delete fail")
                    } else {
                        this.$router.go(0)
                    }
                })
        }
    },

    components: { QuestionDetailItem, AnswerDetailItem }
}

</script>