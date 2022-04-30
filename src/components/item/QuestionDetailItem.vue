<template>
    <strong style="font-size: larger;">{{questiondata.title}}</strong>
    <br><br>
    <TextView :content="questiondata.description"></TextView>
</template>

<script>
import TextView from "./TextView.vue";
    export default {
    props: {
        questiondata: {
            id: String,
            uid: String,
            title: String,
            description: String,
            created: String
        }
    },
    components: { TextView }
}
</script>