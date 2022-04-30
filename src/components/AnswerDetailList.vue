<template>
    <QuestionDetailItem :questiondata="qaData.question"></QuestionDetailItem>
    <br>
    <el-button type="primary" @click="btnAnswer"><el-icon><edit /></el-icon></el-button>

    <el-divider></el-divider>

    <div v-if="isNoAnyAnswer">There is no answer yet</div>

    <p v-for="(answer, index) in qaData.answer" class="scrollbar-demo-item">
        <AnswerDetailItem :answerdata="answer"></AnswerDetailItem>
        <br>
        <SupportAndCommentDetail :answerid="answer.Id"></SupportAndCommentDetail>
        
        <span style="float: right;"><el-icon><clock /></el-icon>&nbsp;{{answer.Created}}</span>
        <el-divider />
    </p>
    
</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue";
import AnswerDetailItem from "./item/AnswerDetailItem.vue";
import SupportAndCommentDetail from "./SupportAndCommentDetail.vue";

export default {
    data() {
        return {
            qaData: {
                question: "",
                answer: []
            },
            isLogin: localStorage.getItem("isLogin"),
            token: localStorage.getItem("token"),
            isNoAnyAnswer: false
        }
    },
    mounted() {
        let url = window.location.href.replace("3000", "8080")
        console.log("url23464574: ", url);
        this.$axios
            .get(url)
            .then( res => {
                console.log("res: ", res)
                if (res.data.code == 0) {
                    this.qaData = res.data.data

                    console.log("this.qaData: ", this.qaData);
                    if (res.data.data.answer === null) {
                        // console.log("has no answer yet")
                        this.isNoAnyAnswer = true
                        // alert("has no answer yet")
                        // this.$router.push("/404")
                    } 
                }
        });
        
    },
    methods: {
        btnAnswer() {
            if (localStorage.isLogin != "true") {
                alert("please log in")
                this.$router.push("/user/login")
            } else {
                let tmpUrl = window.location.href.split("/");
                let url = tmpUrl[tmpUrl.length - 1];
                console.log(url + "/answer/new");
                this.$router.push(url + "/answer/new");
            }            
        },
        btnSupport(aid) {
            let url = window.location.href + '/answer/' + aid + '/support'
            
            let uid = localStorage.getItem("uid") 
            console.log("uid: ", uid, "clicked btnSupportToAid: ", aid);

        },
        btnComment(aid) {
            let uid = localStorage.getItem("uid") 
            console.log("uid: ", uid, "clicked btnCommentToAid: ", aid);
        }
    },
    components: { AnswerDetailItem, QuestionDetailItem, SupportAndCommentDetail },

}
</script>