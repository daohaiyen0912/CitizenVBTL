// Người dùng bấm nút "Chấp nhận" trên form nhập (thêm mới hoặc chỉnh sửa)
document.querySelector("button.h-btn-capma").onclick = function() {
	fetch("../../index.php/capmatinh/" + document.querySelector("input.h-tsd").value, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: '{"tsd":"' + document.querySelector("input.h-tsd").value + 
			'","pass":"' + document.querySelector("input.h-pass").value +
             '", "quyen":"' + document.querySelector("input.h-quyen").value +
              '", "name":"' + document.querySelector("input.h-name").value + '"}'
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