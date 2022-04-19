<template>
    <!-- <h2>Comment Detail Item</h2> -->
    <el-form v-model="commentitem">
        <el-form-item label="Uid">
            <el-input :disabled="true" v-model="commentitem.uid"></el-input>
        </el-form-item>
        <el-form-item label="comment">
            <el-input :disabled="true" type="textarea" autosize v-model="commentitem.content"></el-input>
        </el-form-item>
    </el-form>
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