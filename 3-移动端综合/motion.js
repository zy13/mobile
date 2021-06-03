// IOS 下动作与方向的访问权限
(function () {
  if(!window.DeviceMotionEvent){
    alert("您的设备不支持动作与方向的访问");  
    return ;
  }
  // 检测用户是否关闭动作与方向的访问权限
  let timer = setTimeout(() => {
    alert("请开启动作与方向的访问权限");
  }, 300);
  window.addEventListener("devicemotion", () => {
    clearTimeout(timer);
  }, { once: true });
})();

function isAndroid() {
  const {userAgent} = window.navigator;
  return userAgent.indexOf("Android") > -1|| userAgent.indexOf("Adr") > -1;
}
//设置 devicemotion 事件
function setMotion(fn) {
  // 区分 IOS 13
  if(typeof fn !== "function"){
    return ;
  }
  const eventFn = (e)=>{
    if(isAndroid()){
      e.acceleration.x = -e.acceleration.x;
      e.acceleration.y = -e.acceleration.y;
      e.acceleration.z = -e.acceleration.z;
      e.accelerationIncludingGravity.x = -e.accelerationIncludingGravity.x;
      e.accelerationIncludingGravity.y = -e.accelerationIncludingGravity.y;
      e.accelerationIncludingGravity.z = -e.accelerationIncludingGravity.z; 
    }
    alert(666)
    fn(e);
  };
  if(typeof DeviceMotionEvent.requestPermission === "function"){
    // ios 13 以后
    DeviceMotionEvent.requestPermission().then(()=>{
      window.addEventListener("devicemotion",eventFn);
    },()=>{
      alert("请允许动作与方向方向的访问权限，否则无法使用本应用")
    })
  } else {
    // ios 13 之前,或 安卓
    window.addEventListener("devicemotion",eventFn);
  }
  return ()=>{
    window.removeEventListener("devicemotion",eventFn);
  }
}