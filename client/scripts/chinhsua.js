document.querySelector(button.detailDanSo).onclick = function() {

}
function chinhsua() {
    fetch("../../index.php/updatedulieu", {
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
}