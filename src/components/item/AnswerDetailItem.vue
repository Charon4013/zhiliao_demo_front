<template>
    <el-form v-model="answerdata" :disabled="true">
        <span><el-icon><user /></el-icon>{{answerdata.uid}}</span>
        <TextView :content="answerdata.content"></TextView>
    </el-form>
</template>

<script>
import TextView from "./TextView.vue"
    export default {
    props: {
        answerdata: {
            id: String,
            qid: String,
            uid: String,
            content: String,
            created: String
        },
        data: []
    },
    mounted() {
        // let url = window.location.href;
        // console.log(url);
    },
    components: { TextView }
}
</script>