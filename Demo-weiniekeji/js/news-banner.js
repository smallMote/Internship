$(function () {
    const main_banner_action = (function () {
        let bean = main_banner_bean();
        let count = bean.count;
        let item = bean.item;
        //创建hover指示器
        for (let i = 0; i < item.length; i++) {
            let $hoverAction = $('<span>');
            $hoverAction.addClass('action-hover-item');
            $hoverAction.text((i+1)+'');
            $('#wlittleyang-banner-fade .action-hover').append($hoverAction);
        }
        //单击事件下一张
        let click = bean.$actionRight.click(function () {
            let $hoverAction = $('.action-hover .action-hover-item');
            if (count === item.length - 1) {
                count = 0;
                $(item[item.length - 1]).css({opacity : 0});
                $(item[0]).css({opacity : 1});
            }else {
                $(item[count]).css({opacity : 0});
                $(item[count + 1]).css({opacity : 1});
                count += 1;
            }
            $hoverAction.css({background:'none' , color : 'white'});
            $($hoverAction[count]).css({background : 'rgba(0,0,0,.6)',color : '#facd89'});
        });
        //自动轮播，模拟用户操作
        let timer = setInterval(function () {
            bean.$actionRight.click();
        },2000);
        //图片的抚摸，抚摸在上方时暂停自动播放，溢出抚摸开始自动播放
        let imgHover = bean.item.hover(function () {
            clearInterval(timer);
        },function () {
            timer = setInterval(function () {
                $('#wlittleyang-banner-fade .action-right').click();
            },2000);
        });
        //指示器的抚摸事件处理
        let hover = $('#wlittleyang-banner-fade .action-hover-item').hover(function () {
            clearInterval(timer);
            let $hoverAction = $('.action-hover .action-hover-item');
            //获取当前的索引
            let now_i = $(this).index();
            item.css({opacity : 0});
            $(item[now_i]).css({opacity : 1});
            console.log(now_i);
            //指示器样式改变
            count = now_i;
            $hoverAction.css({background:'none' , color : 'white'});
            $($hoverAction[count]).css({background : 'rgba(0,0,0,.6)',color:'#facd89'});
        },function () {
            timer = setInterval(function () {
                $('#wlittleyang-banner-fade .action-right').click();
            },2000);
        });

        /**
         * 初始化main_banner_bean需要的参数
         * 这样设计可以保证不污染全局的节点选择，容易扩展功能和节点的操控
         * @returns {{count: number, item: (*|jQuery|HTMLElement), $actionRight: (*|jQuery|HTMLElement), $hoverAction: string, $actionItem: (*|jQuery|HTMLElement)}}
         */
        function main_banner_bean() {
            // main_banner_autoGrowp();
            return {
                count : 0,
                item : $('#wlittleyang-banner-fade .item'),
                $actionRight : $('#wlittleyang-banner-fade .action-right'),
                $hoverAction : '',
                $actionItem : $('#wlittleyang-banner-fade .action-hover .action-hover-item')
            }
        }
        //创建接口，一是不便于维护，二是开源便于别人重写function
        return {
            clickAction : click,
            hoverAction : hover,
            autoBannerAction : timer,
            imgHoverAction : imgHover
        }
    })();
});