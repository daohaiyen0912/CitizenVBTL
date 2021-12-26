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
var createNewRow = function(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11) {
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



// Người dùng bấm nút "Chấp nhận" trên form nhập (thêm mới hoặc chỉnh sửa) cấp mã cấp dưới mới
document.querySelector("button.subCapQuyen").onclick = function() {
	fetch("../../index.php/nhaplieu", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"cccd":"' + document.querySelector("input.cccd").value + 
			'","ten":"' + document.querySelector("input.ten").value +
            '", "ngaysinh":"' + document.querySelector("input.ns").value +
             '", "gioitinh":"' + "1" +
              '", "quequan":"' + document.querySelector("input.xa").value +  
              '", "dctamtru":"' + document.querySelector("input.xa1").value +  
              '", "tongiao":"' + document.querySelector("input.tongiao").value +  
              '", "trinhdovh":"' + document.querySelector("input.tdvh").value +
              '", "nghenghiep":"' + document.querySelector("input.nn").value +    
              '"}'
	})
	.then(resp => {
        console.log(resp.status)
		if (resp.status == 200) {
            console.log(resp.status)
			resp.json()
			.then(ret => {
				if (ret.status == "OK") {
					if (ret.data == 1) {
						console.log(ret);
						// Về list-panel
					} else {
						// Không thêm/cập nhật được được
						let txt = (document.querySelector("div.panel-edit input.mode").value == "addnew" ? "thêm" : "cập nhật");
						document.querySelector("div.panel-edit div.err-submit").innerHTML = "Xin lỗi, không " + txt + " được sinh viên!";
					}
				} else {
					// Xử lý lỗi nghiệp vụ	
				}
			});
		} else {
			// Xử lý lỗi HTTP
		}
	});
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
            console.log(ret);
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
					
					document.querySelector("div.tableDSDanSoCaNuoc").style.display="block";
					document.getElementById('BC').style.display = "none";

					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
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
					

					document.querySelector("div.tableDSDanSoTinh").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
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

					document.querySelector("div.tableDSDanSoHuyen").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
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

					document.querySelector("div.tableDSDanSoXa").style.display="block";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep
											);
						tbl.appendChild(r);
					}
				} else if(ret.rights.includes("thon")) {
					let tbl = document.getElementById('dsdan');

					/*Set phần hiện thông tin ACC */
					console.log(ret.tenTK[0]);
					console.log(tbl);
					let hoten = document.createElement("p");
					let loaiTK = document.createElement("p");
					hoten.innerHTML = ret.tenTK[0].name;
					loaiTK.innerHTML = "Tài khoản thôn";
					console.log(hoten);
					document.getElementById("account").appendChild(hoten);
					document.getElementById("account").appendChild(loaiTK);

					document.querySelector("div.tableDSDanSoThon").style.display="block";
					document.getElementById('TQ').style.display = "none";
					document.getElementById('A2').style.display = "none";
					document.getElementById('DS').style.display = "none";
					

					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].cccd, ret.data[i].ten, 
						ret.data[i].ngaysinh, ret.data[i].gioitinh, ret.data[i].quequan, ret.data[i].quequan,
						ret.data[i].dctamtru, ret.data[i].tongiao, ret.data[i].trinhdovh,
						ret.data[i].nghenghiep);
						tbl.appendChild(r);
					}
				}
				else {
					
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