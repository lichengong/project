<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
          <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                   <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                   <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            lunbotuList:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){this.axios.get('/api/getLunbo').then(result=>{
            if(result.data.status===0){
                this.lunbotuList=result.data.message
            }else{
                Toast('轮播图加载失败...');
            }
        }

        )}
        
    }
};
</script>

<style lang="scss"  scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-items-wrap>div:nth-child(1) {
  background-color: red;
}
.mint-swipe-items-wrap>div:nth-child(2) {
  background-color: green;
}
.mint-swipe-items-wrap>div:nth-child(3) {
  background-color: blue;
}
img{
    width: 100%;
    height: 100%;
}
.mui-grid-view.mui-grid-9{
  background-color: #ffffff;
  border:none;
  
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}

.mui-grid-view.mui-grid-9 img{
  width: 60px;
  height: 60px;
}
</style>


