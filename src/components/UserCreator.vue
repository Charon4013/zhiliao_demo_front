<template>
    <el-button @click="btnToQuestion">Question</el-button>
    <el-button @click="btnToAnswer">Answer</el-button>
    <el-divider />

    <el-scrollbar v-if="!questionShow">
        <h4>Your question:</h4>
        <p v-if="this.questionList.length != 0" v-for="(question, index) in questionList" :key="index" class="scrollbar-demo-item">
            <QuestionDetailItem :questiondata="question"></QuestionDetailItem>
            <br>
            <el-button type="primary" v-if="isUserOwn" @click="btnToModifyQuestion(question.Id)"><el-icon><edit /></el-icon></el-button>
            <el-button type="primary" v-if="isUserOwn" @click="btnToDeleteQuestion(question.Id)"><el-icon><delete /></el-icon></el-button>
            <el-divider />
        </p>
        <p v-else>You have not question yet</p>
    </el-scrollbar>

    <el-scrollbar v-if="!questionAnswerShow">
        <label>Your answer:</label>
        <p v-for="(qaData, index) in questionAnswerList" :key="index" class="scrollbar-demo-item">
            <strong style="font-size: larger;" @click="btnToAnswerDetail(qaData.answer)">{{qaData.question.title}}</strong>
            <AnswerDetailItem :answerdata="qaData.answer"></AnswerDetailItem>
            <br>
            <el-button type="primary" v-if="isUserOwn" @click="btnToModifyAnswer(qaData.answer.qid, qaData.answer.Id)"><el-icon><edit /></el-icon></el-button>
            <el-button type="primary" v-if="isUserOwn" @click="btnToDeleteAnswer(qaData.answer.Id)">删除回答</el-button>
            <el-divider />
        </p>
    </el-scrollbar>

    <!-- 尝试改用Tabs标签页 -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Question" @click="btnToQuestion">
            <div>{{questionList}}</div>
        </el-tab-pane>
        <el-tab-pane label="Answer" @click="btnToAnswer">
            <div>{{answerList}}</div>
        </el-tab-pane>
    </el-tabs> -->

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
                            // this.$router.push('/404')
                            console.log(this.questionList.length)
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
        },
    },

    components: { QuestionDetailItem, AnswerDetailItem }
}

</script>