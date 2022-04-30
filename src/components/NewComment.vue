<template>
    <h2>New Comment</h2>
    <el-form>
        <el-form-item label="Comment">
            <el-input v-model="content" type="textarea" :autosize="{minRows: 5}"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="btnCommentSubmit"><el-icon><document-checked></document-checked></el-icon></el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                content: ""
            }
        },
        methods: {
            btnCommentSubmit() {
                if (localStorage.isLogin != "true") {
                    alert("please log in ")
                    this.$router.push("/user/login")
                } else {
                    let url = window.location.href.replace("3000", "8080")
                    let tmpUrl = window.location.href.split("/")
                    let aid = tmpUrl[tmpUrl.length -1]
                    url = url + '/comment/new'
                    // console.log("url: ", aid);
                    this.$axios
                        .post(url, {
                            aid: aid,
                            uid: localStorage.getItem("uid"),
                            content: this.content,
                        })
                        .then( res => {
                            if (res.data.code == 0) {
                                location.reload()
                            }
                            console.log("res: ", res.data);
                        })
                }
                
            }
        },
    }
</script>