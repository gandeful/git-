

function ajax(url, callback) {
    var api = "http://10.18.2.131:3000";
    $.ajax({
        url: api + url,
        success: callback
    })
}

function map(startTag) {
    // <ul> => </u l > 
    var arr = startTag.split('');//切割为数组
    arr[0]+= '/';//添加/
    return arr.join('');//转换为字符串
}

function fillOperate(id, data, startTag,itemTag) {
    var html = startTag;
    for (var i = 0; i < data.length; i++) {
        var li = [itemTag, data[i], map(itemTag)];
        html += li.join('');//分隔符为空字符串,将数组转化为字符串
    }
    html += map(startTag);

    $(id)
        .html(html)//渲染标签
        .find('ul')//找到ul清除浮动
        .css('overflow', 'hidden')
        .find('li')//设置li浮动
        .css({
            "float": "left",
            "listStyle": "none",
            "marginLeft": "5px"
        })
}


//请求header的数据
ajax('/header', function (data) {

    fillOperate('#header', data,'<ul>','<li>');
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



