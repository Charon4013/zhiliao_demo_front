<template>

    <el-row>
        <el-col :span="3"></el-col>
        
        <el-col :span="18">
            <div class="mainBody">
                <router-view></router-view>
            </div>    
        </el-col>

        <el-col :span="3"></el-col>  
        
    </el-row>

    
</template>

<script>

export default {
    components: {
        // UserLogin
    }
}

</script>

<style scoped>
.el-row {
    height: 100%;
}

template {
    height: 100%;
}

div.mainBody {
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.1); 
    padding: 15px;
    background-color: white; 
    height: 97%;
}

</style>