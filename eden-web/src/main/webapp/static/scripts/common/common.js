//依赖于jquery、notie.js
var utils = {

    //同步获取数据
    getSync: function (url, handler, dataType) {
        var dtd = $.Deferred(),
            data;
        $.ajax({
            url: url,
            data: data || {},
            dataType: dataType || 'json',

            type: 'get',
            async: false
        }).done(function (data) {
            data = handler ? handler(data) : data;
            dtd.resolve(data);
        }).fail(function (a, b, c) {
            dtd.reject(data);
        });
        return dtd.promise();
    },

    post: function (url, data, handler, dataType) {
        var dtd = $.Deferred(),
            data;
        $.ajax({
            url: url,
            data: data || {},
            dataType: dataType || 'json',

            type: 'post',
            async: true
        }).done(function (data) {
            data = handler ? handler(data) : data;
            dtd.resolve(data);
        }).fail(function (a, b, c) {
            dtd.reject(data);
        });
        return dtd.promise();
    },
    //发送json格式数据
    postJson: function (url, data, handler, dataType) {
        var dtd = $.Deferred(),
            data;
        $.ajax({
            url: url,
            data: data || {},
            dataType: dataType || 'json',
            contentType:'application/json; charset=UTF-8',
            type: 'post',
            async: true
        }).done(function (data) {
            data = handler ? handler(data) : data;
            dtd.resolve(data);
        }).fail(function (a, b, c) {
            dtd.reject(data);
        });
        return dtd.promise();
    },
    get: function (url, handler, dataType) {
        var dtd = $.Deferred(),
            data;
        $.ajax({
            url: url,
            data: data || {},
            dataType: dataType || 'json',
            type: 'get',
            async: true
        }).done(function (data) {
            data = handler ? handler(data) : data;
            dtd.resolve(data);
        }).fail(function (a, b, c) {
            dtd.reject(data);
        });
        return dtd.promise();
    },

    /**
     * 用此loading需导入ball-clip-rotate-multiple   css
     * @param parentDiv
     */
    loading: function (parentDiv) {
        parentDiv.empty();
        $item = $('<div class="la-ball-clip-rotate-multiple " style="height: 200px;"><div></div><div></div></div>');
        parentDiv.append($item);
    }


};


//信息提示
var Alert = {

    success: function (message) {
        notie.alert(1, message, 2);
    },
    warning: function (message) {
        notie.alert(2, message, 2);
    },
    info: function (message) {
        notie.alert(4, message, 2);
    },
    error: function (message) {
        notie.alert(3, message, 2.5);
    },
    confirm: function (message, yes_callback) {
        notie.confirm(message, "确定", "取消", yes_callback);
    },
    input: function (title, submit_callback) {
        notie.input(title, "确定", "取消", "text", "", submit_callback);
    }
};


var Base = {
    processData: function (data, sucess_callback, fail_callback) {
        if (data.flag) {
            //成功
            sucess_callback(data);
        } else if (data.notLogin) {

            //未登录
            Alert.warning("未登录");
        } else if (data.permissionDenied) {
            //权限不足
            Alert.error("权限不足");
        } else {
            if (fail_callback) {
                //操作失败、消息获取失败
                fail_callback(data);
            } else {
                //返回的错误信息
                var message=data.message||'数据获取失败';
                Alert.error(message);
            }

        }
    }
};

function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

//不支持ie
if (isIE()) {
    notie.alert(3, "本网站暂不支持IE,请更换为其他浏览器", 10000);
}

//num不足n位，在前面补0
function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

//
function ExtractData(){

}


//格式化歌曲时间

function fmtSongTime(time){

    return pad(parseInt(time/60),2)+":"+pad(time%60,2);
}


//格式化播放数量，比如10万，1千之类的
function fmtPlayCount(playCount){
    if(playCount>1000)
        return parseInt(playCount/1000)+"千";
    if(playCount>10000)
        return parseInt(playCount/10000)+"万";
    return playCount;
}


//time是时间毫秒值,fmt
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
function fmtDate(time,fmt) {
    fmt=fmt||'yyyy-MM-dd ';
    var da=new Date(time);
    var currentDate=new Date();
    var currentTime=currentDate.getTime();
    //不足一分，返回多少秒
    var interval=currentTime-time;
    if(interval<1000*60){

        return parseInt(interval/(1000))+"秒前";
    }

    //如果相差不足1个小时，返回多少分之前
    if((currentTime-time)<1000*60*60){
        return parseInt(interval/(1000*60))+"分钟前";
    }

    //不足一天,同一天,返回分:秒，比如:10:20
    if((da.getFullYear()+da.getMonth()+da.getDate()+"")==(currentDate.getFullYear()+currentDate.getMonth()+currentDate.getDate()+"")){
        fmt="hh:mm";
    }


    var o = {
        "M+": da.getMonth() + 1, //月份
        "d+": da.getDate(), //日
        "h+": da.getHours(), //小时
        "m+": da.getMinutes(), //分
        "s+": da.getSeconds(), //秒
        "q+": Math.floor((da.getMonth() + 3) / 3), //季度
        "S": da.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (da.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//对象所有属性,属性值不为-1
function getObjProperty(obj){
    var parValue=[];
    for(name in obj){
        if(obj[name]!=null){
            if(obj[name]!=-1){
                parValue.push(obj[name]);
            }
        }
    }
    return parValue;
}



//我的插件,依赖于jquery、jtemplates、paginator
//如果不用分页的话，将直接在根节点下面

+function ($) {
    'use strict';

    var JtemplatePag = function (element, options) {
            this.init(element, options);
        },
        old = null;


    JtemplatePag.prototype ={

        addDom:function(){
            this.$element.empty();
            var insertDom="<div class=\'"+this.options.className+" JtemplatePage_list' ></div><div class='pull-right'><ul class='JtemplatePage_page' ></ul></div>";
            if(this.options.isNeedPage){
                //需要分页
                this.$element.append(insertDom);

                this.template_dom=$(this.$element.children(".JtemplatePage_list").get(0));
                this.page_dom=$(this.$element.find(".JtemplatePage_page").get(0));
            }else{
                this.template_dom=this.$element;
            }
        },
        initTemplate:function(){
            //初始化模板,
            if (this.options.template) {
                this.template_dom.setTemplate(this.options.template);
            } else {
                this.template_dom.setTemplateURL(this.options.template_url);
            }
        },
        init:function(element, options){
            //初始化
            //设置参数
            this.$element = $(element);
            this.options = $.extend({}, (this.options || $.fn.jtemplatePag.defaults), options);

            //设置dom
            this.addDom();
            //初始化模板
            this.initTemplate();

            //初始化请求参数

           this.setRequestParam();


            //调用渲染
            this.render();


        },
        //设置请求参数
        setRequestParam:function(){
            this.param = $.extend({},this.options.parameters, this.options.request_param());

            if(this.options.dataType==1){
                if(this.options.paramType==2){
                    this.param.page=this.param.page||{};
                    this.param.page.pageSize=this.options.pageSize;
                    this.param.page.pageNumber=this.options.pageNumber;
                }else{

                    this.param['pageSize']=this.options.pageSize;
                    this.param['pageNumber']=this.options.pageNumber;
                }

            }
        },
        refresh:function(){
            this.render();
        },
        getData:function(){
            return this.data;
        },
        complete:function(){
            //完成后的回调方法
            this.options.complete(this.allData,this.$element);
        },
        //改变配置
        changeConf:function(options){
            this.options = $.extend({},this.options,options);
        },
        handleData:function(data){
            var that=this;

            //默认处理
            Base.processData(data, function (data) {
                var rel_data = data.data;
                var rel_data_list = data.data;
                if (that.options.dataType == 1) {
                    rel_data_list = data.data.rows;
                }

                //拿到数据,渲染
                that.template_dom.processTemplate(rel_data_list);
                //设置数据
                that.data = rel_data_list;
                that.allData=rel_data;

                if (that.options.dataType == 1) {



                    if (that.options.isNeedPage) {
                        //渲染分页,分页只渲染一次

                        //先加一个ul节点在页面

                        var pageSize = that.options.pageSize;
                        var total = rel_data.total;

                        //只有当总数大于每页时才渲染分页
                        if(total>pageSize){
                            var totalPages = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
                            var pageOptions = {
                                bootstrapMajorVersion: 3,
                                currentPage: that.options.page,
                                totalPages: totalPages,
                                //alignment:"right",
                                numberOfPages: 5,
                                shouldShowPage: true,
                                itemTexts: function (type, page, current) {
                                    switch (type) {
                                        case "first":
                                            return "首页";
                                        case "prev":
                                            return "上一页";
                                        case "next":
                                            return "下一页";
                                        case "last":
                                            return "尾页";
                                        case "page":
                                            return page;
                                    }
                                },
                                onPageClicked: function (event, originalEvent, type, page) {
                                    that.options.page=page;
                                    var current = that.page_dom.bootstrapPaginator("getPages").current;
                                    if (current == originalEvent.data.page) {
                                        console.info("页面不变,不刷新");
                                        return;
                                    }

                                    //点击时，覆盖参数
                                    if(that.options.paramType==2){
                                        that.param.page.pageSize=that.options.pageSize;
                                        that.param.page.pageNumber=page;
                                    }else{

                                        that.param['pageSize']=that.options.pageSize;
                                        that.param['pageNumber']=page;
                                    }

                                    //重新渲染
                                    that.render();

                                }
                            };
                            //渲染分页
                            that.page_dom.bootstrapPaginator(pageOptions);
                        }

                    }

                }

                //完成

                that.complete();

            });
        },
        render:function(){
            //每次渲染，dom重新
            this.addDom();
            //重新获取模板
            this.initTemplate();


            //设置请求参数，
            this.setRequestParam();
            var that = this;
            //渲染
            console.info("渲染数据");
            //loading加载
            utils.loading(that.template_dom);

            var finalPam=that.param;
            //参数类型，是用js对象还是转换为json格式
            if(this.options.paramType==2){
                finalPam=JSON.stringify(finalPam);
            }
            //数据url

            if(this.options.paramType==1){
                utils.post(this.options.data_url, finalPam, function (data) {
                    return data;
                }, "json").done(function (data) {
                    that.handleData(data);

                });
            }else{
                utils.postJson(this.options.data_url, finalPam, function (data) {
                    return data;
                }, "json").done(function (data) {
                    that.handleData(data);

                });
            }








        }

    };


    old = $.fn.jtemplatePag;

    $.fn.jtemplatePag = function (option) {

        var args = arguments,
            result = null;

        $(this).each(function (index, item) {
                console.info($(item).data());
            var $this = $(item),
                data = $this.data('jtemplatePag'),
                options = (typeof option !== 'object') ? null : option;
                if(options&&options.useParmData&&($(item).data())){
                    options.parameters=$.extend({},options.parameters,$(item).data());
                }


            if (!data) {
                data = new JtemplatePag(this, options);

                $this = $(data.$element);

                $this.data('jtemplatePag', data);

                return;
            }

            if (typeof option === 'string') {

                if (data[option]) {
                    result = data[option].apply(data, Array.prototype.slice.call(args, 1));
                } else {
                    throw "Method " + option + " does not exist";
                }

            }
        });

        return result;

    };

    //template--模板,template_url--模板url,data-数据,data_url---数据的地址
    $.fn.jtemplatePag.defaults={


        isNeedPage: true,//是否需要分页插件
        pageSize: 10,
        pageNumber: 1,
        request_param: function () {
            return {};
        },
        dataType:1,//数据的类型，默认是1,就是带有分页的。2就是没有分页，直接是data里面是list传过来的,这种就没有分页
        parameters: {},//默认参数，
        paramType:1,//参数类型，默认是1,就是js对象；2为json格式，字符串,里面会转换成json格式传到后台
        className:'',
        useParmData:false,//是否,把data-...作为请求参数
        complete:function(data,element){

        }
    };
    $.fn.jtemplatePag.Constructor = JtemplatePag;


}(jQuery);
