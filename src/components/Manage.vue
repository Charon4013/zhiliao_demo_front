<template>
        <el-button @click="btnToUser">User</el-button>
        <el-button @click="btnToUserInfo">UserInfo</el-button>
        <el-button @click="btnToQuestion">Question</el-button>
        <el-button @click="btnToAnswer">Answer</el-button>
        <el-button @click="btnToComment">Comment</el-button>

        <el-table v-if="!userShow" :data="userList" highlight-current-row>
            <el-table-column prop="Id" label="Uid"/>
            <el-table-column prop="username" label="Username" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="Created" label="Created" />
            <el-table-column prop="Updated" label="Updated" />
            <el-table-column fixed="right" label="Operation">
                <template v-slot="scope">       
                    <el-button type="danger" @click="btnToDeleteSomeone('user', scope.row.Id)">Delete</el-button>
                </template>
            </el-table-column>
            
            <!-- <el-table-column label="Operation"><el-button type="danger" @click="btnToDeleteSomeone">Delete</el-button></el-table-column>       -->
        </el-table>
        <el-divider v-if="!userShow"></el-divider>

        <el-table v-if="!userInfoShow" :data="userInfoList" highlight-current-row>
            <el-table-column prop="uid" label="Uid" />
            <el-table-column prop="birthday" label="Birthday" />
            <el-table-column prop="location" label="Location" />
            <el-table-column prop="description" label="Description" />
            <el-table-column prop="Created" label="Created" />
            <el-table-column prop="Updated" label="Updated" />
            <el-table-column fixed="right" label="Operation">
                <template v-slot="scope">
                    <el-button type="primary" @click="btnToDetail('userinfo', scope.row.Id, 0)">Detail</el-button>
                    <el-button type="danger" @click="btnToDeleteSomeone('userinfo', scope.row.Id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider v-if="!userInfoShow"></el-divider>

        <el-table v-if="!questionShow" :data="questionList" highlight-current-row>
            <el-table-column prop="Id" label="Id" />
            <el-table-column prop="uid" label="Uid" />
            <el-table-column prop="title" label="Title" />
            <el-table-column prop="description" label="Description" />
            <el-table-column prop="Created" label="Created" />
            <el-table-column prop="Updated" label="Updated" />
            <el-table-column fixed="right" label="Operation">
                <template v-slot="scope">
                    <el-button type="primary" @click="btnToDetail('question', scope.row.Id)">Detail</el-button>
                    <el-button type="danger" @click="btnToDeleteSomeone('question', scope.row.Id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider v-if="!questionShow"></el-divider>

        <el-table v-if="!answerShow" :data="answerList" highlight-current-row>
            <el-table-column prop="Id" label="Id" />
            <el-table-column prop="uid" label="Uid" />
            <el-table-column prop="qid" label="Qid" />
            <el-table-column prop="content" label="Content" />
            <el-table-column prop="Created" label="Created" />
            <el-table-column prop="Updated" label="Updated" />
            <el-table-column fixed="right" label="Operation">
                <template v-slot="scope">
                    <el-button type="primary" @click="btnToDetail('answer', scope.row.Id, scope.row.qid)">Detail</el-button>
                    <el-button type="danger" @click="btnToDeleteSomeone('answer', scope.row.Id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider v-if="!answerShow"></el-divider>
        
        <el-table v-if="!commentShow" :data="commentList" highlight-current-row>
            <el-table-column prop="Id" label="Id" />
            <el-table-column prop="uid" label="Uid" />
            <el-table-column prop="aid" label="Aid" />
            <el-table-column prop="content" label="Content" />
            <el-table-column prop="Created" label="Created" />
            <el-table-column fixed="right" label="Operation">
                <template v-slot="scope">
                    <el-button type="danger" @click="btnToDeleteSomeone('comment', scope.row.Id)">Delete</el-button>  
                </template>
            </el-table-column>
        </el-table>     
</template>

<script>
    export default {
        data() {
            return {
                userList: "",
                userShow: true,
                userInfoList: "",
                userInfoShow: true,
                questionList: "",
                questionShow: true,
                answerList: "",
                answerShow: true,
                commentList: "",
                commentShow: true
            }
        },
        methods: {
            btnToUser() {
                if (this.userShow) {       
                    let url = '/manage/user'
                    this.$axios
                        .post(url)
                        .then ( res => {
                            this.userList = res.data.data
                        })
                }
                this.userShow = !this.userShow
            },
            btnToUserInfo() {
                if (this.userInfoShow) {       
                    let url = '/manage/userinfo'
                    this.$axios
                        .post(url)
                        .then ( res => {
                            this.userInfoList = res.data.data
                        })
                }
                this.userInfoShow = !this.userInfoShow
            },
            btnToQuestion() {
                if (this.questionShow) {       
                    let url = '/manage/question'
                    this.$axios
                        .post(url)
                        .then ( res => {
                            this.questionList = res.data.data
                        })
                }
                this.questionShow = !this.questionShow
            },
            btnToAnswer() {
                if (this.answerShow) {       
                    let url = '/manage/answer'
                    this.$axios
                        .post(url)
                        .then ( res => {
                            this.answerList = res.data.data
                        })
                }
                this.answerShow = !this.answerShow
            },
            btnToComment() {
                if (this.commentShow) {       
                    let url = '/manage/comment'
                    this.$axios
                        .post(url)
                        .then ( res => {
                            this.commentList = res.data.data
                        })
                }
                this.commentShow = !this.commentShow
            },
            btnToDeleteSomeone(tableName, id) {
                let url = "/manage/" + tableName + "/delete/" + id
                console.log(url);
                this.$axios
                    .post(url, {
                        id: id
                    })
                    .then( res => {
                        console.log(res.data)
                        if (res.data.code != 0) {
                            alert("delete fail!")
                        }
                    })
            },
            btnToDetail(name, id, id2) {
                let url = "/"
                console.log(url);
                if (name == "userinfo") {
                    url = "/user/" + id
                } else if (name == "question") {
                    url = url + name + "/" + id
                } else if (name == "answer") {
                    url = "/question/" + id2 + "/" + name + "/" + id
                } else if (name == "comment") {
                    url = "/question/" + id2 + "/" + name + "/" + id
                } else {
                    url = "/404"
                }
                console.log("url: ", url)
            }
        },
        mounted() {
            if (localStorage.isManage != "true") {
                this.$router.push("/404")
            }
        },
    }
</script>