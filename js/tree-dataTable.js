/**
 * Created by Administrator on 2017/10/17.
 */

var url,t;
var setting = {
    /*异步加载数据*/
    /*  async: {
     enable: true,
     url:"../asyncData/getNodes.php",
     autoParam:["id"],
     otherParam:{"otherParam":"zTreeAsyncTest"},
     dataFilter: filter
     },*/
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onClick: onClick
    }
};
function beforeClick(treeId, treeNode){
    if(treeNode.isParent){
        return false
    }
}
function onClick(event, treeId, treeNode, clickFlag) {
    var nodeId = treeNode.id;
    url = 'json/data'+nodeId+'.json';
    table()
}

function table(){
     t = $('#table1').DataTable({
        "ajax": url,
        "columns": [
            {
                data: null,
                title: "<input type='checkbox' name='checkall' id='checkall' />"
            },
            { "data": "name", title: "名称" },
            { "data": "position",title: "职位" },
            { "data": "office",title: "状态" },
            { "data": "extn",title: "数量" },
            { "data": "start_date",title: "发布时间" },
            { "data": "salary",title: "资金" },
            {
                data: null,
                title: "操作"
            }
        ],
         stateSave: true,
        "destroy":true,
        "paging": true, //翻页功能
        "lengthChange": true, //改变每页显示数据数量
        "dom": "ft<'row-fluid'<'fl'l><'fl'i><'fr'p>>", //让翻页进入下侧位置
        "order": [[1, "desc"]],    //从第0列开始，以第4列倒序排列
        "searching": true, //过滤功能
        "columnDefs": [
            {
                //   指定第一列，从0开始，0表示第一列，1表示第二列……
                "orderable": false,
                "targets":0,
                render: function(data, type, row, meta) {
                    return '<input type="checkbox" name="checklist" class="chk" onclick="checklist($(this))" value="' + row.id + '" />'
                }
            },
            {"visible": false, "targets": [/*2*/]},  //隐藏某一列
            {"orderable": false, "targets": [3, 4, 5]},//设置排序的列
            {
                //   指定第一列，从0开始，0表示第一列，1表示第二列……
                "orderable": false,
                "targets":7,
                render: function(data, type, row, meta) {
                    var id = row.id;
                    console.log(id)
                    return ' <button type="button" class="btn btn-w-m btn-tip btn-small" class="down" onclick="down()" id="'+id+'">下载</button>&ensp; ' +
                        '<button type="button" class="btn btn-w-m btn-tip  btn-small" class="detail">详情</button>'
                }
            }
        ],
        "info": true,//页脚信息
        "autoWidth": true,//自动宽度
        "lengthMenu": [5, 10, 25],
        "language": {
            "search":"搜索：",
            "lengthMenu": "每页显示 _MENU_ 条记录",
            "zeroRecords": "抱歉， 没有找到",
            "info": "从 _START_ 到 _END_ / 共 _TOTAL_ 条数据",
            "infoEmpty": "没有数据",
            "infoFiltered": "(从 _MAX_ 条数据中检索)",
            "paginate": {
                "first": "首页",
                "previous": "上一页",
                "next": "下一页",
                "last": "末页"
            },
            "processing": "玩命加载中..."
        },
        "initComplete": function(settings, json) {
            console.log("表格加载完成");
        }
    });
}
var zNodes =[
    { id:1, pId:0, name:"项目一", open:true,iconOpen:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/open-folder.png", iconClose:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/close-folder.png"},
    { id:11, pId:1, name:"叶子节点1",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png" },
    { id:12, pId:1, name:"叶子节点2",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png" },
    { id:13, pId:1, name:"叶子节点3",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:2, pId:0, name:"项目二", open:true,iconOpen:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/open-folder.png", iconClose:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/close-folder.png"},
    { id:21, pId:2, name:"叶子节点1",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:22, pId:2, name:"叶子节点2",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:23, pId:2, name:"叶子节点3",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:3, pId:0, name:"项目三", open:false,iconOpen:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/open-folder.png", iconClose:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/close-folder.png"},
    { id:31, pId:3, name:"叶子节点1",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:32, pId:3, name:"叶子节点2",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"},
    { id:33, pId:3, name:"叶子节点3",icon:"./lib/zTree_v3.5.29/css/zTreeStyle/img/diy/file.png"}
];

function showPoup(tableId,poupClass,poupId){
    var id = "#"+tableId;
    var className = "."+poupClass;
    if($("#"+poupId)[0]) {
        $(id).find("thead tr th").each(function (i) {

            var html = ' ';
            var innerhtml = $(this).text();
            console.log(innerhtml)
            html += '<p><label class="ipt-label">' + innerhtml + '</label><input class="ipt" type="text"/></p>';
            $(".popup-content-form").append(html);
            $(className).removeAttr("id")
        })
    }
    $(className).show()
}
function checklist(obj){
    if(!obj.prop('checked')){
        obj.parent().parent().removeClass('selected');
        $('#checkall').prop('checked',false);
    }else{
        obj.parent().parent().addClass('selected');
        //$('#checkall').prop('checked',true);
    }
}

function down(){
    alert("确定下载！！！")
}


$(function(){
    table();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);

    /*全选功能*/
    $("table tr").on("click","#checkall",function(){
        if ($(this).prop("checked")) {
            $("table input[name='checklist']").prop("checked", true);
            $("input[name='checklist']").parent().parent().addClass('selected');
        } else {
            $("input[name='checklist']").prop("checked", false);
            $("input[name='checklist']").parent().parent().removeClass('selected');
        }
    })

  /*  $("table tr td").on("click","input.chk",function(){
        alert(1)
        var count = 0;
       /!* $("input[name='checklist']").each(function(){
            if($(this).prop('checked') != 'checked'){// 判断一组复选框是否有未选中的
                count+=1;
            }
        });*!/
        if(!$(this).prop('checked')){// 判断一组复选框是否有未选中的
            count+=1;
        }
        console.log(count)
        if(count == 0) { // 如果没有未选中的那么全选框被选中
            $('#checkall').prop('checked', true);
        } else {
            $('#checkall').prop('checked',false);
        }
    })*/
    /* 点击增加新行，弹出弹窗 */
    $('#addRow').on('click', function () {
        showPoup("table1","popup0","popup0");
    });
    /*点击保存*/
    $(".save").on("click",function(){
        alert(0)
        $.ajax({
            dataType : 'json',
            type:'post',
            data: '',
            success: function(data)
            {

            },
            error: function()
            {
                alert('服务器无响应，请联系管理员!');
            }
        });
    })


    /*点击关闭按钮,关闭弹窗*/
    $('.close_popup,.cancle').on('click', function () {
        $(".popup0").hide()
    });

    /* 点击删除新行 */
   /* $('#table1 tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $(this).addClass('selected');
        }
    });*/

    $('#remove').click(function () {
        var deletesize = $(".selected").size();
        for (var i = 0; i < deletesize; i++) {
            $('#table1').DataTable().row('.selected').remove().draw(false);
        }

    });


})