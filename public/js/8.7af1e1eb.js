(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"115d":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page")},o=[],a=s("e057"),n={mixins:[a["a"]],data(){return{naverLogin:null,src:"https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"}},mounted(){window.naver?this.setNaverCb(!0):this.initNaverCb(!0)},methods:{initNaverCb(){const e=document.createElement("script");e.onload=()=>this.setNaverCb(),e.src=this.src,document.head.appendChild(e)},setNaverCb(){console.log(window.naver),this.naverLogin=new window.naver.LoginWithNaverId({clientId:"5qM_Yvcjhr4T8Kwe5JZJ"}),this.naverLogin.init(),this.naverLogin.getLoginStatus((()=>{const e={id:this.naverLogin.user.id,name:this.naverLogin.user.name,nickname:this.naverLogin.user.nickname,email:this.naverLogin.user.email,profile_image:this.naverLogin.user.profile_image,provider:"naver",createAt:Date.now(),updateAt:Date.now()};this.login("naver",e)}))}}},r=n,h=s("2877"),l=s("9989"),u=s("eebe"),c=s.n(u),g=Object(h["a"])(r,i,o,!1,null,null,null);t["default"]=g.exports;c()(g,"components",{QPage:l["a"]})},e057:function(e,t,s){"use strict";t["a"]={data(){return{idSave:!1,header:{},loginUrl:"/auth/local",userInfo:{email:"",password:""}}},methods:{login(e,t){this.loginUrl="local"===e?"/auth/local":"/auth/oauth",this.$axios.post(this.loginUrl,t).then((async e=>{this.getUserInfo(),this.$q.notify({type:"positive",message:"로그인 성공하였습니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/")}),1500)})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.info.message,position:"center",timeout:1e3}),this.$router.push("/login")}))},register(e){this.$axios.post("/auth/local/register",e).then((e=>{console.log(e),this.$q.notify({type:"positive",message:"회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/login")}),1e3)})).catch((e=>{console.log(e),this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3}),this.$router.push("/register")}))},checkIdSave(){this.idSave="true"===localStorage.getItem("idSave"),this.idSave&&(this.userInfo.email=localStorage.getItem("userId"))},setIdSave(){localStorage.setItem("idSave",this.idSave),this.setUserId()},clearUserId(){localStorage.setItem("idSave",this.idSave),localStorage.removeItem("userId")},setUserId(){localStorage.setItem("userId",this.userInfo.email)},getUserInfo(){this.$axios.get("/auth/get").then((e=>{this.$store.commit("user/updateUser",e.data.user)})).catch((e=>{console.log(e.response.data)}))},getAccessToken(){console.log("not token")},logout(){this.$axios.get("/auth/logout").then((e=>{this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$router.push("/"),this.$q.notify({type:"positive",message:"로그아웃 완료하였습니다.",position:"center",timeout:1e3})}))},deleteUser(e){this.$axios.post("/auth/del",e).then((e=>{e.data.success&&(this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$q.notify({type:"positive",message:"회원 탈퇴하였습니다. 홈페이지로 이동합니다.",position:"center",timeout:1e3})),this.$router.push("/")})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3})}))}}}}}]);