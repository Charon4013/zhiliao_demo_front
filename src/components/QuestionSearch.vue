<template>
    <h2>Search result</h2>
    <p v-if="data.length===0">No result</p>
    
    <p v-else v-for="(questionItem, index) in data" :key="index" @click="divToQuestionDetail(questionItem.Id)">
        <QuestionDetailItem :questiondata="questionItem"></QuestionDetailItem>
        <el-divider></el-divider>
    </p>

</template>

<script>
import QuestionDetailItem from "./item/QuestionDetailItem.vue"

export default {
    data() {
        return {
            data: []
        };
    },
    props: ['searchInput'],
    watch: {
        '$route': {
            immediate: true,
            handler: function(to, from) {
                this.data = []
                if (to.path) {
                    // console.log("$route", to.query.path, from.query.path)
                    console.log("$route1", to, from)
                    console.log("path23", to.fullPath)
                    let url = to.fullPath
                    this.$axios
                        .get(url)
                        .then(res => {
                        if (res.data.code == 0 && res.data.data) {
                            console.log("res.data.data", res.data.data);
                            this.data = res.data.data;
                        }
                    });
                }
                
            }
        }
        
    },
    methods: {
        divToQuestionDetail(qid) {
            let url = '/question/' + qid
            this.$router.push(url)
        }
    },
    components: { QuestionDetailItem }
}
</script>