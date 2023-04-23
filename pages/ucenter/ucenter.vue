<template>
  <view class="content">
    <view class="top-padding"></view>
    <view>
      <u-navbar :autoBack="true" bgColor="transparent" />
      <!-- <u-icon name="arrow-left" color="#333" size="22" /> -->
    </view>
    <view class="avatar">
      <u-avatar :src="src" size="70px"></u-avatar>
      <text>头像名称</text>
    </view>

    <view class="shape">
      <view class="block">
        <view class="title">
          <text>积分</text>
        </view>
        <view class="count">
          <!-- <text>100</text> -->
          <u-count-to :startVal="0" :endVal="100" color="#fff"></u-count-to>
        </view>
      </view>
      <view class="block">
        <view class="title">
          <text>拼单</text>
        </view>
        <view class="count">
          <text>0</text>
        </view>
      </view>
    </view>

    <view class="main-menu">
      <u-cell-group :border="false">
        <u-cell :titleStyle="{fontWeight: 500}" :title="item.title" v-for="(item, index) in linelist" :key="index"
          isLink :icon="item.iconUrl" @click="handleClick(item)" :border="index !== linelist.length-1">
        </u-cell>
      </u-cell-group>
    </view>

    <view class="main-menu">
      <u-cell-group :border="false">
        <u-cell :titleStyle="{fontWeight: 500}" :title="item.title" v-for="(item, index) in baseMenu" :key="index"
          isLink :icon="item.iconUrl" @click="handleClick(item)" :border="index !== linelist.length">
        </u-cell>
      </u-cell-group>
    </view>

    <!-- <u-action-sheet :actions="list" :closeOnClickAction="true" @select="selectClick" title="选择操作" cancelText="取消"
      round="6" :show="show" @close="closeAction"></u-action-sheet> -->

    <!--    <u-tabbar :value="tabbar" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item text="首页" icon="home" @click="changeTab"></u-tabbar-item>
      <u-tabbar-item text="发布" icon="plus" @click="changeTab"></u-tabbar-item>
      <u-tabbar-item text="我的" icon="account" @click="changeTab"></u-tabbar-item>
    </u-tabbar> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        src: 'https://cdn.uviewui.com/uview/album/1.jpg',
        tabbar: 2,
        list: [{
            type: 1,
            name: '人找车'
          },
          {
            type: 2,
            name: '车找人'
          }
        ],
        show: false,
        linelist: [{
            type: 'default',
            title: '个人资料',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
          },
          {
            type: 'error',
            title: '我的发布',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
          },
          {
            type: 'success',
            title: '邀请好友',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
          }
        ],
        baseMenu: [{
            id: 1,
            title: '免责声明',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
          },
          {
            id: 2,
            title: '获取帮助',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
          },
          {
            id: 3,
            title: '提供建议',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
          },
          {
            id: 4,
            title: '联系客服',
            iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
          },

        ],
      };
    },
    methods: {
      changeTab(e) {
        this.tabbar = e;
        if (e === 0) {
          uni.navigateTo({
            url: '/pages/index/index'
          });
        }
        if (e === 1) {
          this.show = true;
        }
        if (e === 2) {
          uni.navigateTo({
            url: '/pages/ucenter/ucenter'
          });
        }

      },
      closeAction() {
        this.show = false;
      },
      handleClick(item) {
        console.log(item)
      }
    },
    // 执行一次
    onLoad() {
      console.log('ucenter')
    },
    onShow() {
      console.log('ucenter-show')
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    min-height: 100vh;
    background-image: linear-gradient(rgb(180, 200, 255), rgb(240, 250, 255) 18%, rgb(240, 250, 255) 80%);

    .top-padding {
      padding-top: 106px;
      // height: var(--status-bar-height);
    }

    .avatar {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      text {
        margin-top: 16px;
        font-size: 16px;
        font-weight: 700;
      }
    }

    .shape {
      width: 100%;
      display: flex;
      padding: 30px 0;
      justify-content: space-between;

      .block {
        background-color: $uni-color-primary;
        width: calc(48% - 20px);
        padding: 10px;
        border-radius: $uni-border-radius-lg;
        color: $uni-text-color-inverse;

        .title {
          font-size: 12px;
        }

        .count {
          text-align: center;
          padding: 1px;
          font-size: 16px;
          font-weight: 700;
        }


      }
    }

    .main-menu {
      background-color: $uni-bg-color;
      border-radius: $uni-border-radius-base;
      margin: 16px 0;
    }
  }
</style>