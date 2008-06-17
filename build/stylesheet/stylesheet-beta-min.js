(function(){YAHOO.util.StyleSheet=function(D){var I,H,G={},B,J,E;I=document.getElementsByTagName("head")[0];if(!I){YAHOO.log("HEAD element not found to append STYLE node","error","YAHOO.util.StyleSheet");throw new Error("HEAD element not found to append STYLE node");}D=D&&YAHOO.util.Dom.get(D);if(!D||D.parentNode!==I&&(!D.sheet&&!D.styleSheet)){D=document.createElement("style");D.type="text/css";I.appendChild(D);}H=D.sheet||D.styleSheet;B=("cssRules" in H)?"cssRules":"rules";E=("deleteRule" in H)?function(K){H.deleteRule(K);}:function(K){H.removeRule(K);};J=("insertRule" in H)?function(M,L,K){H.insertRule(M+" "+L,K);}:function(M,L,K){H.addRule(M,L,K);};var F,A,C;for(F=H[B].length-1;F>=0;--F){A=H[B][F];C=A.selectorText;if(G[C]){G[C].style.cssText+=";"+A.style.cssText;E(F);}else{G[C]=A;}}YAHOO.lang.augmentObject(this,{enable:function(){H.disabled=false;},disable:function(){H.disabled=true;},isEnabled:function(){return !H.disabled;},setOpacity:(("opacity" in D.style)?function(K,L){this.setCSS(K,"opacity:"+L);}:function(K,L){this.setCSS(K,"filter: alpha(opacity="+(L*100)+")");}),unsetOpacity:(("opacity" in D.style)?function(K){this.unsetCSS(K,"opacity");}:function(K){this.unsetCSS(K,"filter");}),setCSS:function(M,L){var N=G[M];if(N){N.style.cssText+=";"+L;}else{var K=H[B].length;J(M,"{"+L+"}",K);G[M]=H[B][K];}},unsetCSS:function(N,M){var O=G[N],P,L,K;if(O){if(!M){P=H[B];for(L=P.length-1;L>=0;--L){if(P[L]===O){delete G[N];E(L);break;}}return ;}if(!YAHOO.lang.isArray(M)){M=[M];}K=O.style.cssText;for(L=M.length-1;L>=0;--L){K=K.replace(YAHOO.util.StyleSheet._propertyRE(M[L]),"");}O.style.cssText=K;}}},true);};YAHOO.util.StyleSheet.PROP_REGEX={"border":/border(?:-(?:(?:top|right|bottom|left)(?:-(?:color|style|width))?|(?:color|style|width)))?\s*:[^;]*(?:;|$)/gi,"font":/(?:font(?:-(?:size|family|style|variant|weight))?|line-height)\s*:[^;]*(?:;|$)/gi};YAHOO.util.StyleSheet._propertyRE=function(A){return this.PROP_REGEX[A]||(this.PROP_REGEX[A]=new RegExp(A+"(?:-[a-z\\-]+)?\\s*:[^;]*(?:;|$)","gi"));};})();YAHOO.register("stylesheet",YAHOO.util.Stylesheet,{version:"@VERSION@",build:"@BUILD@"});