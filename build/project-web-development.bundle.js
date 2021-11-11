!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.r(t);var o=n(2),r=n.n(o),i=n(0),a=n.n(i),s=n(3),u=n.n(s),c=n(4),l=n.n(c),h=n(5),p=n.n(h),g=n(1),y=n.n(g),d=a.a.Router();d.get("/",(function(e,t,n){t.render("trang-chu",{title:"Express",layout:"layouts/main"})})),d.get("/chinh-sach-bao-mat",(function(e,t,n){t.render("chinh-sach-bao-mat",{title:"Express",layout:"layouts/main"})})),d.get("/chinh-sach-doi-tra-hoan-tien",(function(e,t,n){t.render("chinh-sach-doi-tra-hoan-tien",{title:"Express",layout:"layouts/main"})})),d.get("/chinh-sach-khach-si",(function(e,t,n){t.render("chinh-sach-khach-si",{title:"Express",layout:"layouts/main"})})),d.get("/dieu-khoan-dich-vu",(function(e,t,n){t.render("dieu-khoan-dich-vu",{title:"Express",layout:"layouts/main"})})),d.get("/gioi-thieu",(function(e,t,n){t.render("gioi-thieu",{title:"Express",layout:"layouts/main"})})),d.get("/lien-he",(function(e,t,n){t.render("lien-he",{title:"Express",layout:"layouts/main"})})),d.get("/phuong-thuc-van-chuyen",(function(e,t,n){t.render("phuong-thuc-van-chuyen",{title:"Express",layout:"layouts/main"})})),d.get("/thoi-gian-lam-viec",(function(e,t,n){t.render("thoi-gian-lam-viec",{title:"Express",layout:"layouts/main"})})),d.get("/category/tat-ca-san-pham",(function(e,t,n){t.render("category/tat-ca-san-pham",{layout:"layouts/main"})})),d.get("/category/may-nghe-nhac",(function(e,t,n){t.render("category/may-nghe-nhac",{layout:"layouts/main"})})),d.get("/category/loa",(function(e,t,n){t.render("category/loa",{layout:"layouts/main"})})),d.get("/category/microphone",(function(e,t,n){t.render("category/microphone",{layout:"layouts/main"})})),d.get("/category/tai-nghe",(function(e,t,n){t.render("category/tai-nghe",{layout:"layouts/main"})}));var f=d;n(6);r.a.config();var m=process.env.PORT||5e3;new class{constructor(e){this.port=e,this.app=a()(),this.server=u.a.createServer(this.app),this.useStatic(),this.useViewEngine(),this.useDatabase(),this.useMiddlewares(),this.useRoutes(),this.run()}useRoutes(){this.app.use("/",f)}useViewEngine(){this.app.set("views","./src/views"),this.app.set("view engine","hbs")}useStatic(){this.app.use(a.a.static("./public"))}useDatabase(){y.a.connect("mongodb+srv://nguyenkhavi:".concat(process.env.MONGODB_PASSWORD,"@cluster0.vo4ad.mongodb.net/").concat(process.env.MONGODB_NAME),{useNewUrlParser:!0,useUnifiedTopology:!0}),y.a.connection.on("error",e=>console.log(e)),y.a.connection.once("open",()=>console.log("> MongoDB Running...")).on("error",e=>{throw e})}useMiddlewares(){this.app.use(p()()),this.app.use(l()("dev")),this.app.use(a.a.json({limit:"1024mb",extended:!0})),this.app.use(a.a.urlencoded({limit:"1024mb",extended:!0,parameterLimit:5e4}))}run(){this.server.listen(this.port,()=>{console.log("> Server is running on ".concat(this.port,"..."))})}}(m)}]);