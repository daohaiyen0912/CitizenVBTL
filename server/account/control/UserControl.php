<?php
namespace account\control;
require_once("server/account/model/User.php");
require_once("server/qldata/model/Ds.php");
use \qldata\model\Ds as Ds;

class UserControl {
	public function __contruct() {}
	public function __destruct() {}
	//
	//
	// Kiểm tra trạng thái người dùng đã đăng nhập hay chưa
	// return 	[1, uname, fullname] nếu người dùng đã đăng nhập
	//			[0, "", ""] nếu ngược lại
	public function hasLogged() {
		$ret = 0;
    	if (isset($_SESSION["tsd"])) {
			$ret = 1;
		return array("status" => "OK", "data" => [$ret, $_SESSION["tsd"], $_SESSION["ht"]]);
		}
	
		return array("status" => "OK", "data" => [$ret, "", ""]);
	}
	//
	//
	// Đăng nhập (xác thực username/password)
	// return 	1 nếu hợp lệ
	//			0 nếu ngược lại
	 public function doLogin() { 
		$ret = 0; 
    	if (isset($_SESSION["tsd"])) $ret = 1;
		else {
			$input = json_decode(file_get_contents("php://input"), true);
			if (isset($input["tsd"]) && 
				isset($input["mk"]) && 
				isset($input["loginSubmitted"]) && 
				$input["loginSubmitted"] == "1")
			{
				$user = new \account\model\User();
				$ds = new Ds();

				$auth = $user->checkAccount($input["tsd"], $input["mk"]);
				$right = $user->accessRights($input["tsd"]);
				$qnl = $ds->getQNL($input["tsd"]);
				if ($auth[0]) {
					// Thiết lập dữ liệu phiên
				    $_SESSION["tsd"] = $input["tsd"];
					$_SESSION["ht"] = $auth[1];
					$ret = 1;
				}
			}
		}
		return array("status" => "OK", "data" => $ret, "right" => $right, "qnl" => $qnl);
   }
	//
	//
	// Đăng xuất
   public function doLogout() {
		unset($_SESSION["tsd"]);
		unset($_SESSION["ht"]);
		return array("status" => "OK", "data" => 1);
   }
}
