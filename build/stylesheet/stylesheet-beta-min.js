(function(){var I=document,B=I.createElement("p"),D=B.style,C=YAHOO.lang,H={},E=0,J=("cssFloat" in D)?"cssFloat":"styleFloat",F,A,K;A=("opacity" in D)?function(L){L.opacity="";}:function(L){L.filter="";};D.border="1px solid red";D.border="";K=D.borderLeft?function(L,N){var M;if(N!==J&&N.toLowerCase().indexOf("float")!=-1){N=J;}if(typeof L[N]==="string"){switch(N){case"opacity":case"filter":A(L);break;case"font":L.font=L.fontStyle=L.fontVariant=L.fontWeight=L.fontSize=L.lineHeight=L.fontFamily="";break;default:for(M in L){if(M.indexOf(N)===0){L[M]="";}}}}}:function(L,M){if(M!==J&&M.toLowerCase().indexOf("float")!=-1){M=J;}if(C.isString(L[M])){if(M==="opacity"){A(L);}else{L[M]="";}}};function G(S,N){var V,Q,U,T={},M,W,P,R,L,O;if(!(this instanceof arguments.callee)){return new arguments.callee(S,N);}V=I.getElementsByTagName("head")[0];if(!V){throw new Error("HEAD element not found to append STYLE node");}Q=S&&(S.nodeName?S:I.getElementById(S));if(S&&H[S]){return H[S];}else{if(Q&&Q.yuiSSID&&H[Q.yuiSSID]){return H[Q.yuiSSID];}}if(!Q||!/^(?:style|link)$/i.test(Q.nodeName)){Q=I.createElement("style");Q.type="text/css";}if(C.isString(S)){if(S.indexOf("{")!=-1){if(Q.styleSheet){Q.styleSheet.cssText=S;}else{Q.appendChild(I.createTextNode(S));}}else{if(!N){N=S;}}}if(Q.parentNode!==V){V.appendChild(Q);}U=Q.sheet||Q.styleSheet;M=U&&("cssRules" in U)?"cssRules":"rules";for(R=U[M].length-1;R>=0;--R){L=U[M][R];O=L.selectorText;if(T[O]){T[O].style.cssText+=";"+L.style.cssText;P(R);}else{T[O]=L;}}P=("deleteRule" in U)?function(X){U.deleteRule(X);}:function(X){U.removeRule(X);};W=("insertRule" in U)?function(Z,Y,X){U.insertRule(Z+" "+Y,X);}:function(Z,Y,X){U.addRule(Z,Y,X);};Q.yuiSSID="yui-stylesheet-"+(E++);G.register(Q.yuiSSID,this);if(N){G.register(N,this);}C.augmentObject(this,{getId:function(){return Q.yuiSSID;},node:Q,enable:function(){U.disabled=false;return this;},disable:function(){U.disabled=true;return this;},isEnabled:function(){return !U.disabled;},set:function(a,Z){var c=T[a],b=a.split(/\s*,\s*/),Y,X;if(b.length>1){for(Y=b.length-1;Y>=0;--Y){this.set(b[Y],Z);}return this;}if(!G.isValidSelector(a)){return this;}if(c){c.style.cssText=G.toCssText(Z,c.style.cssText);}else{X=U[M].length;W(a,"{"+G.toCssText(Z)+"}",X);T[a]=U[M][X];}return this;},unset:function(a,Z){var c=T[a],b=a.split(/\s*,\s*/),X=!Z,d,Y;if(b.length>1){for(Y=b.length-1;Y>=0;--Y){this.unset(b[Y],Z);}return this;}if(c){if(!X){if(!C.isArray(Z)){Z=[Z];}D.cssText=c.style.cssText;for(Y=Z.length-1;Y>=0;--Y){K(D,Z[Y]);}if(D.cssText){c.style.cssText=D.cssText;}else{X=true;}}if(X){d=U[M];for(Y=d.length-1;Y>=0;--Y){if(d[Y]===c){delete T[a];P(Y);break;}}}}return this;},getCssText:function(Y){var Z,X;if(C.isString(Y)){Z=T[Y.split(/\s*,\s*/)[0]];return Z?Z.style.cssText:null;}else{X=[];for(Y in T){if(T.hasOwnProperty(Y)){Z=T[Y];X.push(Z.selectorText+" {"+Z.style.cssText+"}");}}return X.join("\n");}}},true);}F=function(L,N){var M=L.styleFloat||L.cssFloat||L["float"],P;D.cssText=N||"";if(M&&!L[J]){L=C.merge(L);delete L.styleFloat;delete L.cssFloat;delete L["float"];L[J]=M;}for(P in L){if(L.hasOwnProperty(P)){try{D[P]=C.trim(L[P]);}catch(O){}}}return D.cssText;};C.augmentObject(G,{toCssText:(("opacity" in D)?F:function(L,M){if("opacity" in L){L=C.merge(L,{filter:"alpha(opacity="+(L.opacity*100)+")"});delete L.opacity;}return F(L,M);}),register:function(L,M){return !!(L&&M instanceof G&&!H[L]&&(H[L]=M));},isValidSelector:function(L){return !/[^\\][`~!@$%\^&()+=|{}\[\];'"?<]|^\s*[^a-z0-9*#.]|[\s.#][^a-z0-9]/i.test(L);}},true);YAHOO.util.StyleSheet=G;})();YAHOO.register("stylesheet",YAHOO.util.StyleSheet,{version:"@VERSION@",build:"@BUILD@"});