// Người dùng bấm nút "Chấp nhận" trên form nhập (thêm mới hoặc chỉnh sửa) cấp mã cấp dưới mới
document.querySelector("button.h-btn-ma").onclick = function() {
	fetch("../../index.php/capmatinh", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"matinh":"' + document.querySelector("input.h-input-ma").value + 
			'","tentinh":"' + document.querySelector("input.h-input-ten").value +
            '", "pass":"' + "pass" +
             '", "quyen":"' + "tinh" +
              '", "name":"' + "name" + '"}'
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

// Người dùng bấm nút "Chấp nhận" trên form nhập (thêm mới hoặc chỉnh sửa) cấp tài khoản mới
document.querySelector("button.h-btn-tk").onclick = function() {
	fetch("../../index.php/capmatinh/" + document.querySelector("input.h-tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.h-tsd").value + 
			'","pass":"' + document.querySelector("input.h-pass").value +
             '", "quyen":"' + document.querySelector("input.h-quyen").value +
              '", "name":"' + "name" + '"}'
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