<template>
    <div class="goodsdesc-container">
        <h1>{{info.title}}</h1>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            info:{}
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
        this.axios.get('/api/goods/getdesc/'+this.id)
        .then(result=>{
                this.info=result.data.message[0]
        })
        .catch(err =>{
            Toast('商品加载失败...')
        })
        }
    }
}
</script>
<style lang="scss" >
.goodsdesc-container{
    padding: 4px;
    h1{
        font-size: 15px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>

