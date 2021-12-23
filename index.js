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
    var okie = true;
    // Chưa có lỗi gì
    document.getElementById("loi_acc").innerHTML = "";
    document.getElementById("loi_psw").innerHTML = "";
    document.getElementById("loi").innerHTML = "";

    if (document.getElementById("password").value == "") {
        document.getElementById("loi_psw").innerHTML = "Quý vị chưa nhập mật khẩu";
        document.getElementById("password").focus();
        okie = false;
    }
    if (document.getElementById("account").value == "") {
        document.getElementById("loi_acc").innerHTML = "Quý vị chưa nhập tên đăng nhập";
        document.getElementById("account").focus();
        okie = false;
    } else if (checkAcc(document.getElementById("account").value) == false) {
        // console.log(checkAcc(document.getElementById("account").value));
        document.getElementById("loi_acc").innerHTML = "Tên đăng nhập không hợp lệ";
        document.getElementById("account").focus();
        okie = false;
    }
    if (okie == true) {
        fetch("index.php/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: '{"tsd":"' + document.querySelector("input.tsd").value +
                    '","mk":"' + document.querySelector("input.mk").value + '", "loginSubmitted":"1"}'
            })
            .then(resp => {
                if (resp.status == 200) {
                    resp.json()
                        .then(ret => {
                            console.log(ret);
                            if (ret.status == "OK") {
                                if (ret.data == 1) {
                                    // Đăng nhập thành công
                                    console.log("OK");
                                    document.location.href = "client/html/common.html";
                                } else {
                                    // Sai tên đăng nhập hoặc mật khẩu
                                    document.getElementById("loi").innerHTML = "Tên đăng nhập hoặc mật khẩu không đúng.";
                                    document.getElementById("account").focus();
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

}

function checkAcc(acc) {
    var regex1 = /^[0-9]{2}$/;
    var regex2 = /^[0-9]{4}$/;
    var regex3 = /^[0-9]{6}$/;
    var regex4 = /^[0-9]{8}$/;
    if (regex1.test(acc) || regex2.test(acc) || regex3.test(acc) || regex4.test(acc)) {
        return true;
    }
    return false;
}
// document.querySelector("button.submit").onclick = function() {
//     fetch("index.php/login", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: '{"tsd":"' + document.querySelector("input.tsd").value + 
//             '","mk":"' + document.querySelector("input.mk").value + '", "loginSubmitted":"1"}'
//     })
//     .then(resp => {
//         if (resp.status == 200) {
//             resp.json()
//             .then(ret => {
//                 if (ret.status == "OK") {
//                     if (ret.data == 1) {
//                         // Đăng nhập thành công
//                         console.log("OK");
                        
//                         document.location.href = "client/html/common.html";
//                     }
//                     else {
//                         // Sai tên đăng nhập hoặc mật khẩu
//                         //document.querySelector("div.err-submit").classList.remove("nodisplay");
//                     }
//                 } else {
//                     console.log(this);
//                     // Xử lý lỗi HTTP
//                 }
//             });
//         } else {
//             console.log("ERROR");
//             // Xử lý lỗi HTTP
//         }
//     });
// }