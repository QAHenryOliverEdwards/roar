(this["webpackJsonproar-dev-branch"]=this["webpackJsonproar-dev-branch"]||[]).push([[0],{17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(12),s=n.n(r),a=n(7),o=(n(17),n(18),n(19),n(8)),u=n.n(o),i=n(10),l=n(0),j=function(e){var t=e.style;return Object(l.jsx)("h1",{className:"title",style:t,children:"Welcome to Roar"})},f=n(23),d=n(25),b=function(e){var t=e.userInputFunc,n=e.searchFunc;return Object(l.jsxs)(f.a,{className:"my-3",children:[Object(l.jsx)("input",{type:"search",onChange:function(e){return t(e)},className:"form-control"}),Object(l.jsx)(d.a,{variant:"secondary",onClick:function(){return n()},children:"Search"})]})},h=function(e){var t=[];return e.forEach((function(e){e.posts.forEach((function(n){var c={postID:n.id,name:e.name,body:n.body,childrenID:[]};!function e(t,n,r){if(!Array.isArray(n)||0===n.length)return c;n.forEach((function(n){return c.childrenID.push({pID:t.id,cID:n.id,level:r}),r+=1,e(n,n.children,r)}))}(n,n.children,1),t.push(c)}))})),t},p=n(24),O=function(e){var t=e.post;return Object(l.jsx)("div",{children:Object(l.jsxs)(p.a,{className:"dark-green-bg",children:[Object(l.jsx)(p.a.Title,{className:"post-name",children:t.name}),Object(l.jsx)(p.a.Text,{className:"post-text",children:t.body})]})})},x=function(e){var t=e.post;return Object(l.jsx)("div",{children:Object(l.jsxs)(p.a,{className:"light-green-bg",children:[Object(l.jsx)(p.a.Title,{className:"post-name",children:t.name}),Object(l.jsx)(p.a.Text,{className:"post-text",children:t.body}),Object(l.jsxs)(p.a.Text,{className:"post-text",children:["At reply level ",t.level]})]})})},m=function(e){var t=e.postDictionary,n=[];return Object(l.jsx)("div",{children:function(){var e=function(e){for(var n in t)if(t[n].postID===e)return{postID:t[n].postID,name:t[n].name,body:t[n].body}},c=0;t.forEach((function(e){var t=0,n=e.postID;n>t&&(c=n),t=n}));var r=function(c,r){var s,a=[];c.forEach((function(t){if(t.pID===r){var c=e(t.cID);c.level=t.level,n.push(Object(l.jsx)(x,{post:c},t.cID)),a.push(t.cID)}})),s=a,t.forEach((function(e,t,n){s.includes(e.postID)&&n.splice(t,1)}))};return t.forEach((function(t,s,a){var o=e(t.postID);n.push(Object(l.jsx)(O,{post:o},t.postID));for(var u=t.postID;u<=c;)r(t.childrenID,u),u+=1;a.splice(s,1)})),n}()})},v=function(e){var t=e.setLogoutFunc;e.style;return Object(l.jsx)(d.a,{variant:"secondary",onClick:function(){return t(!1),sessionStorage.setItem("auth-roar","")},className:"rounded-pill",children:"Logout"})},g=function(e){var t=e.setLogoutFunc,n=Object(c.useState)([]),r=Object(a.a)(n,2),s=r[0],o=r[1],f=Object(c.useState)([]),d=Object(a.a)(f,2),p=d[0],O=d[1],x=Object(c.useState)(""),g=Object(a.a)(x,2),y=g[0],I=g[1],N=Object(c.useCallback)(Object(i.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.length){e.next=8;break}return e.next=3,fetch("http://127.0.0.1:8082/users/read");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,o(n);case 8:case"end":return e.stop()}}),e)}))),[s.length]),D=Object(c.useCallback)((function(){var e=h(s);e.length?O(e):O([])}),[s]),F=Object(c.useCallback)(Object(i.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:return e.next=4,D();case 4:case"end":return e.stop()}}),e)}))),[D,N]);return Object(c.useEffect)((function(){F()}),[F,y]),Object(l.jsxs)("div",{className:"container-fluid mt-3 col-lg-6 col-sm-12",children:[Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)(j,{}),Object(l.jsx)(v,{setLogoutFunc:t})]}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)(b,{userInputFunc:function(e){I(e.target.value)},searchFunc:function(){console.log("feature coming soon")}}),Object(l.jsx)(m,{postDictionary:p})]})]})},y=function(e){var t=e.inputFunc;return Object(l.jsx)("input",{type:"text",onChange:function(e){return t(e)},className:"form-control rounded-pill my-1",placeholder:"Username"})},I=function(e){var t=e.inputFunc;return Object(l.jsx)("input",{type:"password",onChange:function(e){return t(e)},className:"form-control rounded-pill my-1",placeholder:"Password"})},N=function(){return Object(l.jsx)("h3",{className:"title text-center",children:"Login"})},D=function(e){var t=e.redirectFunc;return Object(l.jsx)(d.a,{variant:"secondary",onClick:function(){return t()},className:"rounded-pill form-control my-1",children:"Register"})},F=function(e){var t=e.loginFunc;return Object(l.jsx)(d.a,{variant:"secondary",onClick:function(){return t()},className:"rounded-pill form-control",children:"Login"})},k=function(e){var t=e.setLoginFunc,n=Object(c.useState)(""),r=Object(a.a)(n,2),s=r[0],o=r[1],j=Object(c.useState)(""),f=Object(a.a)(j,2),d=f[0],b=f[1],h=function(){var e=Object(i.a)(u.a.mark((function e(){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://127.0.0.1:8082/users/login",{method:"POST",headers:{username:s,password:d}});case 2:return n=e.sent,e.next=5,n.text();case 5:"INVALID"!==(c=e.sent)?(sessionStorage.setItem("auth-roar",c),console.log("Successfully logged in"),t(!0)):console.log("Unsuccessful attempt");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"container-fluid mt-3 col-lg-6 col-sm-12",children:[Object(l.jsx)(N,{}),Object(l.jsx)(y,{inputFunc:function(e){o(e.target.value)}}),Object(l.jsx)(I,{inputFunc:function(e){b(e.target.value)}}),Object(l.jsx)(F,{loginFunc:h}),Object(l.jsx)("div",{className:"separator post-text",children:"Or"}),Object(l.jsx)(D,{redirectFunc:function(){console.log("redirecting soon")}})]})},w=function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)([]),o=Object(a.a)(s,2),u=o[0],i=o[1],j=Object(c.useCallback)((function(){var e=sessionStorage.getItem("auth-roar");r(!(!e||"INVALID"===e))}),[]),f=Object(c.useCallback)((function(){i(n?[Object(l.jsx)(g,{setLogoutFunc:r})]:[Object(l.jsx)(k,{setLoginFunc:r})])}),[n]);return Object(c.useEffect)((function(){j(),f()}),[j,f]),Object(l.jsx)("div",{children:u})};s.a.render(Object(l.jsx)(w,{}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.283baf1b.chunk.js.map