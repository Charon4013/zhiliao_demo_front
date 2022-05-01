<template>
    <span><el-icon><user /></el-icon>{{commentitem.uid}}</span>
    <el-input disabled type="textarea" autosize v-model="commentitem.content"></el-input>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    props: {
        commentitem: {
            uid: Number,
            content: String,
            created: String,
        }
    },
}
</script>