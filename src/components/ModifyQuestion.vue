<template>
    <el-form :model="question">
        <el-form-item label="Title">
            <el-input v-model="question.title"></el-input>
        </el-form-item>
    </el-form>

    <TextEditor
        ref="description"
        :outContent="question.description"
    ></TextEditor>
    <el-button type="primary" @click="btnToModifyQuestion">Save</el-button>
</template>

<script>
import TextEditor from "./item/TextEditor.vue";

export default {
    data() {
        return {
            question: {
                uid: "",
                title: "",
                description: "",
            },
            outContent: "",
        };
    },
    mounted() {
        let tmpUrl = window.location.href.split("/");
        let qid = tmpUrl[tmpUrl.length - 2];
        console.log("qid: ", qid);
        let url = "/question/" + qid + "/single";
        console.log("url:", url);
        this.$axios.get(url).then((res) => {
            console.log("res.data:", res.data);
            if (res.data.code == 0) {
                this.question = res.data.data;
            }
        });
    },
    methods: {
        btnToModifyQuestion() {
            let tmpUrl = window.location.href.split("/");
            let qid = tmpUrl[tmpUrl.length - 2];
            if (!localStorage.isLogin) {
							alert("Please log in");
							this.$router.push("/user/login");
            }
            let url = "/question/" + qid + "/modify";
            // console.log("new description: ", this.$refs.description.content)
            this.$axios
							.post(url, {
								id: qid,
								uid: localStorage.uid,
								title: this.question.title,
								description: this.$refs.description.content,
							})
							.then((res) => {
								console.log("resData: ", res.data);
								if (res.data.code == 0) {
									// alert("Modify Question Success");
									console.log("res.data: ", res.data.data.Id);
									if (res.data.data.Id && res.data.data.Id != 0) {
										let url = "/question/" + res.data.data.Id;
										this.$router.push(url);
									}
								} else {
									alert("Modify Question Fail: ", res.data.msg);
								}
							});
        },
    },
    components: { TextEditor },
};
</script>
