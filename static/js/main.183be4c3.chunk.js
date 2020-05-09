(this.webpackJsonpchatboat=this.webpackJsonpchatboat||[]).push([[0],{13:function(e,t,a){e.exports=a(20)},18:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(12),s=a.n(r),l=(a(18),a(1)),i=a(5),c=a(6),u=a(8),h=a(10),m=(a(19),a(7)),d=a(2),p=a(9),b=function(e){var t=e.questions,a=e.currentQuestion,r=e.handleSubmit,s=e.handleOnChange,l=e.handleAddEditChatOption,i=e.clearForm,c=e.deleteOption,u=Object(n.useState)(-1),h=Object(p.a)(u,2),m=h[0],d=h[1],b=function(e,t){e.stopPropagation(),m===t?(d(-1),c(t)):d(t)};return o.a.createElement("form",{onSubmit:function(e){return r(e,!1)}},o.a.createElement("h3",null,"Enter your chat details"),o.a.createElement("div",{className:"input-group"},o.a.createElement("div",{className:"input-group-prepend"},o.a.createElement("label",{className:"input-group-text"},"Chat ID#")),o.a.createElement("input",{type:"text",className:"form-control",value:a.chat_id,onChange:function(e){return s(e,!1)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatLabel"},"Chat Label"),o.a.createElement("textarea",{type:"text",className:"form-control",id:"chatLabel",name:"chat_label",value:a.chat_label,rows:"3",onChange:function(e){return s(e,!1)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatDesc"},"Chat Description"),o.a.createElement("textarea",{type:"text",className:"form-control",id:"chatDesc",name:"chat_desc",rows:"4",value:a.chat_desc,onChange:function(e){return s(e,!1)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatType"},"Chat Type"),o.a.createElement("select",{className:"form-control",id:"chatType",name:"type",value:a.type,onChange:function(e){return s(e,!1)}},o.a.createElement("option",{value:""},"Select Type"),o.a.createElement("option",{value:"q"},"Question"),o.a.createElement("option",{value:"ol"},"Options List"),o.a.createElement("option",{value:"a"},"Answer"),o.a.createElement("option",{value:"c"},"Contact us"),o.a.createElement("option",{value:"i"},"Info Message"))),o.a.createElement("div",{className:"form-group mb3"},o.a.createElement("label",{htmlFor:"replayId"},"Chat Options"),o.a.createElement("button",{type:"button",className:"btn btn-outline-info mb-1 w-100",onClick:function(){return l(a)}},"+ Add Chat Options"),a.chat_options.map((function(e,t){return o.a.createElement("button",{type:"button",className:"btn btn-outline-dark mb-1 w-100",key:"ol_ques_"+t,onClick:function(){return l(e)}},e.chat_label&&o.a.createElement("p",{className:"m-0"},e.chat_label),e.chat_desc&&o.a.createElement("p",{className:"m-0"},o.a.createElement("small",null,e.chat_desc)),o.a.createElement("span",{className:"btn ".concat(m===e.chat_id?"btn-danger":"btn-outline-danger"," btn-sm"),onClick:function(t){return b(t,e.chat_id)}},m===e.chat_id?"Confirm Delete":"Delete"),m===e.chat_id&&o.a.createElement("span",{className:"btn btn-link btn-sm text-warning",onClick:function(e){return b(e,-1)}},"Cancel"))}))),"ol"!==a.type?o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"replayId"},"Chat Replay"),o.a.createElement("select",{className:"form-control",id:"replayId",name:"reply_id",onChange:function(e){return s(e,!1)},value:a.reply_id},o.a.createElement("option",{value:null,disabled:!0},"Select Chat Replay"),o.a.createElement("option",{value:""},"No Reply"),t.map((function(e,t){return o.a.createElement("option",{key:"opt_"+t,value:e.chat_id,disabled:e.reply_id===a.chat_id},"#"+e.chat_id," : ",e.chat_label||e.chat_desc)})))):null,o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"),o.a.createElement("button",{type:"button",className:"ml-3 btn btn-outline-primary",onClick:i},"Clear Form"))},f=function(e){var t=e.questions,a=e.chatOptionsQuestion,n=e.handleSubmit,r=e.handleOnChange,s=e.currentQuestion,l=e.handleBack;return o.a.createElement("form",{onSubmit:function(e){return n(e,!0)}},o.a.createElement("div",{className:"action-bar d-flex align-items-center mb-3"},o.a.createElement("button",{type:"button",className:"btn btn-outline-dark",onClick:l},"Back"),o.a.createElement("h5",{className:"m-0 ml-2"},"Adding Chat options for Chat ID# ",s.chat_id)),o.a.createElement("div",{className:"input-group"},o.a.createElement("div",{className:"input-group-prepend"},o.a.createElement("label",{className:"input-group-text"},"Chat ID#")),o.a.createElement("input",{type:"text",className:"form-control",value:a.chat_id,onChange:function(e){return r(e,!0)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatLabel"},"Chat Label"),o.a.createElement("textarea",{type:"text",className:"form-control",id:"chatLabel",name:"chat_label",value:a.chat_label,rows:"3",onChange:function(e){return r(e,!0)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatDesc"},"Chat Description"),o.a.createElement("textarea",{type:"text",className:"form-control",id:"chatDesc",name:"chat_desc",rows:"4",value:a.chat_desc,onChange:function(e){return r(e,!0)}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"chatType"},"Chat Type"),o.a.createElement("select",{className:"form-control",id:"chatType",name:"type",value:a.type,onChange:function(e){return r(e,!0)}},o.a.createElement("option",{value:""},"Select Type"),o.a.createElement("option",{value:"q"},"Question"),o.a.createElement("option",{value:"a"},"Answer"),o.a.createElement("option",{value:"c"},"Contact us"),o.a.createElement("option",{value:"i"},"Info Message"))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"replayId"},"Chat Replay"),o.a.createElement("select",{className:"form-control",id:"replayId",name:"reply_id",onChange:function(e){return r(e,!0)},value:a.reply_id},o.a.createElement("option",{value:null,disabled:!0},"Select Chat Replay"),o.a.createElement("option",{value:""},"No Reply"),t.map((function(e,t){return o.a.createElement("option",{key:"opt_"+t,value:e.chat_id,disabled:e.reply_id===s.chat_id},"#"+e.chat_id," : ",e.chat_label||e.chat_desc)})))),o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"))},v=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(i.a)(this,a),n=t.call(this,e);var o=e.questions,r=e.editQuestion,s={chat_id:o&&o.length||0,chat_label:"",chat_desc:"",chat_options:[],type:"",reply_id:""},l=!1;r&&(s.chat_id=r.chat_id,s.chat_label=r.chat_label,s.chat_desc=r.chat_desc,s.chat_options=r.chat_options,s.type=r.type,s.reply_id=r.reply_id,l=!0);var c=Object(d.a)({},s);return n.state={questions:o||[],currentQuestion:s,chatOptionsQuestion:c,ifEditing:l,errors:{}},n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.editQuestion,a=e.questions,n=this.state,o=n.currentQuestion,r=n.questions;t&&o.chat_id!==t.chat_id&&(o.chat_id=t.chat_id,o.chat_label=t.chat_label,o.chat_desc=t.chat_desc,o.chat_options=t.chat_options,o.type=t.type,o.reply_id=t.reply_id||"",this.setState({currentQuestion:o,ifEditing:!0}),this.handleBack()),r.length!==a.length&&(o.chat_id=a.length,this.setState({questions:a,currentQuestion:o}))}},{key:"handleOnChange",value:function(e,t){var a=this.state[t?"chatOptionsQuestion":"currentQuestion"];a[e.target.name]=e.target.value,this.setState(Object(m.a)({},t?"chatOptionsQuestion":"currentQuestion",a))}},{key:"handleSubmit",value:function(e,t){var a=this;e.preventDefault(),console.log("handlesubmit");var n=this.state,o=n.chatOptionsQuestion,r=n.currentQuestion;if(t){var s=Object(d.a)({},o);s.reply_id=parseInt(s.reply_id);var i=Object(d.a)({},r);console.log(s.chat_options.length),i.chat_options=[].concat(Object(l.a)(i.chat_options),[s]),i.type="ol",i.reply_id="",console.log(s.chat_options.length),this.setState({currentQuestion:i},(function(){return a.handleBack()}))}else r.chat_label||r.chat_desc?(this.props.saveQuestions(r),this.clearForm(r)):this.showError("Please add chat label or description")}},{key:"showError",value:function(e){var t=this;this.setState({errors:{0:e}},(function(){setTimeout((function(){t.setState({errors:{}})}),5e3)}))}},{key:"clearForm",value:function(){console.log("clearform"),this.props.saveQuestions(null),this.setState({ifEditing:!1,currentQuestion:{chat_id:this.state.questions.length,chat_label:"",chat_desc:"",chat_options:[],type:"",reply_id:""}})}},{key:"handleAddEditChatOption",value:function(e){if(e){var t=this.state.currentQuestion.chat_options.filter((function(t){return t.chat_id===e.chat_id}));if(t.length)this.setState({chatOptionsQuestion:t[0],ifEditing:!0});else{var a=100*e.chat_id+e.chat_options.length,n=this.state.chatOptionsQuestion;n.chat_id=a,this.setState({chatOptionsQuestion:n,ifEditing:!0})}}}},{key:"handleBack",value:function(){var e=Object(d.a)({},this.state.chatOptionsQuestion);e.chat_desc="",e.chat_id=0,e.chat_label="",e.chat_options=[],e.reply_id="",e.type="",this.setState({chatOptionsQuestion:e,ifEditing:!1})}},{key:"deleteOption",value:function(e){var t=Object(d.a)({},this.state.currentQuestion),a=t.chat_options.filter((function(t){return t.chat_id!==e}));t.chat_options=a,this.setState({currentQuestion:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.questions,n=t.currentQuestion,r=t.chatOptionsQuestion,s=t.ifEditing,l=t.errors;return o.a.createElement("div",{className:"sidebar col-12 col-md-6 col-sm-6"},r.chat_id&&s?o.a.createElement(f,{questions:a,currentQuestion:n,chatOptionsQuestion:r,handleOnChange:function(t,a){return e.handleOnChange(t,a)},handleBack:this.handleBack.bind(this),handleSubmit:function(t,a){return e.handleSubmit(t,a)}}):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"form-group"},o.a.createElement("h3",{htmlFor:"jsonField"},"If you already have json paste here"),o.a.createElement("textarea",{className:"form-control",rows:"4",id:"jsonField",value:this.props.jsonValue,placeholder:"Paste your json here...",onChange:this.props.handleJSONchange})),o.a.createElement(b,{clearForm:this.clearForm.bind(this),handleAddEditChatOption:function(t){return e.handleAddEditChatOption(t)},deleteOption:this.deleteOption.bind(this),questions:a,currentQuestion:n,handleOnChange:function(t,a){return e.handleOnChange(t,a)},handleSubmit:function(t,a){return e.handleSubmit(t,a)}})),Object.keys(l).length?o.a.createElement("div",{className:"my-3"},o.a.createElement("h5",null,"Errors:"),Object.keys(l).map((function(e){return o.a.createElement("div",{className:"alert alert-danger fade-scale-up",role:"alert",key:"err_"+e},l[e])}))):null)}}]),a}(o.a.Component),y=function(e){var t=e.questions,a=e.setEditQuestion,r=e.downloadJSON,s=e.searchText,l=e.handleSearch,i=e.deleteQuestion,c=Object(n.useState)(-1),u=Object(p.a)(c,2),h=u[0],m=u[1],d=[];if(s){var b=s.toLowerCase();d=t.filter((function(e){return e.chat_id.toString().toLowerCase().includes(b)||e.chat_label.toLowerCase().includes(b)||e.chat_desc.toLowerCase().includes(b)||e.reply_id&&e.reply_id.toString().toLowerCase().includes(b)}))}else d=t;var f=function(e,t){e.stopPropagation(),h===t?(m(-1),i(t)):m(t)};return o.a.createElement("div",{className:"questions col-12 col-md-6 col-sm-6"},o.a.createElement("div",{className:"action-bar d-flex align-items-center justify-content-between"},o.a.createElement("h5",{className:"m-0 ml-2"},"Chat boat Questions"),o.a.createElement("button",{className:"btn btn-primary",onClick:r},"Download JSON"),o.a.createElement("div",{className:"input-group px-0 mt-3",style:{flexBasis:"100%"}},o.a.createElement("input",{type:"text",className:"form-control",value:s,onChange:function(e){return l(e.target.value)}}),o.a.createElement("div",{className:"input-group-append"},o.a.createElement("button",{className:"btn btn-secondary",onClick:function(){return l("")}},"Clear")))),d&&d.length?d.map((function(e,t){return o.a.createElement("div",{className:"card mb-2",key:"ques_"+t,onClick:function(){return a(e)}},o.a.createElement("div",{className:"card-body"},o.a.createElement("h6",{className:"card-text d-flex align-items-center justify-content-between"},o.a.createElement("span",null,"Chat ID# ",o.a.createElement("strong",null,e.chat_id)),e.reply_id&&o.a.createElement("span",null,"Reply Id# ",e.reply_id)),o.a.createElement("h5",{className:"card-title"},e.chat_label),o.a.createElement("p",{className:"card-text"},e.chat_desc),o.a.createElement("button",{className:"btn ".concat(h===e.chat_id?"btn-danger":"btn-outline-danger"," btn-sm"),onClick:function(t){return f(t,e.chat_id)}},h===e.chat_id?"Confirm Delete":"Delete"),h===e.chat_id&&o.a.createElement("button",{className:"btn btn-outline-light' btn-sm",onClick:function(e){return f(e,-1)}},"Cancel")))})):o.a.createElement("div",{className:"alert alert-info fade-scale-up",role:"alert"},"No questions added yet"))},E=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={questions:[],editQuestion:null,jsonValue:"",errorMsg:[],searchText:""},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("questions"),t=localStorage.getItem("jsonValue"),a=null;if(e)try{a=JSON.parse(e)}catch(n){console.log(n)}a&&t?this.setState({questions:a,jsonValue:t}):a?this.setState({questions:a}):t&&this.setState({jsonValue:t})}},{key:"setEditQuestion",value:function(e){e&&this.setState({editQuestion:e})}},{key:"handleSaveQuestion",value:function(e){if(e){var t=this.state.questions,a=[];a=t.filter((function(t){return t.chat_id===e.chat_id})).length?t.map((function(t){return t.chat_id===e.chat_id?e:t})):[].concat(Object(l.a)(t),[e]),this.saveQuestions(a)}else this.setState({editQuestion:null})}},{key:"saveQuestions",value:function(e){this.setState({questions:e,editQuestion:null}),localStorage.setItem("questions",JSON.stringify(e)),this.showError("Questions updated successfully")}},{key:"removeErr",value:function(e,t){var a=this.state.errorMsg.filter((function(e){return e.timestamp!==t}));this.setState({errorMsg:Object(l.a)(a)}),clearTimeout(e)}},{key:"showError",value:function(e,t){var a=this,n=this.state.errorMsg,o=Date.now(),r={msg:e,timer:function(){var e=setTimeout((function(){a.removeErr(e,o)}),t||5e3);return e},timestamp:o};this.setState({errorMsg:[].concat(Object(l.a)(n),[r])},(function(){var e=r.timer();console.log("tmr",e)}))}},{key:"downloadJSON",value:function(){!function(e,t){var a=document.createElement("a");a.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),a.setAttribute("download",e),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)}("questions.json",JSON.stringify(this.state.questions)),localStorage.setItem("questions",JSON.stringify(this.state.questions))}},{key:"handleJSONchange",value:function(e){var t=this,a=e.target.value;try{var n=JSON.parse(a);if(n&&n.length){var o=n.filter((function(e){return!!(e.hasOwnProperty("chat_id")&&e.hasOwnProperty("chat_label")&&e.hasOwnProperty("chat_options")&&e.hasOwnProperty("type")&&e.hasOwnProperty("reply_id")&&e.hasOwnProperty("chat_desc"))||(t.showError("Following field has missing keys\n"+JSON.stringify(e),2e4),!1)}));console.log(o),localStorage.setItem("jsonValue",a),localStorage.setItem("questions",JSON.stringify(n)),this.setState({jsonValue:a,questions:n})}}catch(r){console.log(r),this.setState({jsonValue:a}),""!==a&&this.showError("Invalid json format")}}},{key:"handleSearch",value:function(e){this.setState({searchText:e})}},{key:"deleteQuestion",value:function(e){var t=this.state.questions.filter((function(t){return t.chat_id!==e}));this.saveQuestions(t)}},{key:"render",value:function(){var e=this,t=this.state,a=t.questions,n=t.editQuestion,r=t.jsonValue,s=t.errorMsg,l=t.searchText;return o.a.createElement("div",{className:"App container-fluid"},s.length>0&&o.a.createElement("div",{className:"toast-wrapper"},s.map((function(t){return o.a.createElement("div",{className:"alert alert-dark my-2 p-3 toast border-0",role:"alert",key:t.msg},t.msg,t.timestamp,o.a.createElement("br",null),o.a.createElement("button",{className:"btn btn-outline-light my-2",onClick:function(){return e.removeErr(t.timer(),t.timestamp)}},"Done"))}))),o.a.createElement("div",{className:"row"},o.a.createElement(v,{jsonValue:r,handleJSONchange:this.handleJSONchange.bind(this),questions:a,editQuestion:n,saveQuestions:this.handleSaveQuestion.bind(this)}),o.a.createElement(y,{searchText:l,handleSearch:this.handleSearch.bind(this),downloadJSON:this.downloadJSON.bind(this),questions:a,editQuestion:n,setEditQuestion:this.setEditQuestion.bind(this),deleteQuestion:this.deleteQuestion.bind(this)})))}}]),a}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.183be4c3.chunk.js.map