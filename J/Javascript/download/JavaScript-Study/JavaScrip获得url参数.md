#### 方法1：正则分析法
```javascript
function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}
alert(GetQueryString("参数名1"));
alert(GetQueryString("参数名2"));
alert(GetQueryString("参数名3"));
```

#### 方法2：
```javascript
<Script language="javascript">
function GetRequest() {
  
  var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
</Script>
// 然后我们通过调用此函数获取对应参数值：

<Script language="javascript">
var Request = new Object();
Request = GetRequest();
var 参数1,参数2,参数3,参数N;
参数1 = Request[''参数1''];
参数2 = Request[''参数2''];
参数3 = Request[''参数3''];
参数N = Request[''参数N''];
</Script>
//以此获取url串中所带的同名参数
```
