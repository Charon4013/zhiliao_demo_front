<template>
    <el-scrollbar>
        <p v-for="(qaItem, index) in data" :key="index">
            <div @click="divToQuestionDetail(qaItem.question.Id)">
                <!-- <QuestionDetailItem :questiondata="qaItem.question"></QuestionDetailItem> -->
                <strong style="font-size: larger;">{{qaItem.question.title}}</strong>
                <AnswerDetailItem :answerdata="qaItem.answer"></AnswerDetailItem>
                <el-button type="primary" disabled><el-icon><caret-top /></el-icon>&nbsp;{{qaItem.support_count}}</el-button>
                <el-button type="primary" disabled><el-icon><chat-square /></el-icon>&nbsp;{{qaItem.comment_count}}</el-button>
                
            </div>    
        </p>
    </el-scrollbar>
    

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

</style>
