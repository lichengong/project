<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>{{item.add_time | dateFormat}}</span>
                                <span>{{item.click}}</span>
                            </p>
						</div>
					</router-link>
				</li>	
		</ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        this.getnewslist()
    },
    methods:{
        getnewslist(){this.axios.get('/api/getnewslist').then(result=>{
            if(result.data.status===0){
                this.newsList=result.data.message
            }else{
                Toast('获取图文资讯失败！');
            }
        }
        )}
        
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{font-size:14px;}
        .mui-ellipsis{
            color: #226aff;
            display: flex;
            justify-content:space-between;
        }
    }
}
</style>




