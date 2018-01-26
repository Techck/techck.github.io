//节点引用
var titlebar = document.getElementById("titlebar_id");
var sidebar = document.getElementById("sidebar_id");
var content = document.getElementById("content_id");
//当前模式是PC还是手机模式，取反标记，因为第一次会判断一次
var isInPC = document.body.clientWidth > 600 ? false : true;
resizeChange();
//监听浏览器宽度的改变
window.onresize = function(){
    resizeChange();
};
//浏览器尺寸变化的回调
function resizeChange(){
    //获取网页可见区域宽度
    var totalWidth = document.body.clientWidth;
    if (totalWidth <= 600 && isInPC) {
        isInPC = false;
        //手机模式
        document.body.removeChild(sidebar);
        document.body.appendChild(titlebar);
        content.style.marginLeft = "0px";
        content.style.marginTop = "60px";
    } else if (totalWidth > 600 && !isInPC) {
        isInPC = true;
        //电脑模式
        document.body.appendChild(sidebar);
        document.body.removeChild(titlebar);
        content.style.marginLeft = "300px";
        content.style.marginTop = "0px";
    }
}      