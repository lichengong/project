<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
					</div>
				</div>
		</div>
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量:<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
		</div>
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
                </div>
		</div>

    </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotuList:[],
            goodsinfo:{},
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods:{
        getLunbotu(){
        this.axios.get('/api/getthumimages/'+this.id)
        .then(result=>{
                result.data.message.forEach(item=>{
                    item.img=item.src
                })
                this.lunbotuList=result.data.message
        })
        .catch(err =>{
            Toast('商品加载失败...')
        })
        },
        getGoodsInfo(){
            this.axios.get('/api/goods/getinfo/'+this.id)
        .then(result=>{           
                this.goodsinfo=result.data.message[0]
        })
        .catch(err =>{
            Toast('商品加载失败...')
        })
        },
        goDesc(id){
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShopCar(){
            this.ballFlag=!this.ballFlag
            var goodsinfo={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            const ballPosition=this.$refs.ball.getBoundingClientRect()
            const badgePosition=document.getElementById("badge").getBoundingClientRect()
            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top
            el.style.transform=`translate(${xDist}px,${yDist}px)`
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        getSelectedCount(count){
            this.selectedCount=count
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        top: 390px;
        left:138px;
        z-index: 99;
        
    }
}
</style>


