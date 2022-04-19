<template>
    <div>
        <el-alert title="为了节省本地带宽，本站推荐用户使用图床上传图片" type="warning" effect="dark" />
        <br>
        
        <h4>图床可以自行选择，不想找的可以用下面几个</h4>
        <el-card>
            <el-link type="primary" href="https://imgtu.com/">路过图床</el-link>
            <el-link type="primary" href="https://www.imgurl.org/">ImgURL</el-link>
            <el-link type="primary" href="https://postimages.org/">Postimage</el-link>
            <el-link type="primary" href="https://imgkr.com/">图壳</el-link>
        </el-card>

        <h4>在适当位置插入想要的图片<strong style="color: red;">URL链接</strong>，如红框所示链接</h4>
        <el-card>           
            <el-image :src="imgUploadSupportImg"></el-image>
        </el-card>

        <h4>展示如下</h4>
        <el-card>
            <a href="https://imgtu.com/i/Ld316s"><img src="https://s1.ax1x.com/2022/04/18/Ld316s.jpg" alt="Ld316s.jpg"
                border="0" /></a>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUploadSupportImg: "/src/assets/imgUploadExp.png",
        };
    },
};
</script>

<style scoped>
.el-link {
  margin-right: 8px;
}
</style>
