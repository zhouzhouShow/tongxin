<template>
	<view class="vip-model">
		<view class="vip-model-bg" @click.stop='handleCloseModel'></view>
		<view class="vip-model-main">
			<view :class="['vip-model-main-info',info.tagType.indexOf(info.tag) != -1?'vip-model-main-info-other':'']">
				<view>
					<image :src="info.avatar"></image>
				</view>
				<view>Hi,{{info.title}}</view>
				<view v-if='info.tagType.indexOf(info.tag) != -1'>自您{{info.date}}成为{{info.type}}</view>
			</view>
			<view class="vip-model-main-tip">
				<view v-if='info.tagType.indexOf(info.tag) == -1'>
					<view>成为{{info.type}}预计<text>一年可省</text></view>
					<view><text>¥{{info.total}}</text></view>
				</view>
				<view class='vip-model-main-tip-other' v-else>
					<view>
						<view>共消费</view>
						<view>¥{{info.spend}}</view>
					</view>
					<view>
						<view>{{info.type}}已为您节省</view>
						<view>¥{{info.total}}</view>
					</view>
				</view>
			</view>
			<view :class="['vip-model-main-computed',info.tagType.indexOf(info.tag) != -1?'vip-model-main-computed-other':'']">
				<view class="vip-model-main-computed-title">
					<view>{{info.type}}省钱计算器</view>
					<view v-if='info.tagType.indexOf(info.tag) == -1'>(根据{{info.time}}客户权益使用平均值)</view>
				</view>
				<view class="vip-model-main-computed-main">
					<view class="vip-model-main-computed-main-item" v-for='item in info.vipComputed' :key='item.name'>
						<view>
							<view></view>
							<view>{{item.name}}</view>
						</view>
						<view>¥{{item.total}}</view>
					</view>
				</view>
			</view>
			<view class="vip-model-main-btn" @click='dredge'>
				<view>{{info.tagType.indexOf(info.tag) != -1?'继续逛逛':'立即开通'}}</view>
			</view>
			<view class="vip-model-close" @click='handleCloseModel'>
				<image src="/static/icon/close.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			from: {
				type: String,
				default: 'dredgeVip'
			},
			info: {
				type: Object,
				default: function() {
					return {
						avatar: '',
						title: '芙兰会员FLAN000', //标题 默认Hi,芙兰会员FLAN666
						total: '9993', //省钱总额
						type: '芙兰会员', //会员类型 芙兰会员 PLUS会员 加盟代理
						time: '2018-2019', //芙兰会员(根据2018-2019客户权益使用平均值)
						date: '2019-09-02', //PLUS会员和加盟代理(自您2019-10-1成为xxxx)
						spend: '0.00', //PLUS会员和加盟代理才会显示的 共消费¥12020122.00
						tag: 0, //用户标签 用以显示不同身份下的弹窗的不同内容
						vipComputed: [ //省钱计算器的数据
							{
								name: '专享优惠',
								total: '3853'
							},
							{
								name: '节省运费',
								total: '693'
							},
							{
								name: '优惠券折扣',
								total: '165'
							},
							{
								name: '节省差旅费',
								total: '4136'
							},
							{
								name: '充值返利',
								total: '1200'
							}
						]
					}
				}
			}
		},
		data() {
			return {
				level: 0
			}
		},
		methods: {
			//上报点击事件给父组件
			dredge() {
				this.$emit('dredge', this.info)
			},
			handleCloseModel() {
				this.$emit('handleCloseModel')
			}
		},
		created() {
			if (this.from == 'dredgeVip') {
				this.level = 14
			}
			if (this.from == 'dredgeAgent') {
				this.level = 13
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip-model {
		.vip-model-bg {
			position: fixed;
			z-index: 10;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
		}

		.vip-model-main {
			position: fixed;
			z-index: 11;
			width: 80%;
			height: 900rpx;
			top: 50%;
			left: 10%;
			transform: translateY(-50%);
			background: white;
			border: 3rpx solid rgba(218, 173, 115, 1);
			border-radius: 10rpx;

			.vip-model-main-info {
				height: 237rpx;
				border-bottom: 1px solid #EBCA9C;
				overflow: hidden;
				text-align: center;

				>view:nth-child(1) {
					width: 126rpx;
					height: 126rpx;
					margin: 40rpx auto 20rpx;
					border-radius: 64rpx;
					background: orange;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				>view:nth-child(2) {
					font-size: 30rpx;
					font-weight: 500;
					color: rgba(218, 173, 115, 1);
				}

				>view:nth-child(3) {
					font-size: 24rpx;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
				}
			}

			.vip-model-main-info-other {
				height: 271rpx;
			}

			.vip-model-main-tip {
				text-align: center;
				height: 133rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(91, 64, 44, 1);
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-bottom: 1px solid #EBCA9C;

				text {
					font-weight: bold;
				}

				.vip-model-main-tip-other {
					text-align: center;
					font-size: 30rpx;
					font-weight: 500;
					color: rgba(91, 64, 44, 1);
					display: flex;
					position: relative;

					>view {
						flex: 1
					}

					>view:nth-child(1)::after {
						content: '';
						position: absolute;
						height: 60rpx;
						width: 1rpx;
						background: #EBCA9C;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}

			.vip-model-main-computed {
				height: 411rpx;
				overflow: hidden;

				.vip-model-main-computed-title {
					text-align: center;

					view:nth-child(1) {
						font-size: 28rpx;
						font-weight: bold;
						color: rgba(218, 173, 115, 1);
						margin-top: 19rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						font-weight: 500;
						color: rgba(153, 153, 153, 1);
					}
				}

				.vip-model-main-computed-main {
					padding: 0 40rpx;
					margin-top: 20rpx;

					.vip-model-main-computed-main-item {
						display: flex;
						justify-content: space-between;
						font-size: 26rpx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						margin-bottom: 20rpx;

						>view:nth-child(1) {
							display: flex;
							align-items: center;

							>view:nth-child(1) {
								width: 15rpx;
								height: 15rpx;
								background: #DAAD73;
								transform: rotate(45deg);
								margin-right: 8rpx;
							}

							>view:nth-child(2) {}
						}

						>view:nth-child(2) {}
					}
				}
			}

			.vip-model-main-computed-other {
				height: 377rpx;
			}

			.vip-model-main-btn {
				height: 116rpx;
				box-shadow: 0rpx -3rpx 7rpx 0rpx rgba(254, 189, 79, 0.2);
				border-radius: 0rpx 0rpx 10rpx 10rpx;
				overflow: hidden;

				view {
					width: 75%;
					height: 80rpx;
					margin: 18rpx auto;
					background: linear-gradient(90deg, rgba(248, 214, 150, 1) 0%, rgba(254, 188, 75, 1) 100%);
					border-radius: 40rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 34rpx;
					font-weight: bold;
					color: rgba(109, 64, 12, 1);
				}
			}

			.vip-model-close {
				position: absolute;
				width: 27rpx;
				height: 27rpx;
				top: 20rpx;
				right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
