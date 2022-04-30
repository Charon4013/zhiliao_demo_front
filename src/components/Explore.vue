<template>

        <p v-for="(qaItem, index) in data" :key="index">
            <el-card>

                <el-link :underline="false" @click="divToQuestionDetail(qaItem.question.Id)"><strong style="font-size: larger;">{{qaItem.question.title}}</strong></el-link>
                <br>
                <span><el-icon><user /></el-icon>{{qaItem.question.uid}}</span>
                <el-divider />

                {{splitContentTag(qaItem.answer.content)}}
                <br>
                <el-divider />
                <span><el-icon><caret-top /></el-icon>&nbsp;{{qaItem.support_count}}</span>&nbsp;
                <span><el-icon><chat-square /></el-icon>&nbsp;{{qaItem.comment_count}}</span>
                <span style="float: right;"><el-icon><clock /></el-icon>&nbsp;{{qaItem.answer.Created}}</span>

            </el-card>   
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
            },
            // 简单去标签
            splitContentTag(str) {
                return str.replace(/<.*?>/ig, "")
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
