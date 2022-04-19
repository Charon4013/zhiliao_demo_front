<script>

import MainBody from "./components/MainBody.vue";
import Navbar from "./components/Navbar2.vue";

export default {
    data() {
        return {
            templateRefresh: true,
        };
    },
    provide() {
        return {
            reload: this.reload,
        };
    },
    methods: {
      reload() {
        this.templateRefresh = false
        this.$nextTick(function () {
          this.templateRefresh = true
        })
      }
    },
    components: {
        Navbar,
        MainBody,
    },
    mounted() {
        if (localStorage.getItem("isLogin") != "true") {
            localStorage.setItem("isLogin", false)
            localStorage.setItem("token", "No token")
        }
    },
};
</script>

<template>
    <div class="zhiliaoLayout">
        <el-container>
            <el-header>
                <Navbar v-if="templateRefresh"></Navbar>
            </el-header>
            <el-divider></el-divider>
            <el-main>
                <MainBody></MainBody>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

.el-container {
    height: 100%;
}

.el-divider {
    margin: 0;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
}

.el-main {
    /* padding-bottom: 0; */
    height: 93vh;
    background-color: #F6F6F6;
}

div {
    margin-bottom: 0;
    height: 100%;
}

.template {
    height: 100%;
}

</style>
