<?php
    namespace qldata\control;
    require_once("server/qldata/model/Ds.php");
	require_once("server/core/model/Util.php");
	require_once("server/account/model/User.php");
	use \core\model\Util as Util;
	use \account\model\User as User;
    
    
    class DsControl{
        public function proc($arr) {
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			//nếu không là acc tổng cục , tỉnh, huyen, xa
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true) && !in_array("huyen", $rights, true) && !in_array("xa", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			
			// Lấy danh sách sinh viên
			if(in_array("tongcuc", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllTinh(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("tinh", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllHuyen(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("huyen", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllXa(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("xa", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllThon(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			}
        }

		/**lấy danh sách dân */
		public function proc1($arr) {
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			//nếu không là acc tổng cục , tỉnh, huyen, xa
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true) 
			&& !in_array("huyen", $rights, true) && !in_array("xa", $rights, true) && !in_array("thon", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			
			// Lấy danh sách sinh viên
			if(in_array("tongcuc", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllDan(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("tinh", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllDanTinh(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("huyen", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllDanHuyen(); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("xa", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllDanXa($_SESSION["tsd"]); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			} else if(in_array("thon", $rights, true)) {
				$std = new \qldata\model\Ds();
				$data = $std->getAllDanThon($_SESSION["tsd"]); //getAll ở Ds
				$tenTK = $std->getName($_SESSION["tsd"]); //getName
				return array("status" => "OK", "data" => $data, "rights" => $rights, "tenTK" => $tenTK);
			}
        }

		/**Kiểm tra xem có hiện nhập liệu k */
		public function quyenNL($arr) {
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			//nếu không là acc tổng cục , tỉnh
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true) && !in_array("huyen", $rights, true) && !in_array("xa", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			
			// Check quyền nhập liệu
			$std = new \qldata\model\Ds();
			$data = $std->getQNL($_SESSION["tsd"]); //getAll ở Ds
			return array("status" => "OK", "data" => $data, "rights" => $rights);
        }

		public function getById($arr) {
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"], "SV");
			if (!in_array("READ", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra hợp thức dữ liệu vào
			if (Util::isStdCode($arr[0])) {
				// Đầu vào hợp lệ
				$std = new \qldt\model\Ds();
		        $data = $std->getById($arr[0]);
				return array("status" => "OK", "data" => $data, "rights" => $rights);
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        }
		
		/**Add account */
		public function addDs($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"], "SV");
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true)
			&& !in_array("huyen", $rights, true) && !in_array("xa", $rights, true)
			)
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isMaTinh($input["tsd"]) || Util::isMaHuyen($input["tsd"]) 
			|| Util::isMaXa($input["tsd"]) || Util::isMaThon($input["tsd"])) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã sinh viên đã được sử dụng chưa
				$data = $std->getTsd($arr[0]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->add($input["tsd"], $input["pass"], $input["quyen"], $input["name"]);
					$std->addQuyen($input["tsd"], $input["pass"], $input["quyen"], $input["name"]);
					$std->addQuyenNL($input["tsd"], "null", "null", "dong");
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		public function addMaTinh($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("tongcuc", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isMaTinh($input["matinh"]) && Util::isText($input["tentinh"]))
			{
				$std = new \qldata\model\Ds();
				// Kiểm tra mã tỉnh đã được sử dụng chưa
				$data = $std->getMaTinh($input["matinh"]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->addMaTinh($input["matinh"], $input["tentinh"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		public function addMaHuyen($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("tinh", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isMaHuyen($input["mahuyen"]) && Util::isText($input["tenhuyen"])) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã huyện đã được sử dụng chưa
				$data = $std->getMaHuyen($input["mahuyen"]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->addMaHuyen($input["mahuyen"], $input["tenhuyen"], $_SESSION["tsd"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		public function addMaXa($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("huyen", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isMaXa($input["maxa"]) && Util::isText($input["tenxa"])) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã xax đã được sử dụng chưa
				$data = $std->getMaXa($input["maxa"]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->addMaXa($input["maxa"], $input["tenxa"], $_SESSION["tsd"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi

					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		public function addMaThon($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("xa", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isMaThon($input["mathon"]) && Util::isText($input["tenthon"])) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã sinh viên đã được sử dụng chưa
				$data = $std->getMaThon($input["mathon"]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->addMaThon($input["mathon"], $input["tenthon"], $_SESSION["tsd"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		public function addNguoiDan($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true)
			&& !in_array("huyen", $rights, true) && !in_array("xa", $rights, true) && !in_array("thon", $rights, true)
			)
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isCCCD($input["cccd"]) && Util::isVietnameseName($input["ten"])
			&& Util::isDate($input["ngaysinh"]) && Utit::isVietnameseName($input["gioitinh"])
			&& Utit::isVietnameseName($input["quequan"]) && Utit::isVietnameseName($input["dctamtru"])
			&& Utit::isVietnameseName($input["tongiao"]) && Utit::isVietnameseName($input["trinhdovh"]) && Utit::isVietnameseName($input["nghenghiep"])) {
				$std = new \qldata\model\Ds();
				// Kiểm tra cccd đã được sử dụng chưa
				$data = $std->getCCCD($arr[0]);
				// Chưa được sử dụng thì mới thêm
				if (count($data) == 0) {
					$c = $std->addNguoiDan($input["cccd"], $input["ten"], $input["ngaysinh"], $input["gioitinh"], $input["quequan"], $input["dctamtru"], $input["tongiao"], $input["trinhdovh"], $input["nghenghiep"],
											$_SESSION["tsd"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		/**Cấp quyền nhập liệu */
		public function capquyen($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true) && !in_array("huyen", $rights, true) && !in_array("xa", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (Util::isDate($input["start"]) && Util::isDate($input["finish"]) && Util::isText($input["moquyen"])) {
				$std = new \qldata\model\Ds();
				// Chưa được sử dụng thì mới thêm
				if (true) {
					$c = $std->updatequyenNL($input["tsd"], $input["start"], $input["finish"], $input["moquyen"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		/**Cấp mã mới cho cấp dưới */
		public function capmamoi($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"], "SV");
			if (!in_array("tongcuc", $rights, true) && !in_array("tinh", $rights, true) && !in_array("huyen", $rights, true) && !in_array("xa", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (true) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã sinh viên đã được sử dụng chưa
				//$data = $std->getById($arr[0]);
				// Chưa được sử dụng thì mới thêm
				if (true) {
					$c = $std->addMaMoi($input["tsd"], $input["ten"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 

		/**Báo cáo xác nhận hoàn thành */
		public function xacnhanBC($arr) {	
			// Chưa đăng nhập thì từ chối
			if (!isset($_SESSION["tsd"])) 
				return array("status" => "NOK", "data" => "ACCESS-DENIED");

			// Kiểm tra quyền truy cập
			$user = new User();
			$rights = $user->accessRights($_SESSION["tsd"]);
			if (!in_array("tinh", $rights, true))
				return array("status" => "NOK", "data" => "ACCESS-DENIED");


			// Kiểm tra hợp thức dữ liệu vào
			$input = json_decode(file_get_contents("php://input"), true);

			// Đầu vào hợp lệ?
			if (true
			) {
				$std = new \qldata\model\Ds();
				// Kiểm tra mã sinh viên đã được sử dụng chưa
				//$data = $std->getById($arr[0]);
				// Chưa được sử dụng thì mới thêm
				if (true) {
					$c = $std->xacnhanBC($input["tiendo"], $_SESSION["tsd"]);
					return array("status" => "OK", "data" => $c);
				} else {
					// Mã sinh viên đã được sử dụng rồi
					return array("status" => "NOK", "data" => "STDCODE-HAS-BEEN-USED");
				}
			} else {
				// Đầu vào không hợp lệ
				return array("status" => "NOK", "data" => "INVALID-INPUT");
			}
        } 
		
		
	
		public function delStd($arr) {
			$std = new \qldt\model\Std();
            $c = $std->del($arr[0]);
			return array("status" => "OK", "data" => $c);
        }

        public function updateStd($arr) {
			$input = json_decode(file_get_contents("php://input"), true);
			$std = new \qldt\model\Std();
			$c = $std->update($input["masv"], $input["hoten"], $input["ngaysinh"], $input["quequan"]);
			return array("status" => "OK", "data" => $c);
        }  
    }
