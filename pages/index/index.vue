<template>
  <view class="content">
    <view class="top-padding"></view>
    <view class="tips">拼车友情提示</view>
    <view class="banner">
      <u-swiper :list="banner" @click="click"></u-swiper>
    </view>
    <view class="tabs">
      <u-tabs :list="tabs" :activeStyle="{
            color: '#2d2d2d',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" @click="changeTabbar"></u-tabs>
    </view>
    <view class="item-list" v-if="itemList.length">
      <template v-for="(item, index) in itemList">
        <view class="item-card" :class="{overtime: item.status === 2}" :key="index">
          <view class="card-header">
            <view class="tags">
              <view v-if="item.top.is === 1" class="tag top">置顶</view>
              <view v-if="item.status === 2" class="tag overtime">过期</view>
              <view v-if="item.type === 1" class="tag car">车找人</view>
              <view v-if="item.type === 2" class="tag people">人找车</view>
            </view>
            <view class="number" v-if="item.status !== 2">
              <text>人数</text>
              <text class="digtal">{{item.seat}}</text>
            </view>
          </view>

          <view class="address">
            <text>{{item.from}}</text>
            <img src="../../static/imgs/arrow.png" class="arrow" />
            <text>{{item.to}}</text>
          </view>

          <view class="trip-time">
            <text class="start">出发:</text>
            <text class="time">{{item.starttime}}</text>
          </view>

          <view class="extr-msg" v-if="item.remark">
            <text class="start">备注: {{item.remark}}</text>
          </view>
        </view>

      </template>
      <u-loadmore line status="nomore" />
    </view>
    <view v-if="!itemList.length">
      <u-loadmore line status="nomore" />
    </view>

    <u-action-sheet :actions="list" :closeOnClickAction="true" @select="selectClick" title="选择操作" cancelText="取消"
      round="6" :show="show" @close="closeAction"></u-action-sheet>



    <u-tabbar :value="tabbar" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item text="首页" icon="home" @click="changeTab"></u-tabbar-item>
      <u-tabbar-item text="发布" icon="plus" @click="changeTab"></u-tabbar-item>
      <u-tabbar-item text="我的" icon="account" @click="changeTab"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
  import Mock from '../../api/mock/list.js'
  export default {
    data() {
      return {
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
        tabbar: 0,
        title: 'Hello',
        itemList: [],
        tabs: [{
          type: 99,
          name: '全部',
        }, {
          type: 1,
          name: '车找人',
        }, {
          type: 2,
          name: '人找车'
        }],
        banner: [
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        ]
      }
    },
    onLoad() {
      this.itemList = Mock;
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
      changeTabbar(item) {
        if (item.type === 1) {
          this.itemList = Mock.filter((item) => item.type === 1);
        } else if (item.type === 2) {
          this.itemList = Mock.filter((item) => item.type === 2);
        } else {
          this.itemList = Mock;
        }
      },

      // 发布事件
      selectClick(index) {
        console.log(index.type)
        uni.navigateTo({
          url: `/pages/publish/publish?type=${index.type}`
        })
      },
      closeAction() {
        this.show = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import '../../static/style/global.scss';

  .content {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    min-height: 100vh;
    background-image: linear-gradient(rgb(180, 200, 255), rgb(240, 250, 255) 18%, rgb(240, 250, 255) 80%);

    .top-padding {
      padding-top: 66px;
    }

    .tips {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 28px;
      color: $uni-text-color-inverse;
      background-color: $uni-color-primary;
      border-radius: $uni-border-radius-lg;

    }

    .banner {
      width: 100%;
      height: 120px;
      margin: 20px 0;
    }

    .tabs {
      position: sticky;
      top: 90px;
    }

    .item-list {
      // background-color: #ddd;
      margin: 20px 0;
    }

    .item-card {
      background-color: $uni-text-color-inverse;
      padding: 8px 5px;
      margin-bottom: 16px;
      border-radius: $uni-border-radius-lg;

      &.overtime {
        background-color: #f8f8f8;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, .05);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tags {
          display: flex;

          .tag {
            font-size: 10px;
            margin-right: 8px;
            border-radius: $uni-border-radius-base;
            padding: 1px 5px;
            color: $uni-text-color-inverse;

            &.car {
              background-color: $uni-color-primary;
            }

            &.people {
              background-color: #ff9900;
            }

            &.top {
              background-color: #fa3534;
            }

            &.overtime {
              background-color: #909399;
            }
          }
        }

        .number {
          color: $uni-text-color;

          .digtal {
            color: $uni-color-primary;
            font-weight: 700;
            margin: 0 6px;
          }
        }
      }

      .address {
        display: flex;
        align-items: center;
        margin: 14px 0;
        font-size: 16px;
        font-weight: 700;
        max-width: 100%;

        text {
          // max-width: calc(100%/2 - 40px);
          color: $uni-text-color;
          flex-shrink: 1;
        }

        .arrow {
          min-width: 20px;
          width: 20px;
          height: 20px;
          margin: 0 10px;
          flex-shrink: 1;
        }
      }

      .trip-time {
        font-size: 18px;
        font-weight: 700;

        .start {
          color: #888;
        }

        .time {
          color: $uni-text-color;
          margin-left: 3px;
        }
      }

      .extr-msg {
        margin-top: 10px;
        font-size: 14px;
        color: $uni-text-color-grey;
        font-weight: 400;
        width: 100%;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>