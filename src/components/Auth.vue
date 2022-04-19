<template>

<h2>{{authStr}}</h2>

</template>

<script>

export default {
    data() {
        return {
            authStr: ""
        }
    },
    mounted() {
        let url = '/auth'
        console.log(localStorage.getItem('token'))
        this.$axios
            .get(url)
            .then(res => {  
                console.log("UserQuestionData: ", res.data)
                this.authStr = res.data        
        })
    },
}
</script>