<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getimglist(item.id)"
          >{{item.title}}</a>
          <!--<a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
							科技
          </a>-->
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="item in imglist" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      imglist: []
    };
  },
  created() {
    this.getimgcategory();
    this.getimglist(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getimgcategory() {
      this.axios
        .get("/api/getimgcategory")
        .then(result => {
          result.data.message.unshift({ title: "全部", id: 0 });
          this.cates = result.data.message;
        })
        .catch(err => {
          Toast("获取评论失败！");
        });
    },
    getimglist(id) {
      this.axios
        .get("/api/getimages/" + id)
        .then(result => {
          this.imglist = result.data.message;
        })
        .catch(err => {
          Toast("获取评论失败！");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  padding: 10px;
  margin: 0;
  padding-bottom: 0;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      max-height: 83px;
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 14px;
      }
    }
  }
}
</style>

