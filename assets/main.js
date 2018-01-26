//节点引用
var titlebar = document.getElementById("titlebar_id");
var sidebar = document.getElementById("sidebar_id");
var content = document.getElementById("content_id");
//当前模式是PC还是手机模式，取反标记，因为第一次会判断一次
var isInPC = document.body.clientWidth > 600 ? false : true;
/**
 * 获取数据
 */
(function(){
    $.getJSON("./assets/info.json", function(data){
        console.log(data);
        var info = data;
        setTitleBar(info);
        resizeChange();
        setProjectData(info);
    });
})();
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
};

/**
 * set data for titlebar in top and left
 * @param {*} info 
 */
function setTitleBar(info) {
    let header = document.getElementsByClassName("head");
    header[0].src = info.image;
    let names = document.getElementsByClassName("name");
    for (let i = 0; i < names.length; i++) {
        names[i].innerHTML = info.name;
    }
    let texts = document.getElementsByClassName("text");
    for (let i = 0; i < texts.length; i++) {
        texts[i].innerHTML = info.work;
    }
}
/**
 * set data for project list
 * @param {*} info 
 */
function setProjectData(info) {
    let root = document.getElementById("list_content");
        for (let i = 0; i < info.project.length; i++) {
            //获取一个项目对象
            let element = info.project[i];
            //创建一个新的子项div
            let itemRoot = document.createElement("div");
            itemRoot.className = "list_item";
            let itemContent = document.createElement("div");
            itemContent.className = "list_item_content";
            itemRoot.appendChild(itemContent);
            //创建头像区域
            let itemHeader = document.createElement("div");
            itemHeader.className = "project_img";
            itemHeader.innerHTML = "<a href='"+element.url+"'><img src='"+element.image+"'/></a>";
            itemContent.appendChild(itemHeader);
            //创建项目信息区域
            let itemInfo = document.createElement("div");
            itemInfo.className = "project";
            //创建项目标题
            let infoName = document.createElement("a");
            infoName.className = "project_link";
            infoName.href = element.url;
            infoName.innerHTML = element.name;
            itemInfo.appendChild(infoName);
            //创建项目简介
            let infoContent = document.createElement("dl");
            //循环添加简介
            for (let j = 0; j < element.content.length; j++) {
                let infoContentDetail = document.createElement("dt");
                infoContentDetail.innerHTML = element.content[j];
                infoContent.appendChild(infoContentDetail);
            }
            itemInfo.appendChild(infoContent);
            itemContent.appendChild(itemInfo);
            root.appendChild(itemRoot);
        }
}