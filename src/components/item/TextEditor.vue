<template>
    <div id="app">
        <editor
            :id="tinymceId"
            v-model="content"
            api-key="ge182ahjrbe9mfmntgvrzr9d0ukx53ui6nrl8hl3rjhj3ho4"
            :init="init"
            :disabled="false"
        />
    </div>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，
import Editor from "@tinymce/tinymce-vue"; //编辑器引入
import "tinymce/themes/silver/theme"; //编辑器主题
import "tinymce/icons/default"; //引入编辑器图标icon
import "tinymce/models/dom";
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/wordcount"; // 字数统计
import "tinymce/plugins/table";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";


export default {
    name: "app",
    components: {
        editor: Editor,
    },
    data() {
        return {
            content: "",
            tinymceId: '',
            init: {
                selector: "#tinymce",
                language_url: "/tinymce/langs/zh_Hans.js", //汉化路径是自定义的
                language: "zh-Hans", // 官方文档没更新名字
                skin_url: "/tinymce/skins/ui/oxide", //皮肤
                content_css: "/node_modules/@tinymce/tinymce-vue/node_modules/skins/content/default",
                plugins: this.plugins, //插件
                //工具栏
                toolbar: this.toolbar,
                toolbar_location: "",
                fontsize_formats:
                    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px", //字体大小
                height: 400, //高度
                branding: false, //隐藏右下角技术支持
                menubar: true //隐藏菜单栏
                
            },
        };
    },
    props: {
        plugins: {
            type: [String, Array],
            default:
                "advlist autolink link lists charmap fullscreen preview",
        }, //工具栏
        toolbar: {
            type: [String, Array],
            default:
                "undo redo |  formatselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lists | fullscreen | preview",
        },
        outContent: ""
    },

    mounted() {
        tinymce.init({})
    },
    watch: {
        outContent(newValue, oldValue) {
            console.log("outContent changed: ", newValue, "&&",  oldValue);
            this.content = this.outContent
        }
    }
};
</script>