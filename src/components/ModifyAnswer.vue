<template>
    <QuestionDetailItem :questiondata="question"></QuestionDetailItem>
    
    <div>
        <TextEditor ref="textEditor" :outContent="answer.content"></TextEditor>

    </div>
    <div>
        <el-button type="primary" @click="btnAnswerSave">Save</el-button>
    </div>
</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue";
import TextEditor from "./item/TextEditor.vue";

export default {
    props: ["aid"],
    data() {
        return {
            question: "",
            answer: ""
        };
    },
    mounted() {
        let tmpUrl = window.location.href.split("/");
        let qid = tmpUrl[tmpUrl.length - 4];
        let aid = tmpUrl[tmpUrl.length - 2]
        console.log(qid, aid)
        let url = "/question/" + qid + "/answer/" + aid

        this.$axios
            .get(url)
            .then( res => {
                if (res.data.code == 0) {
                    this.question = res.data.data.question;
                    this.answer = res.data.data.answer
                }
            });
        
    },
    methods: {
        btnAnswerSave() {
            this.answerContent = this.$refs.textEditor.content;
            console.log(this.answerContent);
            let tmpUrl = window.location.href.split("/");
            let qid = tmpUrl[tmpUrl.length - 4];
            let aid = tmpUrl[tmpUrl.length - 2]

            let url = "/question/" + qid + "/answer/" + aid + "/modify";
            console.log(url);
            console.log("Token: ", localStorage.getItem("token"));
            console.log("Token: ", localStorage.getItem("uid"));
            this.$axios
                .post(url, {
                    id: aid,
                    uid: localStorage.getItem("uid"),
                    content: this.answerContent,
                })
                .then((res) => {
                    this.$axios.defaults.headers.common["Token"] =
                        localStorage.getItem("token");
                    console.log("resData: ", res.data);
                    if (res.data.code == 0) {
                        alert("Create Answer Success");
                        let url = "/question/" + qid;
                        this.$router.push(url);
                    } else {
                        alert("Create Answer Fail: ", res.data.msg);
                    }
                });
        },
    },
    components: { QuestionDetailItem, TextEditor },
};
</script>
