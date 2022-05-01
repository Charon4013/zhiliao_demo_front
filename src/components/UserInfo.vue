<template>
    <h2>UserInfo</h2>
    <el-form :model="userInfo" :disabled="isOwner == true">
        <el-form-item label="User Id">
            <el-input v-model="userInfo.uid" disabled/>
        </el-form-item>
        <!-- <el-form-item label="Avatar">
            <a>No</a>
        </el-form-item> -->
        <el-form-item label="Gender">
            <el-select v-model="userInfo.sex" placeholder="56 kinds">
                <el-option label="male" value="male" />
                <el-option label="female" value="female" />
                <el-option label="alien" value="alien" />
                <el-option label="another 53 kinds" value="hhh" disabled/>
            </el-select>
        </el-form-item>
        <el-form-item label="birthday">
            <el-input v-model="userInfo.birthday"/>
        </el-form-item>
        <el-form-item label="location">
            <el-input v-model="userInfo.location"/>
        </el-form-item>
        <el-form-item label="Describe youreself">
            <el-input v-model="userInfo.description" placeholder="Use one sentence to describe yourself" />
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" v-if="!isOwner" @click="btnModifyUserInfo">Modify</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

export default {
    data() {
        return {
            userInfo: {
                uid: "",
                avatar: "",
                sex: "",
                description: "",
                birthday: "",
                location: "",
            },
            userBeSupportedCounts: 0
        }
    },
    methods: {
        btnModifyUserInfo() {
            console.log("btnModifyUserInfo: ", this.userInfo)

            let url = '/user/' + this.userInfo.uid
            console.log("url: ", url)

            // const userInfoJSON = JSON.stringify(this.userInfo)
            this.$axios
                .post(url, {
                    uid: this.userInfo.uid,
                    avatar: this.userInfo.avatar,
                    sex: this.userInfo.sex,
                    description: this.userInfo.description,
                    birthday: this.userInfo.birthday,
                    location: this.userInfo.location
                })
                .then( res => {
                    console.log("resData: ", res.data)
                    if (res.data.code == 0) {
                        alert("Modify UserInfo Success")
                    } else {
                        alert("Modify UserInfo Fail: ", res.data.msg)
                    }
                })
            
        }
    },
    
    mounted() {
        console.log("mounted***");
        let tmpUrl = window.location.href.split("/")
        console.log("window.location.href: ", window.location.href);
        let uid = tmpUrl[tmpUrl.length - 1]
        console.log("uid: ", uid)
        let url = '/user/' + uid

        this.$axios
            .get(url)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("UserInfoData: ", res.data.data)
                    this.userInfo = res.data.data
                }
        })
    },

    computed: {
        isOwner() {
            let tmpUrl = window.location.href.split("/")
            let uid = tmpUrl[tmpUrl.length - 1]
            // console.log("this.uid", uid)
            // console.log("localStorage.uid", localStorage.uid);
            if (uid === localStorage.uid) {
                console.log("disableddddd")
                return false
            } else {
                return true
            }
        }
    }
}

</script>