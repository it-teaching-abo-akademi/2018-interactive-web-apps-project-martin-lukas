(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{218:function(t,e,a){"use strict";a.r(e);var n=a(15),o=a(4),l=a(5),r=a(7),i=a(6),s=a(8),c=a(0),u=a.n(c),m=a(34),p=a.n(m),d=(a(46),a(23)),f=function(t){function e(){return Object(o.a)(this,e),Object(r.a)(this,Object(i.a)(e).apply(this,arguments))}return Object(s.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"scroll"},u.a.createElement("table",null,u.a.createElement(h,null),u.a.createElement(b,{data:this.props.data,removeStock:this.props.removeStock})))}}]),e}(c.Component),h=function(){return u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Symbol"),u.a.createElement("th",null,"Value"),u.a.createElement("th",null,"Quantity"),u.a.createElement("th",null,"Total value"),u.a.createElement("th",null,"Remove")))},b=function(t){for(var e=t.data.map(function(e,a){var n=(parseFloat(e.quantity)*e.value).toFixed(2);return u.a.createElement("tr",{key:a},u.a.createElement("td",null,e.symbol),u.a.createElement("td",null,e.value),u.a.createElement("td",null,e.quantity),u.a.createElement("td",null,n),u.a.createElement("td",null,u.a.createElement("button",{className:"del-row",onClick:function(){return t.removeStock(a)}})))}),a=t.data.length;a<50;a++)e.push(u.a.createElement("tr",{className:"empty-row",key:a},u.a.createElement("td",null),u.a.createElement("td",null),u.a.createElement("td",null),u.a.createElement("td",null),u.a.createElement("td",null)));return u.a.createElement("tbody",null,e)},v=f,E=a(35),y=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(r.a)(this,Object(i.a)(e).call(this,t))).handleChange=function(t){a.setState(Object(E.a)({},t.target.name,t.target.value))},a.submitForm=function(){""===a.state.symbol||""===a.state.quantity||isNaN(a.state.quantity)||(a.props.handleSubmit(a.state),a.setState(a.initialState))},a.initialState={symbol:"",value:parseFloat("0.00"),quantity:""},a.state=a.initialState,a}return Object(s.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return u.a.createElement("form",{className:"stock-form"},u.a.createElement("label",null,"Symbol:"),u.a.createElement("input",{type:"text",name:"symbol",className:"symbol-input-field",value:this.state.symbol,onChange:this.handleChange}),u.a.createElement("label",null,"Quantity:"),u.a.createElement("input",{type:"text",name:"quantity",className:"quantity-input-field",value:this.state.quantity,onChange:this.handleChange}),u.a.createElement("input",{type:"button",value:"Add",onClick:this.submitForm}))}}]),e}(c.Component),S=a(68),O=a(69),j=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(r.a)(this,Object(i.a)(e).call(this,t))).getRandomColor=function(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t},a.state={data:{labels:[],datasets:[]}},a}return Object(s.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){for(var t=this,e=this.props.data,a=[],o=[],l=0;l<e.length;l++)a.push(e[l].symbol),o.push(this.getRandomColor());for(var r=function(e){var l="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(a[e],"&outputsize=compact&apikey=").concat("R2XFYH8AEAQTGTHE"),r=new XMLHttpRequest;r.open("GET",l,!0),r.onload=function(l){if(4===r.readyState)if(200===r.status){var i=JSON.parse(r.responseText)["Time Series (Daily)"];if(console.log(i),"undefined"!==typeof i){for(var s=Object.keys(i),c={data:[],label:a[e],fill:!1,borderColor:o[e]},u=0;u<s.length;u++)c.data.push(parseFloat(i[s[u]]["4. close"]).toFixed(2));t.setState({data:{labels:s,datasets:[].concat(Object(n.a)(t.state.data.datasets),[c])}})}}else console.error(r.statusText)},r.send()},i=0;i<a.length;i++)r(i)}},{key:"render",value:function(){return u.a.createElement("div",{className:"chart"},u.a.createElement(O.a,{data:this.state.data,options:{maintainAspectRatio:!1,title:{display:!0,text:"Comparison of stock values",fontSize:20},elements:{point:{radius:0},line:{borderWidth:2}},animation:{duration:0},showLines:!0,fill:!1},legend:{display:!0,position:"left"}}))}}]),e}(c.Component),k=function(t){function e(){return Object(o.a)(this,e),Object(r.a)(this,Object(i.a)(e).apply(this,arguments))}return Object(s.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return u.a.createElement(S.a,{trigger:u.a.createElement("button",{className:"button"},"Show graph"),modal:!0,closeOnDocumentClick:!0},u.a.createElement(j,{data:this.props.data}))}}]),e}(c.Component),g="R2XFYH8AEAQTGTHE",C=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(r.a)(this,Object(i.a)(e).call(this,t))).removeStock=function(t){a.setState({data:a.state.data.filter(function(e,a){return a!==t})})},a.handleSubmit=function(t){var e=Object(d.a)(Object(d.a)(a)),o="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".concat(t.symbol,"&outputsize=compact&apikey=").concat(g),l=new XMLHttpRequest;l.open("GET",o,!0),l.onload=function(a){if(4===l.readyState)if(200===l.status){var o=JSON.parse(l.responseText)["Time Series (Daily)"];if("undefined"!==typeof o){var r=Object.keys(o);t.value=parseFloat(o[r[0]]["4. close"]).toFixed(2),t.symbol=t.symbol.toUpperCase();var i=e.state.data,s=!1;i.forEach(function(e){e.symbol===t.symbol&&(s=!0,e.value=t.value,e.quantity=t.quantity)}),s||(i=[].concat(Object(n.a)(e.state.data),[t])),i.length<=50&&e.setState({data:i}),e.props.updateStockCookie(e.props.name,i)}}else console.error(l.statusText)},l.send()},a.totalStockValue=function(){for(var t=0,e=a.state.data,n=0;n<e.length;n++)t+=parseFloat(e[n].value)*parseInt(e[n].quantity);return t.toFixed(2)},a.state={data:t.data,submitted:!1},a}return Object(s.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var t=this;return u.a.createElement("div",{className:"portfolio-element"},u.a.createElement("div",{className:"portfolio-header"},u.a.createElement("p",{className:"portfolio-name"},this.props.name),u.a.createElement("button",{className:"del-portfolio",onClick:function(){return t.props.removePortfolio(t.props.name)}})),u.a.createElement(v,{data:this.state.data,removeStock:this.removeStock}),u.a.createElement("p",{className:"total-sum"},"Total value of ",u.a.createElement("b",null,this.props.name),": ",this.totalStockValue()),u.a.createElement(y,{handleSubmit:this.handleSubmit}),u.a.createElement(k,{data:this.state.data}))}}]),e}(c.Component),N=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(r.a)(this,Object(i.a)(e).call(this,t))).handleChange=function(t){a.setState(Object(E.a)({},t.target.name,t.target.value))},a.submitForm=function(){""!==a.state.name&&(a.props.handleSubmit(a.state),a.setState(a.initialState))},a.initialState={name:"",data:[]},a.state=a.initialState,a}return Object(s.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return u.a.createElement("form",{onSubmit:function(t){t.preventDefault()}},u.a.createElement("label",null,"Name:"),u.a.createElement("input",{type:"text",name:"name",className:"name-input-field",value:this.state.name,onChange:this.handleChange}),u.a.createElement("input",{type:"button",value:"Add portfolio",onClick:this.submitForm}))}}]),e}(c.Component);function w(t,e,a){var n,o=new Date;o.setTime(o.getTime()+31536e4),n="; expires="+o.toUTCString(),document.cookie=t+"="+(e||"")+n+"; path=/"}var T=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(r.a)(this,Object(i.a)(e).call(this,t))).removePortfolio=function(t){a.setState({portfolios:a.state.portfolios.filter(function(e){return e.name!==t})})},a.handleSubmit=function(t){if(a.state.portfolios.length<10){var e=!1;if(a.state.portfolios.forEach(function(a){a.name===t.name&&(e=!0)}),!e){var o=[].concat(Object(n.a)(a.state.portfolios),[t]);a.setState({portfolios:o})}}},a.updateStockCookie=function(t,e){for(var n=a.state.portfolios,o=0;o<n.length;o++)n[o].name===t&&(n[o].data=e);w("portfolios",JSON.stringify(n))},a.state={portfolios:t.data},a}return Object(s.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){w("portfolios",JSON.stringify(this.state.portfolios))}},{key:"render",value:function(){var t=this,e=this.state.portfolios.map(function(e){return u.a.createElement(C,{name:e.name,data:e.data,key:e.name,removePortfolio:t.removePortfolio,updateStockCookie:t.updateStockCookie})});return u.a.createElement("div",{className:"global"},u.a.createElement(N,{handleSubmit:this.handleSubmit}),u.a.createElement("div",{className:"portfolios-container"},e))}}]),e}(c.Component),F=function(t){for(var e=t+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var o=a[n];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(e))return o.substring(e.length,o.length)}return null}("portfolios");F=null==F?[]:JSON.parse(F),p.a.render(u.a.createElement(T,{data:F}),document.getElementById("root"))},46:function(t,e,a){},71:function(t,e,a){t.exports=a(218)}},[[71,2,1]]]);
//# sourceMappingURL=main.51358b49.chunk.js.map