(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"+DOG":function(t,e,s){"use strict";var o=s("91VR"),i=s.n(o);i.a},"91VR":function(t,e,s){},"kYz/":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("header",{staticClass:"log-header"},[s("span",{staticClass:"arrow",on:{click:t.goBack}}),s("span",[t._v("有赞账号登录")])]),s("div",{staticClass:"divide-bar"}),s("div",{staticClass:"log-form"},[s("form",{attrs:{action:"",method:"post"}},[s("div",{staticClass:"log-account"},[s("span",[t._v("账号")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],attrs:{type:"text",placeholder:"请输入账号"},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}})]),s("div",{staticClass:"log-account"},[s("span",[t._v("密码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入密码"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}})]),s("label",{staticClass:"log-button",attrs:{for:"log-in"},on:{click:function(e){return e.preventDefault(),t.logIn(e)}}},[t._v("登录")]),s("button",{attrs:{id:"log-in",type:"submit"}},[t._v("登录")])])]),s("div",{staticClass:"sign-up",on:{click:t.signUp}},[t._v("注册账号")]),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isComplete,expression:"isComplete"}],staticClass:"message"},[s("div",{staticClass:"message-box"},[t._v(t._s(t.message))])])])],1)},i=[],a=s("JuFe"),n={data:function(){return{account:null,code:null,isComplete:!1,message:""}},methods:{logIn:function(){var t=this;if(!this.account)return this.message="账号名称不能为空",this.isComplete=!0,void setTimeout(function(){t.isComplete=!1},1500);if(!this.code)return this.message="密码不能为空",this.isComplete=!0,void setTimeout(function(){t.isComplete=!1},1500);var e=this;a["a"].User.logIn(this.account,this.code).then(function(t){e.$store.commit("confirmUser",t),e.$router.push({path:"/person"})},function(){e.message="用户名和密码不匹配",e.isComplete=!0,setTimeout(function(){e.isComplete=!1},1500)})},signUp:function(){this.$router.push({path:"/signUp"})},goBack:function(){this.$router.go(-1)}}},c=n,r=(s("+DOG"),s("KHd+")),u=Object(r["a"])(c,o,i,!1,null,"a86107a2",null);e["default"]=u.exports}}]);
//# sourceMappingURL=5.aa1dd810.js.map