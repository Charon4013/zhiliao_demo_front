<template>
    <div>
        <editor
            v-model="myContent"
            api-key="ge182ahjrbe9mfmntgvrzr9d0ukx53ui6nrl8hl3rjhj3ho4"
            :init="init"
            :disabled="true"
        ></editor>
    </div>

</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，
import Editor from "@tinymce/tinymce-vue"; //编辑器引入
import "tinymce/themes/silver/theme"; //编辑器主题
import "tinymce/icons/default"; //引入编辑器图标icon
import "tinymce/models/dom";
import "tinymce/plugins/codesample"; //超链接


export default {
    components: {
        editor: Editor,
    },
    data() {
        return {
            init: {
                selector: "#tinymce",
                language_url: "/tinymce/langs/zh_Hans.js", //汉化路径是自定义的
                language: "zh-Hans", // 官方文档没更新名字
                skin_url: "/tinymce/skins/ui/oxide", //皮肤
                content_css: "/node_modules/@tinymce/tinymce-vue/node_modules/skins/content/default",
                plugins: "codesample", //插件
                codesample_languages: [
                    {text: 'HTML/XML', value: 'markup'},
                    {text: 'JavaScript', value: 'javascript'},
                    {text: 'CSS', value: 'css'},

                ],
                //工具栏
                toolbar: false,
                height: 200, //高度
                branding: false, //隐藏右下角技术支持
                menubar: false //隐藏菜单栏
            },
            myContent: this.content
        };
    },
    props: {
        content: "",
    },

    mounted() {
        tinymce.init({});
        console.log("editorurl: ", window.location.href);

    },
    created() {
        this.myContent = this.content
    },

    watch: {
        content(newValue) {
            this.myContent = newValue
            // console.log("watch content: ", this.content)
        },
        myContent(newValue) {
            this.$emit("watchi myContent:", newValue)
        }
    },

};
</script>

<style scoped>
/* @import "tinymce/skins/content/default/content.min.css";
@import "tinymce/skins/ui/oxide/skin.min.css"; */
</style>
