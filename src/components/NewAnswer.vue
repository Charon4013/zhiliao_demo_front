<template>
    <QuestionDetailItem :questiondata="question"></QuestionDetailItem>
    <el-divider />
    <div>
        <h3>Your Answer:</h3>
        
        <TextEditor ref="textEditor"></TextEditor>

    </div>
    <br>
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
            question: {
                id: "",
                uid: "",
                title: "",
                description: "",
                created: "",
            },
            answerContent: "",
            aid: 0,
        };
    },
    mounted() {
        let tmpUrl = window.location.href.split("/");
        let qid = tmpUrl[tmpUrl.length - 3];

        let targetUrl = "/question/" + qid + "/answer/single";

        this.$axios
            .get(targetUrl)
            .then((res) => {
                if (res.data.code == 0) {
                    this.question = res.data.data;
                } else {
                    this.question = "Get question content error"
                }
            });
        
    },
    methods: {
        btnAnswerSave() {
            this.answerContent = this.$refs.textEditor.content;
            console.log(this.answerContent);
            let tmpUrl = window.location.href.split("/");
            let qid = tmpUrl.splice(4, 1);

            let targetUrl = "/question/" + qid + "/answer/new";
            console.log(targetUrl);
            console.log("Token: ", localStorage.getItem("token"));
            console.log("Token: ", localStorage.getItem("uid"));
            this.$axios
                .post(targetUrl, {
                    uid: localStorage.getItem("uid"),
                    qid: qid.toString(),
                    content: this.answerContent,
                })
                .then((res) => {
                    this.$axios.defaults.headers.common["Token"] =
                        localStorage.getItem("token");
                    console.log("resData: ", res.data);
                    if (res.data.code == 0) {
                        alert("Create Answer Success");
                        targetUrl = "/question/" + qid;
                        this.$router.push(targetUrl);
                    } else {
                        alert("Create Answer Fail: ", res.data.msg);
                    }
                });
        },
    },
    components: { QuestionDetailItem, TextEditor },
};
</script>
