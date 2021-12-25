<?php
    namespace qldata\model;
    require_once("server/core/model/PDOData.php");
          
    class Ds{
        private $db;
        public function __construct() { $this->db = new \core\model\PDOData();}
        public function __destruct() { $this->db = null;}
	
        public function getAllTinh() {
            return $this->db->doPreparedQuery("select * from trunguong;", array());
        }
        public function getAllHuyen() {
            return $this->db->doPreparedQuery("select * from captinh;", array());
        }
        public function getAllXa() {
            return $this->db->doPreparedQuery("select * from caphuyen;", array());
        }
        public function getAllThon() {
            return $this->db->doPreparedQuery("select * from capxa;", array());
        }
        public function getQNL($tsd) {
            return $this->db->doPreparedQuery("select * from capquyen where tsd = ?;", array($tsd));
        }
		public function getById($m) {
            return $this->db->doPreparedQuery("select * from sinhvien where masv = ?;", array($m));
        }
        /**Add vô acc */
		public function add($m, $ht, $ns, $qq) {
            return $this->db->doPreparedSql("insert into tongcucacc(tsd, pass, quyen, name) values(?, ?, ?, ?);", array($m, $ht, $ns, $qq));
        }
        /**Thêm quyền cho acc */
        public function addQuyen($tsd, $pass, $quyen, $name) {
            return $this->db->doPreparedSql("insert into quyensd(tsd, tainguyen, quyen) values(?, ?, ?);", array($tsd, "SV", $quyen));
        }
        /**Add vô bảng quyền nhập liệu */
        public function addquyenNL($tsd, $start, $finish, $moquyen) {
            return $this->db->doPreparedSql("insert into capquyen(tsd, start, finish, moquyen) values(?, ?, ?, ?);", array($tsd, $start, $finish, $moquyen));
        }
        /**Add vô bảng mã các cấp*/
        public function addMaMoi($tsd, $ten) {
            return $this->db->doPreparedSql("insert into tongcucacc(tsd, pass, quyen, name) values(?, ?, ?, ?);", array($tsd, "pass", "quyen", "name"));
        }

        public function addMaTinh($matinh, $ten) {
            return $this->db->doPreparedSql("insert into trunguong(matinh, tentinh) values(?, ?);", array($matinh, $ten));
        }

        public function addMaHuyen($mahuyen, $ten, $matinh) {
            return $this->db->doPreparedSql("insert into captinh(mahuyen, tenhuyen, matinh) values(?, ?, ?);", array($mahuyen, $ten, $matinh));
        }

        public function addMaXa($maxa, $ten, $mahuyen) {
            return $this->db->doPreparedSql("insert into caphuyen(maxa, tenxa, mahuyen) values(?, ?, ?);", array($maxa, $ten, $mahuyen));
        }

        public function addMaThon($mathon, $ten, $maxa) {
            return $this->db->doPreparedSql("insert into capxa(mathon, tenthon, maxa) values(?, ?, ?);", array($mathon, $ten, $maxa));
        }

        public function addNguoiDan($cccd, $ten, $ngaysinh, $gioitinh, $quequan, $dctamtru, $tongiao, $trinhdovh, $nghenghiep, $mathon) {
            return $this->db->doPreparedSql("insert into dan(cccd, ten, ngaysinh, gioitinh, quequan, dctamtru, tongiao, trinhdovh, nghenghiep, mathon) 
                                            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", array($cccd, $ten, $ngaysinh, $gioitinh, $quequan, $dctamtru, $tongiao, $trinhdovh, $nghenghiep, $mathon));
        }

		public function del($m) {
            return $this->db->doPreparedSql("delete from sinhvien where masv = ?;", array($m));
        }
		public function update($m, $ht, $ns, $qq) {
            return $this->db->doPreparedSql("update sinhvien set hoten = ?, ngaysinh = ?, quequan = ? where masv = ?;", array($ht, $ns, $qq, $m));
        }
    }         
