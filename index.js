//đã đăng nhập rồi
fetch("index.php/logged")
.then(resp => {
    if (resp.status == 200) {
        resp.json()
        .then(ret => {
            if (ret.status == "OK") {
                if(ret.data[0] == 1) {
                    document.location.href = "client/html/common.html";
                }
            }
        });
    }
});

//login
document.querySelector("button.submit").onclick = function() {
    fetch("index.php/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: '{"tsd":"' + document.querySelector("input.tsd").value + 
            '","mk":"' + document.querySelector("input.mk").value + '", "loginSubmitted":"1"}'
    })
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
            .then(ret => {
                if (ret.status == "OK") {
                    if (ret.data == 1) {
                        // Đăng nhập thành công
                        console.log("OK");
                        
                        document.location.href = "client/html/common.html";
                    }
                    else {
                        // Sai tên đăng nhập hoặc mật khẩu
                        //document.querySelector("div.err-submit").classList.remove("nodisplay");
                    }
                } else {
                    console.log(this);
                    // Xử lý lỗi HTTP
                }
            });
        } else {
            console.log("ERROR");
            // Xử lý lỗi HTTP
        }
    });
}