const shakeScroll = {
  isShake: true,
  lastFun:'',
  setShake(fun) {
    if(this.isShake){
      this.isShake = false;
      fun();
      setTimeout(()=>{
        this.isShake = true;
      //   if(this.lastFun!=''){
      //     this.lastFun();
      //   }
      },300)
    }else{
      this.lastFun=fun;
    }
  }
}

export default shakeScroll