<template>
    <el-form :model="userForm" :rules="userRule">
        <el-form-item label="Username">
            <el-input v-model="userForm.username" type="text" required />
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="userForm.email" type="email" placeholder="登录不需要输入邮箱哦"/>
        </el-form-item>
        <el-form-item label="Password" prop="email">
            <el-input v-model="userForm.password" type="password" show-password required></el-input>
        </el-form-item>
        <!-- 这一块咕了 -->
        <!-- <el-form-item>
            <el-button type="primary" @click="btnLogin">Login</el-button>
            <el-button type="primary" @click="btnRegister" plain>Register</el-button>
            <el-button type @click="btnForgetPassword" plain>Forget?</el-button>
        </el-form-item> -->
        <el-link type="info" href="https://github.com/shatyuka/Zhiliao">致敬Xposed插件 知了</el-link>

    </el-form>
</template>

<script>

export default {

    data() {    
        return {
            userForm: {
                username: "",
                password: "",
                email: ""
            },
            userRule: {
                email: [
                    { message: "Please input email address", trigger: "blur" },
                    // { validator: checkEmail, trigger: "blur" }
                ]
            },
        }
    },
    inject:['reload'],
    methods: {

        btnLogin() {
            console.log("btnLogin")
            console.log(this.userForm)

            if (this.userForm.username != "" && this.userForm.password != "") {
                localStorage.clear()
                let url = '/user/login'
                this.$axios
                    .post(url, {
                        username: this.userForm.username, 
                        password: this.userForm.password
                    })
                    .then(res => {
                        console.log(res.data.msg)
                        if (res.data.code == 0) {
                            console.log("UserData:",  res.data.data)
                            localStorage.setItem("isLogin", true)
                            localStorage.setItem("uid", res.data.data.Id)
                            localStorage.setItem("username", res.data.data.username)
                            localStorage.setItem("token", res.data.data.token)
                            localStorage.setItem("isManage", res.data.data.manage)

                            this.reload()
                            this.$router.push("/");
                        } else {
                            console.log("Login fail")
                            alert(res.data.msg)
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                alert("Please input your message")
            }

        },

        btnRegister() {
            console.log("btnRegister")
            console.log(this.userForm)
            if ((this.userForm.username != "") && (this.userForm.password != "") && (this.userForm.email != "")) {
                let url = '/user/register'
                this.$axios
                    .post(url, {
                        username: this.userForm.username, 
                        password: this.userForm.password,
                        email: this.userForm.email
                    })
                    .then(res => {
                        console.log(res.data.msg)
                         if (res.data.code == 0) {
                            console.log("Uid:",  res.data.data)
                            localStorage.setItem("isLogin", true)
                            localStorage.setItem("uid", res.data.data.Id)
                            localStorage.setItem("username", res.data.data.username)
                            localStorage.setItem("token", res.data.data.token)
                            localStorage.setItem("isManage", res.data.data.manage)
                            
                            this.reload()
                            this.$router.push("/");
                        } else {
                            console.log("Register fail")
                            alert("Register fail:" + res.data.msg)
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                alert("Please input your message")
            }
            // location.reload()
        },

        btnForgetPassword() {
            console.log("btnForgetPassword")
            alert("HAHA~ Forget it! Register A New One")
        },

    },
}
</script>
