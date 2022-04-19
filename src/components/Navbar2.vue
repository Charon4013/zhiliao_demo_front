<template>
    
    <el-row>
        <el-col class="blank" :span="3"></el-col>
        
        <el-col :span="1">
            <div style="display: flex;">
                <el-image :src="imgSrc" alt="ZHILIAO" :fit="contain" />
            </div>
            
        </el-col>
            
        <el-col :span="8">
            <div>
                <el-link :underline="false" @click="routeToHome">Home</el-link>
                <el-link :underline="false" @click="routeToExplore">Explore</el-link>
                <!-- <el-link :underline="false" @click="routeToFollow">Follow</el-link> -->
                <el-link :underline="false" @click="routeToQuestionNew">Question</el-link>
                <el-link :underline="false" @click="routeToWaitingAnswer">Waiting Answer</el-link>
            </div>
        </el-col>

        <el-col class="blank" :span="1"></el-col>

        <el-col :span="5">
            <div>
                <el-input placeholder="Waiting for your explore" v-model="searchBoxInput" @keyup.enter="searchQuestion"></el-input>
            </div>
        </el-col>

        <el-col class="blank" :span="2"></el-col>

        <el-col :span="1">
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <div v-if="!isLogin" @click="routeToLogin">Log in</div>
                        <div v-else>{{ username }}</div>

                    </span>
                    <template #dropdown v-if="isLogin">
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="isLogin" @click="routeToUserInfo">My info</el-dropdown-item>   
                            <el-dropdown-item v-if="isLogin" @click="routeToUserCreator">My creator</el-dropdown-item>                                
                            <el-dropdown-item v-if="isManage" @click="routeToManage">Manage</el-dropdown-item>
                            <el-dropdown-item divided v-if="isLogin" @click="routeToLogout">Logout</el-dropdown-item>   
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>    
        </el-col>
        <el-col class="blank" :span="3"></el-col>
    </el-row>
</template>

<script>

export default {
    data() {
        return {
            isLogin: localStorage.isLogin === "true",
            username: localStorage.username,
            isManage: localStorage.isManage === "true",
            searchBoxInput: "",
            imgSrc: "/src/assets/zhi_logo_nobg.png"
        }
    },
    methods: {
        routeToExplore() {
            this.$router.push({ path: '/explore'})
            console.log("routeToHome")
        },
        routeToFollow() {
            this.$router.push({ path: '/follow'})
            console.log("routeToFollow")
        },
        routeToQuestionNew() {
            if (localStorage.isLogin != "true") {
                alert("Please Log in")
                this.$router.push("/user/login")
            } else {
                this.$router.push({ path: '/question/new'})
                console.log("routeToQuestionNew")
            }
        },
        routeToHome() {
            this.$router.push({ path: '/home'})
            console.log("routeToHome")
        },
        routeToWaitingAnswer() {
            this.$router.push({ path: '/question/waiting'})
            console.log("routeToWaitingAnswer")
        },

        routeToLogout() {
            localStorage.clear()
            localStorage.isLogin = false
            this.$router.push({ path: '/user/login'})
            this.isLogin = false
        },
        routeToUserInfo() {
            console.log("UserInfo clicked");
            let url = '/user/' + localStorage.uid
            console.log(url)
            this.$router.push({ path: url})
            console.log("UserInfo clicked end")
        },
        routeToLogin() {
            let url = '/user/login'
            this.$router.push({ path: url })
        },
        routeToUserCreator() {
            let url = '/user/' + localStorage.uid + '/creator'
            this.$router.push({ path: url })
        },
        searchQuestion() {
            let ctx = this.searchBoxInput
            let url = window.location.href
            console.log("url2: ", url)
            url = "/question/search/" + ctx
            console.log("url2345: ", url)
            
            this.$router.push(url)
            // window.location.replace(url)
            this.searchBoxInput = ""
        },
        routeToManage() {
            let url = '/manage'
            this.$router.push(url)
        }
    },
}
</script>


<style scoped>

.el-col {
    /* border: 1px solid; */
    vertical-align: middle
}

.el-link {
    margin-left: 30px;
    vertical-align: middle;
    height: 100%;
}

div {
    vertical-align: middle;
    height: 100%;
    text-align: center;
    align-items: center;
}

img {
    max-width: 80%;
}

.router-link {
    vertical-align: middle;
    text-align: center;
}

</style>