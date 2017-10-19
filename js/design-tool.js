/**
 * Created by Administrator on 2017/10/18.
 */
$(function() {
    var arr=[];
    $(".content .left-tool-box .drap").draggable({
        appendTo: ".drop-box",
        helper: "clone"
    });
    $(".common-box .toolAdd").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: "*",
        drop: function( event, ui ) {
            var dom = ui.draggable[0];
            var url = $(dom).find("img").attr("src");
            var text = $(dom).find("div").text();
            if(arr.indexOf(text) == -1){
                var html = '<div class="fl toolList">' +
                    '<img src="'+url+'" class="tool-logo-wh" alt=""/>' +
                    '<div>'+text+'</div></div>';
                $(".drop-box").append(html);
                arr.push(text);
            }
        }
    })
});