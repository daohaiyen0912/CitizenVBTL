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

function CapMaTinh() {
    document.getElementById("popupmatinh").style.display = "block";
}
function CapMaHuyen() {
    document.getElementById("popupmahuyen").style.display = "block";
}
function CapMaXa() {
    document.getElementById("popupmaxa").style.display = "block";
}
function CapMaThon() {
    document.getElementById("popupmathon").style.display = "block";
}

function HuyCapMa() {
    document.getElementById("popupmatinh").style.display = "none";
	document.getElementById("popupmahuyen").style.display = "none";
	document.getElementById("popupmaxa").style.display = "none";
	document.getElementById("popupmathon").style.display = "none";
}

// Cấp tài khoản
function CapTK() {
    document.getElementById("popuptaikhoan").style.display = "block";
}


function HuyCapTK() {
    document.getElementById("popuptaikhoan").style.display = "none";
}

/*Cấp quyền*/
document.querySelector("button.btnTU").onclick = function() {
	fetch("../../index.php/capquyen/" + document.querySelector("input.tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.tsd").value + 
			'","start":"' + document.querySelector("input.start").value +
             '", "finish":"' + document.querySelector("input.finish").value +
              '", "moquyen":"' + "mo" + '"}'
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
}

/**Cấp quyền của tài khoản tỉnh */
document.querySelector("button.btnT").onclick = function() {
	fetch("../../index.php/capquyen/" + document.querySelector("input.tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.tsd").value + 
			'","start":"' + document.querySelector("input.start").value +
             '", "finish":"' + document.querySelector("input.finish").value +
              '", "moquyen":"' + "mo" + '"}'
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
}

/**Cấp quyền của tài khoản cấp huyện */
document.querySelector("button.btnH").onclick = function() {
	fetch("../../index.php/capquyen/" + document.querySelector("input.tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.tsd").value + 
			'","start":"' + document.querySelector("input.start").value +
             '", "finish":"' + document.querySelector("input.finish").value +
              '", "moquyen":"' + "mo" + '"}'
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
}
/**Cấp quyền của tài khoản cấp xã */
document.querySelector("button.btnX").onclick = function() {
	fetch("../../index.php/capquyen/" + document.querySelector("input.tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.tsd").value + 
			'","start":"' + document.querySelector("input.start").value +
             '", "finish":"' + document.querySelector("input.finish").value +
              '", "moquyen":"' + "mo" + '"}'
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
}



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
					let tbl = document.getElementById('dscanbotinh');
					console.log(tbl);
					document.querySelector("div.canbotrunguong").style.display="block";
					document.querySelector("button.btnTU").style.display="inline";
					document.querySelector("input.h-quyen").value="tinh";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].matinh, ret.data[i].tentinh, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
				} else if(ret.rights.includes("tinh")) {
					let tbl = document.getElementById('dscanbohuyen');
					console.log(tbl);
					document.querySelector("div.canbotinh").style.display="block";
					document.querySelector("button.btnT").style.display="inline";
					document.querySelector("input.h-quyen").value="huyen";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].mahuyen, ret.data[i].tenhuyen, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
				} else if(ret.rights.includes("huyen")) {
					let tbl = document.getElementById('dscanboxa');
					document.querySelector("div.canbohuyen").style.display="block";
					document.querySelector("button.btnH").style.display="inline";
					document.querySelector("input.h-quyen").value="xa";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].maxa, ret.data[i].tenxa, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
				}
				else if(ret.rights.includes("xa")) {
					let tbl = document.getElementById('dscanbothon');
					document.querySelector("div.canboxa").style.display="block";
					document.querySelector("button.btnX").style.display="inline";
					document.querySelector("input.h-quyen").value="thon";
					for (let i = 0; i < ret.data.length; i++) {
						let r = createNewRow((i+1).toString(), ret.data[i].mathon, ret.data[i].tenthon, ret.data[i].sodan, ret.data[i].tiendo);
						tbl.appendChild(r);
					}
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
