<template>
    <el-button type="info" @click="btnSupport" v-if="!this.support.Supported">
        <el-icon><caret-top /></el-icon>&nbsp;{{support.Count}}
    </el-button>
    <el-button type="primary" @click="btnSupport" v-else>
        <el-icon><caret-top /></el-icon>&nbsp;{{support.Count}}
    </el-button>
    <el-button type="primary" @click="btnCommentNew">
        <el-icon><chat-square /></el-icon>&nbsp;{{commentListLength}}
    </el-button>
</template>

<script>
    export default {
        data() {
            return {
                support: {
                    Count: 0
                },
                commentListLength: 0
            }
        },
        // 不要用answerId驼峰，用answer-id
        props: ["answerid"],
        mounted() {
            let url = window.location.href.replace("3000", "8080")
            let commentUrl = url + "/answer/" + this.answerid + "/comment/count"
            let tmpUrl = url.split("/");
            if (tmpUrl[tmpUrl.length -1] == 'explore') {

            } else if (tmpUrl[tmpUrl.length -2] != 'answer') {
                url = url + '/answer/' + this.answerid
            }
            url = url + '/support'
            console.log("final url: ", url);
            this.$axios
                .get(url)
                .then( res => {
                    if (res.data.code == 0) {
                        this.support = res.data.data
                    }
                })
            console.log("commentUrl:::::", commentUrl);
            this.$axios
                .get(commentUrl)
                .then( res => {
                    console.log(res.data.data);
                    this.commentListLength = res.data.data
                })

        },
        methods: {
            btnSupport() {
                if (localStorage.isLogin != "true") {
                    alert("please log in")
                    this.$router.push("/user/login")
                } else {
                    let url = window.location.href.replace("3000", "8080")
                    let tmpUrl = url.split("/");
                    if (tmpUrl[tmpUrl.length -2] != 'answer') {
                        url = url + '/answer/' + this.answerid
                    }
                    if (this.support.Supported) {
                        url = url + "/unsupport"
                        // console.log("/unsupport:", url)

                        this.$axios
                            .post(url, {
                                uid: localStorage.getItem("uid"),
                                aid: this.answerid + ''
                            })
                            .then( res => {
                                this.$axios.defaults.headers.common["Token"] = localStorage.getItem("token");
                                // console.log("res: ", res.data)
                                if (res.data.code == 0) {
                                    // alert("unsupport success")
                                    this.support.Count -= 1
                                    this.support.Supported = !this.support.Supported
                                } else {
                                    alert("unsupport fail")
                                }                      
                            })
                    } else {
                        url = url + "/support"
                        // console.log("/support:", url)

                        this.$axios
                            .post(url, {
                                uid: localStorage.getItem("uid"),
                                aid: this.answerid + ''
                            })
                            .then( res => {
                                this.$axios.defaults.headers.common["Token"] = localStorage.getItem("token");
                                // console.log("res: ", res.data)
                                if (res.data.code == 0) {
                                    // alert("support success")
                                    this.support.Count += 1
                                    this.support.Supported = !this.support.Supported
                                } else {
                                    alert("support fail")
                                }     
                            })
                    }
                }
                
  
            },
            btnCommentNew() {
                let tmpUrl = window.location.href.split("/")
                let qid = tmpUrl[tmpUrl.length - 1]
                let url = '/question/' + qid + '/answer/' + this.answerid

                console.log("btnComment url: ", url)
                // let url = window.location.href + '/comment/new'
                this.$router.push(url)
            }
        },
    }
</script>