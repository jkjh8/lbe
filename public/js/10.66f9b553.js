(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{6814:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{staticClass:"flex flex-center"},[s("q-card",{staticStyle:{"min-width":"350px"}},[s("q-card-section",{staticClass:"row bg-teal-14 q-py-sm items-center"},[s("div",{staticClass:"text-h6 text-white text-weight-bold"},[e._v("\n        내 프로필\n      ")]),s("q-space")],1),e.user?s("q-card-section",[s("div",{staticClass:"flex flex-center column",staticStyle:{position:"relative"}},[e.user&&e.user.profile_image?s("div",[s("q-avatar",{attrs:{size:"100px"}},[s("img",{attrs:{src:e.user.profile_image}})])],1):s("div",[s("q-avatar",{attrs:{size:"100px"}},[s("q-icon",{attrs:{name:"account_circle",color:"grey",size:"100px"}})],1)],1),s("div",[e.user&&e.user.admin?s("span",{staticClass:"text-body2"},[e._v("\n            관리자\n          ")]):e._e(),s("span",{staticClass:"text-orange"},[e._v(e._s(e.user.level))])]),s("div",[s("span",{staticClass:"text-h6"},[e._v(e._s(e.user.name))])]),s("div",{staticClass:"text-h6 text-grey"},[e._v("\n          "+e._s(e.user.email)+"\n        ")])]),s("q-list",{staticClass:"q-mt-md"},[s("q-item",[s("q-item-section",[s("q-item-label",{staticClass:"text-grey",attrs:{overline:""}},[e._v("\n              서비스 제공자\n            ")]),s("q-item-label",{staticStyle:{"text-transform":"uppercase"}},[e._v("\n              "+e._s(e.user.provider)+"\n            ")])],1)],1),s("q-item",[s("q-item-section",[s("q-item-label",{staticClass:"text-grey",attrs:{overline:""}},[e._v("\n              아이디\n            ")]),s("q-item-label",[e._v(e._s(e.user.id))])],1)],1),s("q-item",[s("q-item-section",[s("q-item-label",{staticClass:"text-grey",attrs:{overline:""}},[e._v("\n              가입일\n            ")]),s("q-item-label",[e._v(e._s(e.dateFormat(e.user.createAt)))])],1)],1),s("q-item",[s("q-item-section",[s("q-item-label",{staticClass:"text-grey",attrs:{overline:""}},[e._v("\n              최근 수정일\n            ")]),s("q-item-label",[e._v(e._s(e.dateFormat(e.user.updateAt)))])],1)],1),s("q-item",[s("q-item-section",[s("q-item-label",{staticClass:"text-grey",attrs:{overline:""}},[e._v("\n              최근 로그인\n            ")]),s("q-item-label",[e._v(e._s(e.dateFormat(e.user.loginAt)))])],1)],1),s("q-item",{attrs:{clickable:""},on:{click:e.logout}},[s("q-item-section",[s("q-item-label",{staticClass:"text-red"},[e._v("로그아웃")])],1)],1),s("q-item",{attrs:{clickable:""},on:{click:function(t){return e.confirmDel(e.user)}}},[s("q-item-section",[s("q-item-label",{staticClass:"text-red"},[e._v("회원 탈퇴 및 서비스 해지")])],1)],1)],1)],1):e._e()],1)],1)},a=[],o=s("ded3"),r=s.n(o),n=s("c1df"),l=s.n(n),c=s("2f62"),m=s("e057"),u={mixins:[m["a"]],computed:r()(r()({},Object(c["c"])({user:e=>e.user.user})),Object(c["b"])({nickName:"user/nickname"})),mounted(){console.log(this.user)},methods:{dateFormat(e){return l()(e).format("YYYY-MM-DD hh-mm-ss a")},confirmDel(e){this.$q.dialog({title:"확인",message:"정말 삭제하시겠습니까?",cancel:!0,persistent:!0}).onOk((()=>{this.deleteUser(e)})).onCancel((()=>{})).onDismiss((()=>{}))}}},h=u,d=s("2877"),g=s("9989"),p=s("f09f"),v=s("a370"),q=s("2c91"),f=s("cb32"),_=s("0016"),x=s("1c1c"),y=s("66e5"),b=s("4074"),$=s("0170"),I=s("eebe"),S=s.n(I),C=Object(d["a"])(h,i,a,!1,null,null,null);t["default"]=C.exports;S()(C,"components",{QPage:g["a"],QCard:p["a"],QCardSection:v["a"],QSpace:q["a"],QAvatar:f["a"],QIcon:_["a"],QList:x["a"],QItem:y["a"],QItemSection:b["a"],QItemLabel:$["a"]})},e057:function(e,t,s){"use strict";t["a"]={data(){return{idSave:!1,header:{},loginUrl:"/auth/local",userInfo:{email:"",password:""}}},methods:{login(e,t){this.loginUrl="local"===e?"/auth/local":"/auth/oauth",this.$axios.post(this.loginUrl,t).then((async e=>{this.getUserInfo(),this.$q.notify({type:"positive",message:"로그인 성공하였습니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/")}),1500)})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.info.message,position:"center",timeout:1e3}),this.$router.push("/login")}))},register(e){this.$axios.post("/auth/local/register",e).then((e=>{console.log(e),this.$q.notify({type:"positive",message:"회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.",position:"center",timeout:1e3}),setTimeout((()=>{this.$router.push("/login")}),1e3)})).catch((e=>{console.log(e),this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3}),this.$router.push("/register")}))},checkIdSave(){this.idSave="true"===localStorage.getItem("idSave"),this.idSave&&(this.userInfo.email=localStorage.getItem("userId"))},setIdSave(){localStorage.setItem("idSave",this.idSave),this.setUserId()},clearUserId(){localStorage.setItem("idSave",this.idSave),localStorage.removeItem("userId")},setUserId(){localStorage.setItem("userId",this.userInfo.email)},getUserInfo(){this.$axios.get("/auth/get").then((e=>{this.$store.commit("user/updateUser",e.data.user)})).catch((e=>{console.log(e.response.data)}))},getAccessToken(){console.log("not token")},logout(){this.$axios.get("/auth/logout").then((e=>{this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$router.push("/"),this.$q.notify({type:"positive",message:"로그아웃 완료하였습니다.",position:"center",timeout:1e3})}))},deleteUser(e){this.$axios.post("/auth/del",e).then((e=>{e.data.success&&(this.$store.commit("user/updateUser",null),this.$store.commit("eventlog/updateLog",[]),this.$q.notify({type:"positive",message:"회원 탈퇴하였습니다. 홈페이지로 이동합니다.",position:"center",timeout:1e3})),this.$router.push("/")})).catch((e=>{this.$q.notify({type:"negative",message:e.response.data.message,position:"center",timeout:1e3})}))}}}}}]);