<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle"> 
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击:{{newsinfo.click}}</span>
        </p>
        <div class="content" v-html="newsinfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    created(){
        this.getnewsinfo()
    },
    methods:{
        getnewsinfo(){
            this.axios.get('/api/getnew/'+this.id)
            .then(result=>{
                this.newsinfo=result.data.message[0]
            })
            .catch(err => {
                 Toast('获取图文资讯详情失败！')
            })
    }
    },
    components:{
        comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;
    .title{
        color: red;
        font-size:16px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        color: #226aff;
    }
}
</style>
