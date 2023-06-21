import{r as ie}from"./jquery-da988d60.js";var O={},oe={get exports(){return O},set exports(g){O=g}};(function(g){(function(D){D(["jquery"],function(r){return function(){var i,C,H=0,p={error:"error",info:"info",success:"success",warning:"warning"},x={clear:A,remove:F,error:M,getContainer:d,info:q,options:{},subscribe:P,success:S,version:"2.1.4",warning:j},T;return x;function M(t,e,n){return v({type:p.error,iconClass:l().iconClasses.error,message:t,optionsOverride:n,title:e})}function d(t,e){return t||(t=l()),i=r("#"+t.containerId),i.length||e&&(i=J(t)),i}function q(t,e,n){return v({type:p.info,iconClass:l().iconClasses.info,message:t,optionsOverride:n,title:e})}function P(t){C=t}function S(t,e,n){return v({type:p.success,iconClass:l().iconClasses.success,message:t,optionsOverride:n,title:e})}function j(t,e,n){return v({type:p.warning,iconClass:l().iconClasses.warning,message:t,optionsOverride:n,title:e})}function A(t,e){var n=l();i||d(n),E(t,n,e)||z(n)}function F(t){var e=l();if(i||d(e),t&&r(":focus",t).length===0){w(t);return}i.children().length&&i.remove()}function z(t){for(var e=i.children(),n=e.length-1;n>=0;n--)E(r(e[n]),t)}function E(t,e,n){var c=n&&n.force?n.force:!1;return t&&(c||r(":focus",t).length===0)?(t[e.hideMethod]({duration:e.hideDuration,easing:e.hideEasing,complete:function(){w(t)}}),!0):!1}function J(t){return i=r("<div/>").attr("id",t.containerId).addClass(t.positionClass),i.appendTo(r(t.target)),i}function L(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function y(t){C&&C(t)}function v(t){var e=l(),n=t.iconClass||e.iconClass;if(typeof t.optionsOverride<"u"&&(e=r.extend(e,t.optionsOverride),n=t.optionsOverride.iconClass||n),_(e,t))return;H++,i=d(e,!0);var c=null,o=r("<div/>"),I=r("<div/>"),B=r("<div/>"),b=r("<div/>"),h=r(e.closeHtml),a={intervalId:null,hideEta:null,maxHideTime:null},u={toastId:H,state:"visible",startTime:new Date,options:e,map:t};return Q(),G(),V(),y(u),e.debug&&console&&console.log(u),o;function k(s){return s==null&&(s=""),s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Q(){K(),U(),W(),X(),Y(),Z(),N(),R()}function R(){var s="";switch(t.iconClass){case"toast-success":case"toast-info":s="polite";break;default:s="assertive"}o.attr("aria-live",s)}function V(){e.closeOnHover&&o.hover(ee,$),!e.onclick&&e.tapToDismiss&&o.click(f),e.closeButton&&h&&h.click(function(s){s.stopPropagation?s.stopPropagation():s.cancelBubble!==void 0&&s.cancelBubble!==!0&&(s.cancelBubble=!0),e.onCloseClick&&e.onCloseClick(s),f(!0)}),e.onclick&&o.click(function(s){e.onclick(s),f()})}function G(){o.hide(),o[e.showMethod]({duration:e.showDuration,easing:e.showEasing,complete:e.onShown}),e.timeOut>0&&(c=setTimeout(f,e.timeOut),a.maxHideTime=parseFloat(e.timeOut),a.hideEta=new Date().getTime()+a.maxHideTime,e.progressBar&&(a.intervalId=setInterval(te,10)))}function K(){t.iconClass&&o.addClass(e.toastClass).addClass(n)}function N(){e.newestOnTop?i.prepend(o):i.append(o)}function U(){if(t.title){var s=t.title;e.escapeHtml&&(s=k(t.title)),I.append(s).addClass(e.titleClass),o.append(I)}}function W(){if(t.message){var s=t.message;e.escapeHtml&&(s=k(t.message)),B.append(s).addClass(e.messageClass),o.append(B)}}function X(){e.closeButton&&(h.addClass(e.closeClass).attr("role","button"),o.prepend(h))}function Y(){e.progressBar&&(b.addClass(e.progressClass),o.prepend(b))}function Z(){e.rtl&&o.addClass("rtl")}function _(s,m){if(s.preventDuplicates){if(m.message===T)return!0;T=m.message}return!1}function f(s){var m=s&&e.closeMethod!==!1?e.closeMethod:e.hideMethod,se=s&&e.closeDuration!==!1?e.closeDuration:e.hideDuration,ne=s&&e.closeEasing!==!1?e.closeEasing:e.hideEasing;if(!(r(":focus",o).length&&!s))return clearTimeout(a.intervalId),o[m]({duration:se,easing:ne,complete:function(){w(o),clearTimeout(c),e.onHidden&&u.state!=="hidden"&&e.onHidden(),u.state="hidden",u.endTime=new Date,y(u)}})}function $(){(e.timeOut>0||e.extendedTimeOut>0)&&(c=setTimeout(f,e.extendedTimeOut),a.maxHideTime=parseFloat(e.extendedTimeOut),a.hideEta=new Date().getTime()+a.maxHideTime)}function ee(){clearTimeout(c),a.hideEta=0,o.stop(!0,!0)[e.showMethod]({duration:e.showDuration,easing:e.showEasing})}function te(){var s=(a.hideEta-new Date().getTime())/a.maxHideTime*100;b.width(s+"%")}}function l(){return r.extend({},L(),x.options)}function w(t){i||(i=d()),!t.is(":visible")&&(t.remove(),t=null,i.children().length===0&&(i.remove(),T=void 0))}}()})})(function(D,r){g.exports?g.exports=r(ie()):window.toastr=r(window.jQuery)})})(oe);const ae=O;export{ae as t};
