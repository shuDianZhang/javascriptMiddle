/**
 * Created by MintWind on 2017/2/16.
 */
//-------------------------------------------------------------------------------------------------------------------------
function $(v){
    if(typeof v==='function'){
        window.onload = v;
    }else if(typeof v==='string'){
        return document.getElementById(v);
    }else if(typeof v === 'object'){
        return v;
    }
}



//-------------------------------------------------------------------------------------------------------------------------
//获取元素样式
/*
         不要获取未设置后的样式： 不兼容
         不要获取复合样式
 */

/*
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}
*/
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}



//-------------------------------------------------------------------------------------------------------------------------
/*
 形参： 运动对象、运动方向（元素样式 left,top,width...）、运动速度、运动目标 回调函数
 使用示例：
           oBtn1.onclick = function(){
              doMove(oDiv,'width',12,300,function(){
              doMove(oDiv,'height',12,300);
           });
         }
 */

function doMove(obj,attr,dir,target,endFn){
    dir = parseInt(getStyle(obj,attr))<target ? dir : -dir;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //speed表示当前物体运动的位置
        var speed = parseInt(getStyle(obj,attr))+dir;
        if(speed>target&&dir>0||speed<target&&dir<0){
            speed = target;
        }
        oDiv.style[attr] = speed+'px';
        if(speed == target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },30);
}

//-------------------------------------------------------------------------------------------------------------------------

/*
 形参： 抖动对象、抖动方向（ left,top）、回调函数
 使用示例：
 oImg.onclick = function(){
 shake(oImg,'top',function(){
 alert(1);
 });
 }
 */

function shake(obj,attr,fnEnd){
    var pos = parseInt(getStyle(obj,attr));   //获取抖动目标原先的位置
    var arr = [];
    var num=0;
    for(var i=20 ; i>0 ; i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval(obj.shake);
    obj.shake=setInterval(function(){
        obj.style[attr] = pos+arr[num]+'px';
        num++;
        if(num === arr.length){
            clearInterval(obj.shake);
            fnEnd&&fnEnd();
        }
    },50);
}

//-------------------------------------------------------------------------------------------------------------------------
/*
        获取到当前文档的绝对位置
 */
function getPos(obj){
    var pos = { 'left':0,'top':0};
    while(obj){
        pos.left +=  obj.offsetLeft;
        pos.top +=  obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

//-------------------------------------------------------------------------------------------------------------------------
/*
       查找数组arr中,v的位置，返回值是v的位置，如果查找不到v，则会返回-1
 */
function arrIndexOf(arr,v){
    for(var i =0 ; i<arr.length ; i++){
        if(arr[i] == v){
            return i;
        }
    }
    return -1;
}


//-------------------------------------------------------------------------------------------------------------------------
/*
        添加class属性
 */

function addClass(obj,className){
    //如果原来没有class
    if(obj.className == ''){
        obj.className = className;
    }else{
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName,className);
        if(_index == -1){
            obj.className +=' ' + className;
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------
/*
     移除class
 */

function removeClass(obj,className){
    if(obj.className != ''){
        var arrClassName = obj.className.split('');
        var _index = arrIndexOf(arrClassName,className);
        if(_index != -1){
            arrClassName.splice(_index,1);
            obj.className=arrClassName.join(' ');
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------
/*
      事件绑定函数
      例如： bind(oBtn,'click',fn1);
*/

function bind(obj,evname,fn){
    if(obj.addEventListener){
        obj.addEventListener(evname,fn,false);
    }else{
        obj.attachEvent('on'+evname, function () {
            fn.call(obj);
        });
    }
}

//-------------------------------------------------------------------------------------------------------------------------
/*
       拖拽函数(在可视区范围内拖拽)
 */

function drag(obj){
    obj.onmousedown = function(ev){
        var ev = ev || event;
        var disX =  ev.clientX - this.offsetLeft ;
        var disY =  ev.clientY - this.offsetTop ;
        if( obj.setCapture){
            obj.setCapture();
        }
        document.onmousemove = function(ev){
            var ev = ev || event;
            var L = ev.clientX - disX ;
            var T = ev.clientY - disY ;

            if(L<0){
                L =0;
            }else if(L > document.documentElement.clientWidth - obj.offsetWidth){
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }

            if(T<0){
                T =0;
            }else if(T > document.documentElement.clientHeight - obj.offsetHeight){
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }

            obj.style.left = L + 'px';
            obj.style.top =  T + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = document.onmousedown= null;
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
        }
        return false;
    }
}

//-------------------------------------------------------------------------------------------------------------------------
/*
    设置cookie
    setCookie('sex','男',10);
 */
function setCookie(key,value,t){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie = key +'='+ value+';expires='+oDate.toGMTString();
}


//-------------------------------------------------------------------------------------------------------------------------
/*
   获取cookie
   getCookie('username');
 */
function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for(var i =0 ; i<arr1.length ; i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0]==key){
            return decodeURI(arr2[1]);
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------
/*
 移除cookie
 removeCookie('username');
 */
function removeCookie(key){
    setCookie(key,'',-1);
}