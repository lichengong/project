<template>
  <div class="photoinfo-container">
    <h1>{{photoinfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr>
    <div class="thumbs">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumImages();
  },
  mounted() {
    document.getElementsByTagName("img").className = "img";
  },
  methods: {
    getPhotoInfo() {
      this.axios
        .get("/api/getimageInfo/" + this.id)
        .then(result => {
          this.photoinfo = result.data.message[0];
        })
        .catch(err => {
          Toast("获取图文资讯详情失败！");
        });
    },
    getThumImages() {
      this.axios
        .get("/api/getthumimages/" + this.id)
        .then(result => {
          result.data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.src = item.src;
            item.msrc = item.src;
          });

          this.slide1 = result.data.message;
        })
        .catch(err => {
          Toast("获取图片缩略图失败！");
        });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h1 {
    font-size: 15px;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .thumbs {
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
      }
    }
  }
}

  .content {
    font-size: 13px;
    line-height: 30px;
  }
  
}
</style>
