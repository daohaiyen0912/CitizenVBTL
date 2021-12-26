// Người dùng bấm nút "Chấp nhận" trên form nhập (thêm mới hoặc chỉnh sửa) cấp mã cấp dưới mới
document.querySelector("button.h-btn-mah").onclick = function() {
    fetch("../../index.php/capmahuyen", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: '{"mahuyen":"' + document.querySelector("input.h-input-mah").value +
                '","tenhuyen":"' + document.querySelector("input.h-input-tenh").value +
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
                                alert("Bạn đã cấp mã huyện thành công");
                                // Về list-panel
                            } else {
                                // Không thêm/cập nhật được được
                                let txt = (document.querySelector("div.panel-edit input.mode").value == "addnew" ? "thêm" : "cập nhật");
                                document.querySelector("div.panel-edit div.err-submit").innerHTML = "Xin lỗi, không " + txt + " được sinh viên!";
                            }
                        } else {
                            // Xử lý lỗi nghiệp vụ	
                            if (ret.data == "STDCODE-HAS-BEEN-USED") {
                                alert("Mã huyện đã được sử dụng rồi");
                            } else {
                                alert("Đầu vào không hợp lệ");
                            }
                        }
                    });
            } else {
                // Xử lý lỗi HTTP
            }
        });
};