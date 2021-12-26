/*Vẽ biểu đồ tròn liền - mẫu chưa sửa dữ liệu */
var myCanvas = document.getElementById("myCanvas");
 
myCanvas.width = 150;
 
myCanvas.height = 150;
 
 
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

//drawLine(ctx,100,100,200,200);
 
drawArc(ctx, 150,150,150, 0, Math.PI/3);
 
drawPieSlice(ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, '#ff0000');

var myVinyls = {
 
    "Classical music": 5,
 
    "Alternative rock": 10,
 
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

/*Đăng xuất */
function logout() {
    fetch("../../index.php/logout")
	.then(resp => {
		if (resp.status == 200) {
			resp.json()
			.then(ret => {
				if (ret.status == "OK") {
					if (ret.data == 1) {
						document.location.href = "../../index.html";
					} else {
					}
				}
			});
		}
	});
}
//

let createNewRow = function(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("tr");
	let c1 = document.createElement("td");
	let c2 = document.createElement("td");
	let c3 = document.createElement("td");
	let c4 = document.createElement("td");
	let c5 = document.createElement("td");
	let c6 = document.createElement("td");
	let c7 = document.createElement("td");
	let c8 = document.createElement("td");
	let c9 = document.createElement("td");
	let c10 = document.createElement("td");
	let c11 = document.createElement("td");
	let c12 = document.createElement("td");
	let span = document.createElement("span");
	let button1 = document.createElement("button");
	let button2 = document.createElement("button");
	let i1 = document.createElement("i");
	let i2 = document.createElement("i");
	
	i1.classList.add("fas");
	i1.classList.add("fa-user-edit");

	button1.appendChild(i1);
	button1.classList.add("detailDanSo");
	button1.classList.add("detail");

	span.appendChild(button1);

	r.classList.add("information");

	r.appendChild(c1);
	r.appendChild(c2);
	r.appendChild(c3);
	r.appendChild(c4);
	r.appendChild(c5);
	r.appendChild(c6);
	r.appendChild(c7);
	r.appendChild(c8);
	r.appendChild(c9);
	r.appendChild(c10);
	r.appendChild(c11);
	r.appendChild(c12);
	// Đặt nội dung cho các <td>
	//c1-c5
	c1.innerHTML = x1;
	c2.innerHTML = x2;
	c3.innerHTML = x3;
	c4.innerHTML = x4;
	c5.innerHTML = x5;
	c6.innerHTML = x6;
	c7.innerHTML = x7;
	c8.innerHTML = x8;
	c9.innerHTML = x9;
	c10.innerHTML = x10;
	c11.innerHTML = x11;
	c12.appendChild(span);
	// c6
	// let aupd = document.createElement("a");
	// aupd.href = "#";
	// aupd.classList.add("update");
	// aupd.innerHTML = "Sửa";
	// c6.appendChild(aupd);
	// updateClick(aupd); // Thêm hàm xử lý sự kiện kích link
	// // c7
	// let adel = document.createElement("a");
	// adel.href = "#";
	// adel.classList.add("delete");
	// adel.innerHTML = "Xóa";
	// c7.appendChild(adel); 
	// delClick(adel); // Thêm hàm xử lý sự kiện kích link
	// //
	return r;
};

/*Ở user.php check quyền*/
/*Checkacc ở User là phần login */
/*Kiểm tra tài khoản và hiện bảng */
fetch("../../index.php/danhsachdan")
.then(resp => {
    console.log("OK");
    if(resp.status == 200) {
        console.log("OK");
        console.log(resp.data);
        resp.json()
        .then(ret => {
            console.log("OK");
            console.log(ret.data);
            if (ret.status == "OK") {
				// if (!ret.rights.includes("CREATE")){
                //     tbl.style.display="none";
                //     document.querySelector("table.danh-sach-tinh-thanh-pho").style.display="none";
                // }
				
				if(ret.rights.includes("tongcuc")) {
					let tbl = document.getElementById('dscanuoc');
					console.log(tbl);

					/*Set phần hiện thông tin ACC */
					console.log(ret.tenTK[0]);
					console.log(tbl);
					let hoten = document.createElement("p");
					let loaiTK = document.createElement("p");
					hoten.innerHTML = ret.tenTK[0].name;
					loaiTK.innerHTML = "Tài khoản tổng cục";
					console.log(hoten);
					document.getElementById("account").appendChild(hoten);
					document.getElementById("account").appendChild(loaiTK);

					document.querySelector("div.tableDSDanSoCaNuoc").style.display="block";
					document.getElementById('BC').style.display = "none";
					document.getElementById('NL').style.display = "none";

					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
						console.log(ret.data[i].nghenghiep);
					}
				} else if(ret.rights.includes("tinh")) {
					let tbl = document.getElementById('dstinh');
					console.log(tbl);

					/*Set phần hiện thông tin ACC */
					console.log(ret.tenTK[0]);
					console.log(tbl);
					let hoten = document.createElement("p");
					let loaiTK = document.createElement("p");
					hoten.innerHTML = ret.tenTK[0].name;
					loaiTK.innerHTML = "Tài khoản tỉnh";
					console.log(hoten);
					document.getElementById("account").appendChild(hoten);
					document.getElementById("account").appendChild(loaiTK);

					document.querySelector("div.tableDSDanSoTinh").style.display="block";
					document.getElementById('NL').style.display = "none";
					console.log(document.querySelector("div.tableDSDanSoTinh"));
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
					hiennhaplieu();
				} else if(ret.rights.includes("huyen")) {
					let tbl = document.getElementById('dshuyen');

					/*Set phần hiện thông tin ACC */
					console.log(ret.tenTK[0]);
					console.log(tbl);
					let hoten = document.createElement("p");
					let loaiTK = document.createElement("p");
					hoten.innerHTML = ret.tenTK[0].name;
					loaiTK.innerHTML = "Tài khoản huyện";
					console.log(hoten);
					document.getElementById("account").appendChild(hoten);
					document.getElementById("account").appendChild(loaiTK);
				
					document.querySelector("div.tableDSDanSoHuyen").style.display="block";
					document.getElementById('NL').style.display = "none";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
					hiennhaplieu();
				}
				else if(ret.rights.includes("xa")) {
					let tbl = document.getElementById('dsxa');

					/*Set phần hiện thông tin ACC */
					console.log(ret.tenTK[0]);
					console.log(tbl);
					let hoten = document.createElement("p");
					let loaiTK = document.createElement("p");
					hoten.innerHTML = ret.tenTK[0].name;
					loaiTK.innerHTML = "Tài khoản xã";
					console.log(hoten);
					document.getElementById("account").appendChild(hoten);
					document.getElementById("account").appendChild(loaiTK);
					document.getElementById('NL').style.display = "none";
				
					document.querySelector("div.tableDSDanSoXa").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
					hiennhaplieu();
				} else {
					
				}
				//--
			} else if (ret.status == "NOK") {
				if (ret.data == "ACCESS-DENIED") {
					//document.querySelector("div.panel-noaccess").classList.remove("nodisplay");
				}
			} else {
				// Có lỗi
			}
        })
    } else {

    }
})

/*Kiểm tra có được hiện nhập liệu không */
function hiennhaplieu() {
	fetch("../../index.php/hiennhaplieu")
	.then(resp => {
		console.log("OK");
		if(resp.status == 200) {
			console.log("OK");
			console.log(resp.data);
			resp.json()
			.then(ret => {
				console.log("OK");
				console.log(ret.data);
				if (ret.status == "OK") {
					// if (!ret.rights.includes("CREATE")){
					//     tbl.style.display="none";
					//     document.querySelector("table.danh-sach-tinh-thanh-pho").style.display="none";
					// }
					if(ret.data[0].moquyen=="dong") {
						console.log("done");
						document.querySelector("a.aNhapLieu").href = "../html/nhaplieuloi.html";
					}
					//--
				} else if (ret.status == "NOK") {
					if (ret.data == "ACCESS-DENIED") {
						//document.querySelector("div.panel-noaccess").classList.remove("nodisplay");
					}
				} else {
					// Có lỗi
				}
			})
		} else {
	
		}
	})
	}
