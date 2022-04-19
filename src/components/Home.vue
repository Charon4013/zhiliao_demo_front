<template>
    <h2>勇士知乎终成恶龙</h2>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" width="" />
        <el-table-column prop="url" label="Url" width="" />
        <el-table-column prop="backendInterface" label="BackendInterface" width="" />
        <el-table-column prop="pageName" label="PageName" width="" />
        <el-table-column prop="status" label="Status" width="" />
    </el-table>
</template>

<script>

export default {
    data() {
        return {
            tableData: [
                // 主页
                {
                    name: "主页",
                    url: '/home',
                    backendInterface: '-',
                    pageName: 'Home.vue',
                    status: 'OK'
                },
                {
                    name: "探索（问题和回答）",
                    url: '/explore',
                    backendInterface: 'MPC.GetExplore',
                    pageName: 'Explore.vue',
                    status: 'OK'
                },
                // {
                //     name: "关注",
                //     url: '/follow',
                //     backendInterface: '',
                //     pageName: 'MyFollowQuestionAndAnswer.vue',
                //     status: '咕咕咕'
                // },  

                // 问题列表（只有问题）  
                {
                    name: "问题列表（只有问题）",
                    url: '/question/waiting',
                    backendInterface: 'QC.GetRandom',
                    pageName: 'QuestionWaiting.vue',
                    status: 'OK'
                },
                // 提问
                {
                    name: "提问",
                    url: '/question/new',
                    backendInterface: 'QC.PostNew',
                    pageName: 'NewQuestion.vue',
                    status: 'OK'
                },

                // 问题
                {
                    name: "问题详情",
                    url: '/question/{qid}',
                    backendInterface: 'AC.Get',
                    pageName: 'QuestionDetail.vue',
                    status: 'OK'
                },
                {
                    name: "问题修改",
                    url: '/question/{qid}/modify',
                    backendInterface: 'AC.PostModify',
                    pageName: 'ModifyQuestion.vue',
                    status: 'OK'
                },
                {
                    name: "问题删除",
                    url: '-',
                    backendInterface: 'UC.PostQuestionDeleteBy',
                    pageName: 'QuestionDetail.vue',
                    status: 'OK'
                },
                // 回答问题（新建）
                {
                    name: "回答问题（新建）",
                    url: '/question/{qid}/answer/new',
                    backendInterface: 'AC.Get&PostAnswerNew',
                    pageName: 'NewAnswer.vue',
                    status: 'OK'
                },
                {
                    name: "回答问题（修改）",
                    url: '/question/{qid}/answer/{aid}/modify',
                    backendInterface: 'ASC.PostModify',
                    pageName: 'NewAnswer.vue',
                    status: 'OK'
                },
                {
                    name: "回答问题（删除）",
                    url: '-',
                    backendInterface: 'UC.PostAnswerDeleteBy',
                    pageName: '-',
                    status: 'OK'
                },
                {
                    name: "回答点赞",
                    url: '-',
                    backendInterface: 'ASC.PostSuppost&PostUnsupport',
                    pageName: '-',
                    status: 'OK'
                },
                {
                    name: "回答评论",
                    url: '-',
                    backendInterface: 'CC.Get&PostNew',
                    pageName: 'NewComment.vue',
                    status: 'OK'
                },

                // 用户的登录注册
                {
                    name: "用户注册",
                    url: '/user/register',
                    backendInterface: 'UC.PostRegister',
                    pageName: 'UserLogin.vue',
                    status: 'OK'
                },
                {
                    name: "用户登录",
                    url: '/user/login',
                    backendInterface: 'UC.Get&PostLogin',
                    pageName: 'UserLogin.vue',
                    status: 'OK'
                },
                {
                    name: "用户登出",
                    url: '/user/logout',
                    backendInterface: '-',
                    pageName: '-',
                    status: 'OK'
                },

                // 用户的信息                
                {
                    name: "我的详情(获取和修改)",
                    url: '/user/{uid}',
                    backendInterface: 'UC.Get&PostBy',
                    pageName: 'UserInfo.vue',
                    status: 'OK'
                },
                // 我的创作
                {
                    name: "我的创作",
                    url: '/user/{uid}/creator',
                    backendInterface: 'UIC.GetQuestion&GetAnswer',
                    pageName: 'UserCreator.vue',
                    status: 'OK'
                },
                // {
                //     name: "我关注谁",
                //     url: '/user/{uid}/followuser',
                //     backendInterface: '',
                //     pageName: '',
                //     status: '咕咕咕'
                // },
                // {
                //     name: "谁关注我",
                //     url: '/user/{uid}/followme',
                //     backendInterface: '',
                //     pageName: '',
                //     status: '咕咕咕'
                // },
                // {
                //     name: "被点赞次数",
                //     url: '/user/{uid}/support',
                //     backendInterface: '',
                //     pageName: '',
                //     status: 'TODO'
                // },

                // 404
                {
                    name: "404",
                    url: '/404',
                    backendInterface: '-',
                    pageName: 'PageNotFound.vue',
                    status: 'OK'
                },

            ]                
        }
    },
}

</script>