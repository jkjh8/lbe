(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"0a8e":function(e,t,o){"use strict";t["a"]={data(){return{kakaoUserInfo:null}},mounted(){console.log("kakao"),window.Kakao||this.initKakao()},methods:{initKakao(){const e=document.createElement("script");e.onload=()=>this.loadKakao(),e.src="https://developers.kakao.com/sdk/js/kakao.js",document.head.appendChild(e)},loadKakao(){window.Kakao.init("4d65cf7f876fc34541c3513fa53b0c11")},getKakaoUserInfo(e){window.Kakao.isInitialized()?window.Kakao.Auth.login({scope:"account_email",success:()=>{window.Kakao.API.request({url:"/v2/user/me",success:t=>{if(!t.kakao_account.has_email)return this.$q.notify({type:"negative",message:"계정 정보에 이메일 정보가 없습니다. 다른 방법을 시도해 주세요",position:"center",timeout:1e3}),this.$router.push("/register");{const o={id:t.id,name:t.properties.nickname,nickname:t.properties.nickname,profile_image:t.properties.profile_image,email:t.kakao_account.email,provider:"kakao",createAt:Date.now(),updateAt:Date.now()};"login"===e?this.login("kakao",o):this.register(o)}}})},fail:e=>{console.log(e)}}):this.$q.notify({type:"negative",message:"에러가 발생했습니다. 잠시후에 다시 시도해 주세요",position:"center",timeout:1e3})},async loginKakao(){this.getKakaoUserInfo("login")},registerKakao(){this.getKakaoUserInfo("register")}}}},"3cd9":function(e,t,o){"use strict";o("3f8b")},"3f8b":function(e,t,o){},5307:function(e,t){e.exports="data:image/png;base64,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"},"53a8":function(e,t,o){"use strict";t["a"]={data(){return{naverLogin:null,src:"https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js",loginCb:"http://localhost:8080/login/callback/naver",registerCb:"http://localhost:8080/register/callback/naver"}},mounted(){},methods:{loginFromNaver(e){const t=document.createElement("script");t.onload=()=>this.initLoginFromNaver(e),t.src=this.src,document.head.appendChild(t)},initLoginFromNaver(e){this.naverLogin=new window.naver.LoginWithNaverId({clientId:"5qM_Yvcjhr4T8Kwe5JZJ",callbackUrl:e?this.loginCb:this.registerCb,callbackHandle:!0,isPopup:!0}),this.naverLogin.init()},loginNaver(){this.naverLogin.reprompt()}}}},"68ec":function(e,t,o){"use strict";t["a"]={data(){return{facebookUserInfo:null}},mounted(){console.log("facebook"),window.FB||this.initFacebook()},methods:{initFacebook(){window.fbAsyncInit=function(){window.FB.init({appId:467027217933174,cookie:!0,xfbml:!0,version:"v10.0"}),window.FB.AppEvents.logPageView()},function(e,t,o){let a,s=e.getElementsByTagName(t)[0];e.getElementById(o)||(a=e.createElement(t),a.id=o,a.src="https://connect.facebook.net/en_US/sdk.js",s.parentNode.insertBefore(a,s))}(document,"script","facebook-jssdk")},loginFacebook(e){window.FB.getLoginStatus((()=>{window.FB.login((t=>{"connected"===t.status&&window.FB.api("/me",{fields:"name, email, picture"},(t=>{if(!t)return this.loginFailure();const o={id:t.id,name:t.name,nickname:t.name,profile_image:t.picture.data.url,email:t.email,provider:"facebook",createAt:Date.now(),updateAt:Date.now()};console.log(o),console.log(e),e?this.login("facebook",o):this.register(o)}))}),{scope:"public_profile, email"})}))},loginFailure(){return this.$q.notify({type:"negative",message:"로그인 할 수 없습니다. 다른 방법을 선택하거나 잠시 후에 시도해주세요.",position:"center",timeout:1e3}),this.$router.go(-1)}}}},"78c9":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"flex flex-center"},[a("div",{staticClass:"column"},[a("q-btn",{staticClass:"q-my-sm",attrs:{rounded:"",color:"blue-grey-9"},on:{click:function(t){return e.$router.push("/register/local")}}},[a("div",{staticClass:"fit row flex"},[a("div",[a("q-avatar",{attrs:{icon:"email",color:"blue-grey-9","text-color":"white",size:"34px","font-size":"14px"}})],1),a("div",{staticClass:"text-subtitle1 absolute-center"},[e._v("\n            이메일로 회원가입\n          ")])])]),a("q-btn",{staticClass:"kakao q-my-sm",attrs:{rounded:""},on:{click:function(t){return e.registerKakao(!1)}}},[a("div",{staticClass:"fit row flex"},[a("div",[a("q-avatar",{attrs:{size:"34px"}},[a("img",{attrs:{src:"https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"}})])],1),a("div",[a("div",{staticClass:"text-subtitle1 absolute-center"},[e._v("\n              카카오로 회원가입\n            ")])])])]),a("q-btn",{staticClass:"naver q-my-sm",attrs:{rounded:""},on:{click:function(t){return e.loginNaver(!1)}}},[a("div",{staticClass:"fit row flex"},[a("div",[a("q-avatar",{attrs:{size:"34px"}},[a("img",{attrs:{src:o("9407")}})])],1),a("div",[a("div",{staticClass:"text-subtitle1 absolute-center text-white"},[e._v("\n              네이버로 회원가입\n            ")])])])]),a("q-btn",{staticClass:"facebook q-my-sm",attrs:{rounded:""},on:{click:function(t){return e.loginFacebook(!1)}}},[a("div",{staticClass:"fit row flex"},[a("div",[a("q-avatar",{attrs:{size:"34px"}},[a("img",{attrs:{src:o("5307")}})])],1),a("div",[a("div",{staticClass:"text-subtitle1 absolute-center text-white"},[e._v("\n              페이스북으로 회원가입\n            ")])])])]),a("router-link",{staticClass:"q-mt-sm",attrs:{to:"/login"}},[a("div",{staticClass:"fit row flex flex-center text-body2"},[e._v("\n          회원가입 취소\n        ")])])],1)])},s=[],i=o("e057"),n=o("0a8e"),r=o("53a8"),c=o("68ec"),u={mixins:[i["a"],n["a"],r["a"],c["a"]],data(){return{}},mounted(){window.naver?this.initLoginFromNaver(!1):this.loginFromNaver(!1)},methods:{}},l=u,A=(o("3cd9"),o("2877")),d=o("9989"),p=o("9c40"),h=o("cb32"),g=o("eebe"),m=o.n(g),f=Object(A["a"])(l,a,s,!1,null,null,null);t["default"]=f.exports;m()(f,"components",{QPage:d["a"],QBtn:p["a"],QAvatar:h["a"]})},9407:function(e,t){e.exports="data:image/png;base64,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"},e057:function(e,t,o){"use strict";t["a"]={data(){return{idSave:!1,header:{},loginUrl:"/auth/local",userInfo:{email:"",password:""}}},methods:{login(e,t){this.loginUrl="local"===e?"/auth/local":"/auth/oauth",this.$axios.post(this.loginUrl,t).then((async e=>{this.getUserInfo(),this.$q.notify({type:"positive",message:"로그인 성공하였습니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/")}),1500)})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.info.message,position:"center",timeout:1e3}),this.$router.push("/login")}))},register(e){this.$axios.post("/auth/local/register",e).then((e=>{console.log(e),this.$q.notify({type:"positive",message:"회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/login")}),1e3)})).catch((e=>{console.log(e),this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3}),this.$router.push("/register")}))},checkIdSave(){this.idSave="true"===localStorage.getItem("idSave"),this.idSave&&(this.userInfo.email=localStorage.getItem("userId"))},setIdSave(){localStorage.setItem("idSave",this.idSave),this.setUserId()},clearUserId(){localStorage.setItem("idSave",this.idSave),localStorage.removeItem("userId")},setUserId(){localStorage.setItem("userId",this.userInfo.email)},getUserInfo(){this.$axios.get("/auth/get").then((e=>{this.$store.commit("user/updateUser",e.data.user)})).catch((e=>{console.log(e.response.data)}))},getAccessToken(){console.log("not token")},logout(){this.$axios.get("/auth/logout").then((e=>{this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$router.push("/"),this.$q.notify({type:"positive",message:"로그아웃 완료하였습니다.",position:"center",timeout:1e3})}))},deleteUser(e){this.$axios.post("/auth/del",e).then((e=>{e.data.success&&(this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$q.notify({type:"positive",message:"회원 탈퇴하였습니다. 홈페이지로 이동합니다.",position:"center",timeout:1e3})),this.$router.push("/")})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3})}))}}}}}]);