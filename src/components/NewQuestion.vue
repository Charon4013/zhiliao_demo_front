<template>
    <el-form :model="question">
        <el-form-item label="Title">
            <el-input v-model="question.title"></el-input>
        </el-form-item>  
    </el-form>
        <!-- <el-form-item label="Description">
            <el-input v-model="question.description" type="textarea" :autosize="{minRows: 5}"></el-input>
        </el-form-item> -->
    <TextEditor ref="description"></TextEditor>
    <br>
    <el-button type="primary" @click="btnCreateQuestion"><el-icon><document-checked /></el-icon></el-button>
    
    
</template>

<script>
import TextEditor from "./item/TextEditor.vue"

export default {
    data() {
        return {
            question: {
                uid: "",
                title: "",
                description: ""
            }
        };
    },
    methods: {
        btnCreateQuestion() {
            console.log(this.$refs.description.content)
            console.log(this.question);
            if (!localStorage.isLogin) {
                alert("Please log in");
                this.$router.push("/user/login");
            }
            let uid = localStorage.uid;
            let url = "/question/new";
            console.log("uid", uid);
            this.$axios
                .post(url, {
                uid: localStorage.uid,
                title: this.question.title,
                description: this.$refs.description.content
            })
                .then(res => {
                console.log("resData: ", res.data);
                if (res.data.code == 0) {
                    alert("Create Question Success");
                    console.log("res.data: ", res.data.data.Id);
                    if (res.data.data.Id && res.data.data.Id != 0) {
                        let url = "/question/" + res.data.data.Id;
                        this.$router.push(url);
                    }
                }
                else {
                    alert("Create Question Fail: ", res.data.msg);
                }
            });
        }
    },
    components: { TextEditor }
}
</script>