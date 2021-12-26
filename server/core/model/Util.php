<?php
    namespace core\model;
   
	class Util {
		public function __construct() {	}
		public function __destruct() {}
		//
		//
		// Kiểm tra một xâu ký tự có phải là tên tỉnh, thành phố hay không 
		// Input: $s
		// Điều kiện: Chỉ bao gồm ký tự chữ cái Latin + Tiếng Việt có dấu và dấu trắng
		//            Bắt đầu là một từ
        public static function isVietnameseName($s) {
			if (strlen($s) == 0) return false;
			if (strlen($s) > 200) return false;
			$c1 = preg_match("/^[a-zA-Záàạảãăắằặẳẵâấầậẩẫéèẹẻẽêếềệểễíìịỉĩóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữ][a-zA-Záàạảãăắằặẳẵâấầậẩẫéèẹẻẽêếềệểễíìịỉĩóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữ\s]*$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}	
		//
		//
		// Kiểm tra một xâu ký tự có phải là mã tỉnh hay không 
		// Input: $s
		// Điều kiện: Mã tỉnh có 2 chữ số
        public static function isMaTinh($s) {
			$c1 = preg_match("/^[0-9]{2}$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}	
		//
		//
		// Kiểm tra một xâu ký tự có phải là mã huyện hay không 
		// Input: $s
		// Điều kiện: Mã huyện có 4 chữ số
        public static function isMaHuyen($s) {
			$c1 = preg_match("/^[0-9]{4}$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}	
		//
		//
		// Kiểm tra một xâu ký tự có phải là mã xã hay không 
		// Input: $s
		// Điều kiện: Mã xã có 6 chữ số
        public static function isMaXa($s) {
			$c1 = preg_match("/^[0-9]{6}$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}
		//
		//
		// Kiểm tra một xâu ký tự có phải là mã xã hay không 
		// Input: $s
		// Điều kiện: Mã thôn có 8 chữ số
        public static function isMaThon($s) {
			$c1 = preg_match("/^[0-9]{8}$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}
		//
		//
		// Kiểm tra một xâu ký tự có phải là cccd hay không 
		// Input: $s
		// Điều kiện: CCCD tối thiểu có 9 số tối đa có 12 số
        public static function isCCCD($s) {
			$c1 = preg_match("/^[0-9]{9, 12}$/", $s);
			if ($c1 == 1) return true;
			else return false;
		}
		
		//
		//
		// Kiểm tra một xâu ký tự có phải là ngày tháng hay không
		// Input: $s = nn/tt/nnnn
		// Điều kiện: Là một ngày có thật trong lịch dương
        public static function isDate($s) {
			// Đúng định dạng nn/tt/nnnn
			$c1 = preg_match("/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/", $s);
			if ($c1 != 1) return false;
			// Ngày có thật?
			$arr = explode("/", $s);
			$ngay = intval($arr[0]);
			$thang = intval($arr[1]);
			$nam = intval($arr[2]);
			if ($ngay < 1 || $ngay > 31) return false;
			if ($thang < 1 || $thang > 12) return false;
			if ($thang == 1 || $thang == 3 || $thang == 5 || $thang == 7 || $thang == 8 || $thang == 10 || $thang == 12) {
				if ($ngay > 31) return false;
			} else if ($thang == 2) {
				if ($nam % 4 == 0 && $nam % 100 != 0) {
					if ($ngay > 29) return false;
				} else if ($ngay > 28) return false;
			} else if ($ngay > 30) return false;
			return true;
		}

		//
		//
		// Chuyển ngày Việt (nn/tt/nnnn) => Anh (nnnn-tt-yy)
		public static function toEnglishDate($s) {
			$arr = explode("/", $s);
			return ($arr[2]."-".$arr[1]."-".$arr[0]);
		}
		

		//
		//
		// Kiểm tra một xâu ký tự có phải là text hay không
		// Input: $s
		// Điều kiện: Chỉ bao gồm các ký tự tiếng Việt và chữ số, dấu -, dấu trắng
        public static function isText($s) {
			$c1 = preg_match("/^[0-9a-zA-Záàạảãăắằặẳẵâấầậẩẫéèẹẻẽêếềệểễíìịỉĩóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữ\s\-]*$/", $s);
			if ($c1 == 1) return true;
			else return false;
		} 
	}
