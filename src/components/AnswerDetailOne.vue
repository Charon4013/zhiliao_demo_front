<template>
    <!-- <h2>Question Detail One</h2> -->
    <QuestionDetailItem :questiondata="qaData.question"></QuestionDetailItem>
    
    <el-divider></el-divider>
    <h2>User Answer</h2>
    <p class="scrollbar-demo-item">
        <AnswerDetailItem :answerdata="qaData.answer"></AnswerDetailItem>
        <SupportAndCommentDetail :answerid="qaData.answer.Id"></SupportAndCommentDetail>
    </p>

    <el-divider></el-divider>
    <NewComment></NewComment>

    <el-divider></el-divider>
    <h2>Comment List</h2>
    <p v-if="this.commentList.length != 0" v-for="(commentitemdata, index) in commentList" :key="index" class="scrollbar-demo-item">
        <div>#{{ index+1 }}:</div>
        <CommentDetailItem :commentitem="commentitemdata"></CommentDetailItem>
        <CommentSupportDetailItem :commentid="commentitemdata.Id"></CommentSupportDetailItem>
    </p>
    <p v-else>No comment yet</p>

</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue";
import AnswerDetailItem from "./item/AnswerDetailItem.vue";
import SupportAndCommentDetail from "./SupportAndCommentDetail.vue";
import NewComment from "./NewComment.vue";
import CommentDetailItem from "./item/CommentDetailItem.vue"
import CommentSupportDetailItem from "./item/CommentSupportDetailItem.vue";

export default {
    data() {
        return {
            qaData: {
                question: "",
                answer: ""
            },
            isLogin: localStorage.getItem("isLogin"),
            token: localStorage.getItem("token"),
            commentList: [],
        }
    },
    mounted() {
        let tmpUrl = window.location.href.split("/")
        let qid = tmpUrl[tmpUrl.length - 3]
        let aid = tmpUrl[tmpUrl.length - 1]
        let url = "/question/" + qid + "/answer/" + aid
        console.log("url23456789: ", url);
        this.$axios
            .get(url)
            .then( res => {
                console.log("res.data: ", res.data)
                if (res.data.code == 0) {
                    this.qaData = res.data.data

                    console.log("this.qaData: ", this.qaData);
                    if (res.data.data.answer === null || res.data.data.answer.Id === 0) {
                        this.$router.push("/404")
                    } 
                }
        });

        url = url + '/comment'
        console.log("url2: ", url)
        this.$axios
            .get(url)
            .then( res => {
                console.log("res232131 :", res);
                if (res.data.code == 0) {
                    this.commentList = res.data.data
                    console.log("res.data.data: ", res.data.data)
                }
        })
        
    },
    methods: {
        btnAnswer() {
            let tmpUrl = window.location.href.split("/");
            let url = tmpUrl[tmpUrl.length - 1];
            console.log(url + "/answer/new");
            this.$router.push(url + "/answer/new");
        },
        btnSupport(aid) {
            let url = window.location.href + '/answer/' + aid + '/support'
            
            let uid = localStorage.getItem("uid") 
            console.log("uid: ", uid, "clicked btnSupportToAid: ", aid);

        },
        btnComment(aid) {
            let uid = localStorage.getItem("uid") 
            console.log("uid: ", uid, "clicked btnCommentToAid: ", aid);
        },
    },
    components: { AnswerDetailItem, QuestionDetailItem, SupportAndCommentDetail, NewComment, CommentDetailItem, CommentSupportDetailItem },

}
</script>