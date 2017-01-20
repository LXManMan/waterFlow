/**
 * Created by chuanglong02 on 17/1/20.
 */
window.onload = function () {

    imageLocation("container","box");

    var imgData ={
        "data":[
            {
               "src":"12.jpg"
            },
            {
               "src":"13.jpg"
            },
            {
               "src":"14.jpg"
            },
            {
               "src":"15.jpg"
            }

        ]
    };
    window.onscroll = function () {
        if(checkFlag()){

            var cpatrent =document.getElementById("container");
            for (var i=0;i<imgData.data.length;i++){
                var ccontent =document.createElement("div");
                ccontent.className ="box";
                cpatrent.appendChild(ccontent);
                var boximage = document.createElement("div");
                boximage.className ="box_img";
                ccontent.appendChild(boximage);
                var image= document.createElement("img");
                image.src ="tupian/"+imgData.data[i].src;
                boximage.appendChild(image);
            }
            imageLocation("container","box");
        }
    }
}
//是否需要开启预加载 当滑动的距离+ 屏幕的高度 大于 最后一张图片的上边距的时候加载
function checkFlag() {
    var cpatrent =document.getElementById("container");
    var ccontent = getChildElement(cpatrent,"box");
    var lastContentHeight =ccontent[ccontent.length-1].offsetTop;
    var scrollTop = document.documentElement.scrollTop ||document.body.scrollTop;
   var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
   if(lastContentHeight <scrollTop +pageHeight){
       return true;
   }

}
//取出父节点，对每个子节点做处理
function imageLocation(parent,content) {
    //将parent下所有的内容全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    var imageWidth = ccontent[0].offsetWidth;
   var number =  Math.floor(document.documentElement.clientWidth  / imageWidth);
   cparent.style.cssText ="width:"+imageWidth *number+"px;margin:0px auto";

   var  BoxHeightA =[];
   for(var i =0 ;i<ccontent.length;i++){

       if(i<number){
           BoxHeightA[i] = ccontent[i].offsetHeight;
           // console.log(BoxHeightA[i]);
       }else {
           var minHeight =Math.min.apply(null,BoxHeightA);

       var minIndex =  getminHeightLocation(BoxHeightA,minHeight);
           ccontent[i].style.position = "absolute";
           ccontent[i].style.top = minHeight +"px";

           ccontent[i].style.left = ccontent[minIndex].offsetLeft +"px";
           BoxHeightA[minIndex] =   BoxHeightA[minIndex]+ccontent[i].offsetHeight;

       }
   }

}
function getminHeightLocation(BoxHeightA,minHeight) {

    for(var i in BoxHeightA){

        if (BoxHeightA[i] == minHeight){

            return i;
        }

    }


}
//数组包裹所有的box标签
function getChildElement(parent,content) {
    var contentA = [];
    var allcontent =  parent.getElementsByTagName("*");
    for(var i= 0;i<allcontent.length;i++){
        if (allcontent[i].className == content){
            contentA.push(allcontent[i]);
        }
    }
    return contentA;
}