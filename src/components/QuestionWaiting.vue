<template>
    <p v-for="(question, index) in data" :key="index" class="scrollbar-demo-item">
        <div @click="divToQuestionDetail(question.Id)">
            <QuestionDetailItem :questiondata="question"></QuestionDetailItem>
            <!-- <el-button type="primary" @click="btnWriteAnswer(question.Id)">写回答</el-button> -->
        </div>
        <el-divider />
    </p>
</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue";

export default {
    data() {
        return {
            question: {
                id: "",
                uid: "",
                title: "",
                description: "",
                created: ""
            },
            data:[],
        }
    },
    mounted() {
        let url = '/question/random'

        this.$axios
            .get(url)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("UserQuestionData: ", res.data.data)
                    this.data = res.data.data
                }     
        })
    },
    methods: {
        btnWriteAnswer(id) {
            console.log(id)
            let url = "/question/" + id + '/answer/new'
            this.$router.push(url)
        },
        divToQuestionDetail(qid) {
            let url = '/question/' + qid
            this.$router.push(url)
        }
    },
    components: { QuestionDetailItem }
}

</script>

<style scoped>
div {
    border-bottom:1px solid; 
    border-color: #E4E7ED; 
}

p {
    margin-top: 0;
    margin-bottom: 0;
}
</style>