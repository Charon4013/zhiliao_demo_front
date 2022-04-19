<template>
    <el-button type="info" @click="btnCommentSupport" v-if="!this.commentSupport.Supported"><caret-top /><el-icon><caret-top /></el-icon> {{commentSupport.Count}}</el-button>
    <el-button type="primary" @click="btnCommentSupport" v-else><el-icon><caret-top /></el-icon> {{commentSupport.Count}}</el-button>
</template>

<script>
    export default {
        props: ["commentid"],
        data() {
            return {
                commentSupport: {
                    Count: 0,
                    Supported: false
                }
            }
        },
        mounted() {
            let url = window.location.href.replace("3000", "8080") + "/comment/support/" + this.commentid
            console.log("url22222: ", url)
            this.$axios
                .get(url)
                .then( res => {
                    this.commentSupport = res.data.data
                    console.log("this.commentSupport", this.commentSupport)
                })
        },
        methods: {
            btnCommentSupport() {
                let url = window.location.href.replace("3000", "8080") + '/comment'

                if (this.commentSupport.Supported) {
                    url = url + "/unsupport"
                    console.log("/unsupport:", url)

                    this.$axios
                        .post(url, {
                            uid: localStorage.getItem("uid"),
                            cid: this.commentid + ''
                        })
                        .then( res => {
                            if (res.data.code == 0) {
                                this.commentSupport.Count -= 1
                                this.commentSupport.Supported = !this.commentSupport.Supported
                            } else {
                                alert("unsupport fail")
                            }                      
                        })
                } else {
                    url = url + "/support"
                    console.log("/support:", url)

                    this.$axios
                        .post(url, {
                            uid: localStorage.getItem("uid"),
                            cid: this.commentid + ''
                        })
                        .then( res => {
                            // console.log("res: ", res.data)
                            if (res.data.code == 0) {
                                // alert("support success")
                                this.commentSupport.Count += 1
                                this.commentSupport.Supported = !this.commentSupport.Supported
                            } else {
                                alert("support fail")
                            }     
                        })
                }
            }
        },
    }
</script>