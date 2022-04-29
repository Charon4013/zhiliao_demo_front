<template>

        <p v-for="(qaItem, index) in data" :key="index">
            <div>
                <el-link :underline="false" @click="divToQuestionDetail(qaItem.question.Id)"><strong style="font-size: larger;">{{qaItem.question.title}}</strong></el-link>
                
                <AnswerDetailItem :answerdata="qaItem.answer"></AnswerDetailItem>
                <br>
                <el-button type="text" disabled><el-icon><caret-top /></el-icon>&nbsp;{{qaItem.support_count}}</el-button>
                <el-button type="text" disabled><el-icon><chat-square /></el-icon>&nbsp;{{qaItem.comment_count}}</el-button>          
            </div>   
            <br> 
        </p>

</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue"
import AnswerDetailItem from "./item/AnswerDetailItem.vue"
import SupportAndCommentDetail from "./SupportAndCommentDetail.vue"
    export default {
        data() {
            return {
                data: []
            }
        },
        mounted() {
            let url = "/main/explore"
            this.$axios
                .get(url)
                .then( res => {
                    if (res.data.code == 0) {
                        this.data = res.data.data
                    }
                })
        },
        components: { QuestionDetailItem, AnswerDetailItem, SupportAndCommentDetail },
        methods: {
            divToQuestionDetail(qid) {
                let url = '/question/' + qid
                this.$router.push(url)
            }
        },
    }
</script>

<style scoped>
div {
    border-bottom:1px solid; 
    border-color: #E4E7ED; 
}

.el-link {
    font-size: large;
}

</style>
