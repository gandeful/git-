

function ajax(url, callback) {
    var api = "http://10.18.2.131:3000";
    $.ajax({
        url: api + url,
        success: callback
    })
}

function map(startTag) {
    // <ul> => </u l > 
    var startTag = '<' + startTag + '>'
    var arr = startTag.split('');//切割为数组
    arr[0] += '/';//添加/
    return [startTag, arr.join('')];//转换为字符串
}



/**
 * 
 * @param {*} id div根元素
 * @param {*} data 数据源
 * @param obj
 *      
 *      @param rootTag
 *      @param rootStyle
 *      @param itemTag
 *      @param itemStyle
 *   
 */
function fillOperate(id, data, obj) {

    if (!obj) {
        obj = {
            rootTag: 'ul',
            itemTag: 'li'
        }
    }

    var startTag = map(obj.rootTag);
    var itemTag = map(obj.itemTag);

    var html = startTag[0];
    for (var i = 0; i < data.length; i++) {

        var li;
        if (obj.itemTag == 'img') {
            li = ['<img src="', data[i], '"/>'];
        } else {
            li = [itemTag[0], data[i], itemTag[1]];
        }
        html += li.join('');//分隔符为空字符串,将数组转化为字符串
    }
    html += startTag[1];


    var rootStyle = obj.rootStyle || {};
    var itemStyle = obj.itemStyle;
    //如果itemStyle没有设置,默认为横着的样式
    if (!itemStyle) {
        itemStyle = {
            "float": "left",
            "listStyle": "none",
            "marginLeft": "5px"
        }
        rootStyle.overflow = 'hidden';
    }
    //链式编程
    $(id)
        .html(html)//渲染标签
        .css(rootStyle)
        .find(obj.rootTag)//找到ul清除浮动
        .find(obj.itemTag)//设置li浮动
        .css(itemStyle);//列表的样式写死了,只能是横着的,不太好
}


//请求header的数据
ajax('/header', function (data) {

    fillOperate('#header', data);
    /*
    var html = "<ul>";
    for (var i = 0; i < data.length; i++) {
        var li = ['<li><a href="#">', data[i], '</a></li>'];
        html += li.join('');//分隔符为空字符串,将数组转化为字符串
    }
    html += "</ul>";
    */

    /* 
    //拓展,jq设置css
    $('#header').html(html);//渲染标签
    //因为ul里面的li是浮动元素,所以,没有高度,所以对 ul标签清除浮动
    
    $('#header ul').css("overflow","hidden");//清除浮动

    $('#header li').css({
        "float":"left",
        "listStyle":"none",
        "marginLeft":"5px"
    });
    */

    //jq优化,find查找子元素
    /*$('#header')
        .html(html)//渲染标签
        .find('ul')//找到ul清除浮动
        .css('overflow', 'hidden')
        .find('li')//设置li浮动
        .css({
            "float": "left",
            "listStyle": "none",
            "marginLeft": "5px"
        })*/

})

ajax('/nav', function (data) {
    fillOperate('#nav', data);
})

ajax('/aside', function (data) {

    fillOperate('#aside', data, {
        rootTag: 'ul',
        rootStyle: {
            float: 'left'
        },
        itemTag: 'li',
        itemStyle: {
            'color': 'red',
            'fontSize': '18px',
            "listStyle": "none",
        }
    });
})

ajax('/slide', function (data) {
    fillOperate('#slide', data, {
        rootTag: 'div',
        rootStyle: {
            float: 'left',
            width: '1200px',
            height: '460px',
            overflow: 'hidden'
        },
        itemTag: 'img',
        itemStyle: {
            'color': 'red',
            'fontSize': '18px',
            "listStyle": "none",
        }
    });


    //图片轮播
    $('img').click(function () {

        var index = $(this).index();//找到自己的位置
        $(this).fadeOut();//自己消失

        if (index == data.length - 1) {//找到后面一个没找到
            $('img').eq(0).fadeIn();
        } else {
            $('img').eq(index + 1).fadeIn();
        }
    })
})
