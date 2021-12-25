
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
//
// Ẩn tất cả panel
let hideAllPanel = function() {		
	let panels = document.querySelectorAll("div.panel");
	for (let i = 0; i < panels.length; i++) {
		panels[i].classList.add("nodisplay");
	}
};
//
//
// Hiển thị list-panel
let showListPanel = function() {
	hideAllPanel();
	document.querySelector("div.panel-list").classList.remove("nodisplay");
};
//
//
// Hiển thị edit-panel
let showEditPanel = function() {
	hideAllPanel();
	document.querySelector("div.panel-edit").classList.remove("nodisplay");
};
//
//
// Bắt sự kiện kích link Xóa 
let delClick = function (a) {
	a.onclick = function() {
		if(confirm("Thầy/cô chắc chắn xóa sinh viên " + this.parentNode.parentNode.childNodes[2].innerHTML + ", mã số " + this.parentNode.parentNode.childNodes[1].innerHTML)) {
			let msv = this.parentNode.parentNode.childNodes[1].innerHTML;
			fetch("index.php/students/" + msv, {
				method: "DELETE",
				headers: {"Content-Type": "application/json"},
				body: '{"masv":"' + msv + 
				'"}'})
			.then(resp => {
				if (resp.status == 200) {
					resp.json()
					.then(ret => {
						if (ret.status == "OK") { 
							if (ret.data == 1) {
								let tb = this.parentNode.parentNode.parentNode;
								tb.removeChild(a.parentNode.parentNode);
								// Đánh lại số thứ tự trong bảng
								for (let i = 0; i < tb.rows.length; i++)
									tb.rows[i].cells[0].innerHTML = (i+1).toString();
							}
						}
					});
				}
			});
		} else { return false;}
	};
};
//
//
// Bắt sự kiện kích link Sửa 
let ulink = null;
let updateClick = function (a) {
	a.onclick = function() {
		// 
		ulink = this; // lưu tham chiếu link để có thể dùng lại khi người dùng "Chấp nhận"
		// Đưa dữ liệu lên form nhập
		document.querySelector("div.panel-edit h1").innerHTML = "Cập nhật sinh viên";
		document.querySelector("div.panel-edit div.err-submit").innerHTML = "";

		document.querySelector("div.panel-edit span.err-masv").innerHTML = "";
		document.querySelector("div.panel-edit span.err-hoten").innerHTML = "";
		document.querySelector("div.panel-edit span.err-ngaysinh").innerHTML = "";
		document.querySelector("div.panel-edit span.err-quequan").innerHTML = "";
		document.querySelector("div.panel-edit input.masv").disabled = true;
		document.querySelector("div.panel-edit button.edit-submit").disabled = false;


		document.querySelector("div.panel-edit input.mode").value = "update";
		document.querySelector("div.panel-edit input.masv").value = this.parentNode.parentNode.childNodes[1].innerHTML;
		document.querySelector("div.panel-edit input.hoten").value = this.parentNode.parentNode.childNodes[2].innerHTML;
		document.querySelector("div.panel-edit input.ngaysinh").value = this.parentNode.parentNode.childNodes[3].innerHTML;
		document.querySelector("div.panel-edit input.quequan").value = this.parentNode.parentNode.childNodes[4].innerHTML;

		// Hiển thị edit-panel
		showEditPanel();	
	};
};

let createNewRow = function(x1, x2, x3, x4, x5) {
	// Tạo <tr> và các <td> mới
	let r = document.createElement("tr");
	let c1 = document.createElement("td");
	let c2 = document.createElement("td");
	let c3 = document.createElement("td");
	let c4 = document.createElement("td");
	let c5 = document.createElement("td");
	let c6 = document.createElement("td");
	let c7 = document.createElement("td");
	//r.appendChild(c1);
	r.appendChild(c2);
	r.appendChild(c3);
	r.appendChild(c4);
	r.appendChild(c5);
	r.appendChild(c6);
	r.appendChild(c7);
	// Đặt nội dung cho các <td>
	//c1-c5
	c1.innerHTML = x1;
	c2.innerHTML = x2;
	c3.innerHTML = x3;
	c4.innerHTML = x4;
	c5.innerHTML = x5;
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
fetch("../../index.php/danhsach")
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
					let tbl = document.getElementById('dstinh');
					
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
					
					document.querySelector("div.trung-uong").style.display="block";

					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].matinh, ret.data[i].tentinh, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
				} else if(ret.rights.includes("tinh")) {
					let tbl = document.getElementById('dshuyen');
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
					

					document.querySelector("div.cap-tinh").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].mahuyen, ret.data[i].tenhuyen, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}

					hiennhaplieu();
				} else if(ret.rights.includes("huyen")) {
					let tbl = document.getElementById('dsxa');

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

					document.querySelector("div.cap-huyen").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].maxa, ret.data[i].tenxa, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
					hiennhaplieu();
				}
				else if(ret.rights.includes("xa")) {
					let tbl = document.getElementById('dsthon');

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

					document.querySelector("div.cap-xa").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].mathon, ret.data[i].tenthon, ret.data[i].sodan, ret.data[i].tiendo);
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

