/*Menu chọn Tổng quan */
function tongquan() {
    console.log('Hello world');

    document.getElementById('contentQuanLiMaTinh').style.display = "none";
    document.getElementById('contentQuanLiA2').style.display = "none";
    document.getElementById('contentQuanLiDanSo').style.display = "none";
    document.getElementById('tableDS').style.display = "block";
    document.getElementById('chart').style.display = "block";

    document.getElementById('A2').style.background = "none";
    document.getElementById('MT').style.background = "none";
    document.getElementById('DS').style.background = "none";
    document.getElementById('TQ').style.background = "rgba(0, 40, 66, 0.48)";
}
/*Menu chọn Quản lí A2 */
function quanliA2() {
    console.log('Hi there');
    document.getElementById('contentQuanLiMaTinh').style.display = "none";
    document.getElementById('tableDS').style.display = "none";
    document.getElementById('chart').style.display = "none";
    document.getElementById('contentQuanLiDanSo').style.display = "none";
    document.getElementById('contentQuanLiA2').style.display = "inline";

    document.getElementById('MT').style.background = "none";
    document.getElementById('TQ').style.background = "none";
    document.getElementById('DS').style.background = "none";
    document.getElementById('A2').style.background = "rgba(0, 40, 66, 0.48)";
}

/*Menu chọn Quản lí mã tỉnh */
function matinh() {
    
    document.getElementById('tableDS').style.display = "none";
    document.getElementById('chart').style.display = "none";
    document.getElementById('contentQuanLiA2').style.display = "none";
    document.getElementById('contentQuanLiDanSo').style.display = "none";

    document.getElementById('contentQuanLiMaTinh').style.display = "inline";

    document.getElementById('A2').style.background = "none";
    document.getElementById('TQ').style.background = "none";
    document.getElementById('DS').style.background = "none";
    document.getElementById('MT').style.background = "rgba(0, 40, 66, 0.48)";
}

function danso() {
    document.getElementById('tableDS').style.display = "none";
    document.getElementById('chart').style.display = "none";
    document.getElementById('contentQuanLiA2').style.display = "none";
    document.getElementById('contentQuanLiMaTinh').style.display = "none";
    document.getElementById('contentQuanLiDanSo').style.display = "block";
    document.getElementById('chart').style.display = "block";

    document.getElementById('A2').style.background = "none";
    document.getElementById('TQ').style.background = "none";
    document.getElementById('MT').style.background = "none";
    document.getElementById('DS').style.background = "rgba(0, 40, 66, 0.48)";
}


/*Vẽ biểu đồ tròn liền - mẫu chưa sửa dữ liệu */
var myCanvas = document.getElementById("myCanvas");
 
myCanvas.width = 300;
 
myCanvas.height = 300;
 
 
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY){
 
    ctx.beginPath();
 
    ctx.moveTo(startX,startY);
 
    ctx.lineTo(endX,endY);
 
    ctx.stroke();
 
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
 
    ctx.beginPath();
 
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
 
    ctx.stroke();
 
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
 
    ctx.fillStyle = color;
 
    ctx.beginPath();
 
    ctx.moveTo(centerX,centerY);
 
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
 
    ctx.closePath();
 
    ctx.fill();
 
}

drawLine(ctx,100,100,200,200);
 
drawArc(ctx, 150,150,150, 0, Math.PI/3);
 
drawPieSlice(ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, '#ff0000');

var myVinyls = {
 
    "Classical music": 10,
 
    "Alternative rock": 14,
 
    "Pop": 2,
 
    "Jazz": 12
 
};

var Piechart = function(options){
 
    this.options = options;
 
    this.canvas = options.canvas;
 
    this.ctx = this.canvas.getContext("2d");
 
    this.colors = options.colors;
 
 
 
    this.draw = function(){
 
        var total_value = 0;
 
        var color_index = 0;
 
        for (var categ in this.options.data){
 
            var val = this.options.data[categ];
 
            total_value += val;
 
        }
 
 
 
        var start_angle = 0;
 
        for (categ in this.options.data){
 
            val = this.options.data[categ];
 
            var slice_angle = 2 * Math.PI * val / total_value;
 
 
 
            drawPieSlice(
 
                this.ctx,
 
                this.canvas.width/2,
 
                this.canvas.height/2,
 
                Math.min(this.canvas.width/2,this.canvas.height/2),
 
                start_angle,
 
                start_angle+slice_angle,
 
                this.colors[color_index%this.colors.length]
 
            );
 
 
 
            start_angle += slice_angle;
 
            color_index++;
 
        }
 
 
 
    }
 
}

var myPiechart = new Piechart(
 
    {
 
        canvas:myCanvas,
 
        data:myVinyls,
 
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88"]
 
    }
 
);
 
myPiechart.draw();
document.getElementById('chart').style.display = "block";

/*Phần Detail */
function detail() {
    
}