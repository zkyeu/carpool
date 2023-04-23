<template>
  <view class="content">
    <view class="top-padding"></view>
    <view>
      <u-navbar title="发布行程信息" :autoBack="true" bgColor="transparent" />
    </view>


    <!-- 拼车信息 -->
    <view class="card">
      <view class="card-title">
        <text>拼车信息</text>
      </view>
      <view class="info-card">
        <view class="input-item">
          <text>起点</text>
          <u--input placeholder="请输入始发地" v-model="tripObj.form" suffixIcon="map"
            suffixIconStyle="color: #909399"></u--input>
        </view>
        <view class="input-item">
          <text>终点</text>
          <u--input placeholder="请输入目的地" v-model="tripObj.to" suffixIcon="map"
            suffixIconStyle="color: #909399"></u--input>
        </view>
        <view class="input-item">
          <text>日期</text>
          <!-- <view class="input-relace" @click="handleClick('date')"> {{tripObj.date}}</view> -->
          <u--input placeholder="请输入行程日期" v-model="tripObj.date" @focus="handleClick('date')" suffixIcon="calendar"
            suffixIconStyle="color: #909399"></u--input>
        </view>

        <view class="input-item">
          <text>时间</text>
          <!-- <view class="input-relace" @click="handleClick('time')"> {{tripObj.time}}</view> -->
          <u--input placeholder="请输入行程时间" v-model="tripObj.time" @focus="handleClick('time')" suffixIcon="clock"
            suffixIconStyle="color: #909399"></u--input>
        </view>
        <view class="input-item" v-if="type === '1'">
          <text>空位</text>
          <u--input placeholder="请选择提供座位数量" v-model="tripObj.seat" @focus="handleClick('seat')">
          </u--input>
        </view>
        <view class="input-item" v-if="type === '2'">
          <text>同行</text>
          <u--input placeholder="请预定座位数量" v-model="tripObj.seat" @focus="handleClick('seat')"></u--input>
        </view>
        <view class="input-item">
          <text>备注</text>
          <u--textarea v-model="tripObj.remark" placeholder="请输入备注信息" count height="50"></u--textarea>
        </view>
      </view>
    </view>

    <!-- 联系信息 -->
    <view class="card">
      <view class="card-title">
        <text>联系方式</text>
      </view>
      <view class="info-card">
        <view class="input-item">
          <text>称呼</text>
          <u--input placeholder="请输入昵称" v-model="contactObj.name"></u--input>
        </view>
        <view class="input-item">
          <text>性别</text>
          <view class="gender-style">
            <u-radio-group v-model="contactObj.gender" placement="row" @change="genderChange">
              <u-radio :customStyle="{marginLeft: '35px'}" v-for="(item, index) in genderList" :key="index"
                :label="item.name" :name="item.value" @change="genderChange">
              </u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="input-item">
          <text>手机</text>
          <u--input placeholder="请输入手机号" v-model="contactObj.phone" suffixIcon="phone" suffixIconStyle="color: #909399"
            type="number"></u--input>
        </view>
        <view class="input-item">
          <text>微信</text>
          <u--input placeholder="请输入微信号" v-model="contactObj.wechat" suffixIcon="weixin-fill"
            suffixIconStyle="color: #909399" type="text"></u--input>
        </view>
      </view>
    </view>

    <!-- 置顶信息 -->
    <view class="card">
      <!--      <view class="card-title">
        <text>我要置顶</text>
      </view> -->
      <view class="info-card">
        <view class="input-item">
          <text>置顶</text>
          <u-switch v-model="topObj.isTop" @change="changePosition"></u-switch>
        </view>

        <view class="top-style" v-if="topObj.istop">
          <view>
            <text class="top-time">置顶时长</text>
            <view>
              <text class="spend-item">置顶将消费</text>
              <text class="top-time-spend">{{topObj.spend}}积分/天</text>
            </view>
          </view>
          <u-number-box v-model="topObj.days" @change="changeTopTime" :min="1" :max="30"></u-number-box>
        </view>

      </view>
    </view>

    <!-- 公共调用 -->
    <view>
      <u-calendar :show="showDate" :mode="mode" @confirm="confirmDate" @close="handleClick('closeDate')"></u-calendar>
      <u-datetime-picker :show="showTime" v-model="tripObj.time" mode="time" :minHour="1" @confirm="confirmTime"
        @close="handleClick('closeTime')"></u-datetime-picker>
      <u-action-sheet :actions="seat" :closeOnClickAction="true" @select="selectClick"
        :title="`${type === '1' ? '所需座位数' : '提供座位数'}`" cancelText="取消" round="6" :show="showSelect"
        @close="closeAction"></u-action-sheet>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        type: '1',
        value1: Number(new Date()),
        title: 'publish',
        showDate: false,
        showTime: false,
        showSelect: false,
        mode: 'single',
        topObj: {
          istop: false,
          days: 0,
          spend: 20
        },
        tripObj: {
          type: 1,
          form: '',
          to: '',
          date: '',
          time: '',
          seat: '',
          remark: ''
        },
        contactObj: {
          name: '',
          gender: '',
          phone: '',
          wechat: ''
        },
        seat: [{
            name: '1'
          },
          {
            name: '2'
          },
          {
            name: '3'
          },
          {
            name: '4'
          },
          {
            name: '5'
          },
          {
            name: '6'
          }
        ],
        genderList: [{
          name: '男',
          value: 1
        }, {
          name: '女',
          value: 2
        }]
      }
    },
    // 执行一次
    onLoad(option) {
      // console.log('publish')
      console.log(option)
      this.type = option.type
      this.setSelectData(option.type);
    },
    onShow(option) {
      console.log('publish-show');
    },
    methods: {
      confirmDate(e) {
        if (e[0]) {
          this.tripObj.date = e[0];
          this.showDate = false;
        }
      },
      confirmTime(e) {
        console.log(e.value)
        if (e.value) {
          this.tripObj.time = e.value;
          this.handleClick('closeTime');
        }
      },
      selectClick(index) {
        this.tripObj.seat = index.name;
        this.handleClick('closeSeat');
      },
      closeAction() {
        this.handleClick('closeSeat');
      },
      handleClick(s) {
        switch (s) {
          case 'date':
            this.showDate = !this.showDate
            uni.hideKeyboard();
            break;
          case 'time':
            this.showTime = !this.showTime
            break;
          case 'closeDate':
            this.showDate = false
            break;
          case 'closeTime':
            this.showTime = false;
            break;
          case 'seat':
            this.showSelect = true;
            break;
          case 'closeSeat':
            this.showSelect = false;
            break;
          default:
        }

      },
      setSelectData(o) {
        console.log(o);
        let arr = [];
        for (let i = 1; i < 6; i++) {
          arr.push({ name: `i${o === '1'? '人': '座'}` })
        }
      },
      genderChange(n) {
        console.log('groupChange', n);
      },
      changePosition(e) {
        console.log('change', e);
        this.topObj.istop = e;
      },
      changeTopTime(e) {
        console.log('当前值为: ' + e.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    min-height: 100vh;
    background-image: linear-gradient(rgb(180, 200, 255), rgb(240, 250, 255) 18%, rgb(240, 250, 255) 80%);

    .top-padding {
      padding-top: 106px;
    }

    .card {
      padding: 10px 0;

      .card-title {
        font-size: 12px;
        color: $uni-text-color-grey;
        margin-bottom: 3px;
      }

      .info-card {
        background-color: $uni-text-color-inverse;
        padding: 16px 10px;
        margin-bottom: 16px;
        border-radius: $uni-border-radius-lg;

        .input-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;

          text {
            margin-right: 10px;
            flex-shrink: 1;
            width: 50px;
          }

          .input-relace {
            display: flex;
            align-items: center;
            width: 82%;
            height: 36px;
            border: #ddd solid 1px;
            border-radius: 5px;
            flex-shrink: 1;
            padding-left: 12px;
          }

          .gender-style {
            display: flex;
            align-items: center;
            width: 150px;
            height: 40px;
            // background-color: #ddd;

            // :deep(.u-radio-group) {
            //   background-color: #c00;
            // }

            // .u-radio-group {
            //   background-color: #c00;
            //   justify-content: space-between;
            // }

            // .u-radio-row {
            //   background: #ff0;
            // }

            // :deep(.u-radio-row) {
            //   background: #ff0;
            // }
          }
        }

        .top-style {
          display: flex;
          justify-content: space-between;

          text {
            font-size: 14px;
          }

          .spend-item {
            color: $uni-text-color-grey;
            font-size: 10px;
          }

          .top-time-spend {
            color: $uni-color-primary;
            font-size: 14px;
          }
        }
      }
    }


  }
</style>