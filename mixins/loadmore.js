export default {
  data() {
    return {
      loadMore: 1,
      page: 1,
      pageSize: 15,
      isEmpty: false
    }
  },
  methods: {
    timeOutLoaded() {
      setTimeout(() => {
        this.$tip.loaded();
      }, 200)
    },
    loadMoreStatusDeal(list) {
      if (list.length > 0) {
        if (list.length == this.pageSize) {
          this.loadMore = 1;
        } else {
          this.loadMore = 3;
        }
      } else {
        this.loadMore = 3;
      }
      if (this.page == 1 && list.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    },
    refreshLoad() {
      return new Promise(resolve => {
        this.loadMore = 1;
        this.page = 1;
        this.reachBottomCallBack();
        resolve();
      })
    },
    reachBottomCallBack() {
    }  //触底方法
  },
  onReachBottom() {
    if (this.loadMore == 1) {
      this.page++;
      this.loadMore = 2;
      this.reachBottomCallBack();
    }
  }
}
