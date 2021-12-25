<?php
    namespace qldata\model;
    require_once("server/core/model/PDOData.php");
          
    class Ds{
        private $db;
        public function __construct() { $this->db = new \core\model\PDOData();}
        public function __destruct() { $this->db = null;}
	
        public function getAllTinh() {
            // return $this->db->doPreparedQuery("select * from trunguong;", array());
            return $this->db->doPreparedQuery("SELECT matinh, tentinh, sodan, (SELECT name from tongcucacc t WHERE t.tsd = tu.matinh) as hotencb, (SELECT start from capquyen cq WHERE cq.tsd = tu.matinh) as start,
            (SELECT finish from capquyen cq WHERE cq.tsd = tu.matinh) as end, tiendo, (SELECT moquyen from capquyen cq WHERE cq.tsd = tu.matinh) as moquyen
            FROM trunguong tu;", array());
        }
        public function getAllHuyen() {
            return $this->db->doPreparedQuery("SELECT mahuyen, tenhuyen, sodan, (SELECT name from tongcucacc t WHERE t.tsd = ct.mahuyen) as hotencb, (SELECT start from capquyen cq WHERE cq.tsd = ct.mahuyen) as start,
            (SELECT finish from capquyen cq WHERE cq.tsd = ct.mahuyen) as end, tiendo, (SELECT moquyen from capquyen cq WHERE cq.tsd = ct.mahuyen) as moquyen
            FROM captinh ct;", array());
        }
        public function getAllXa() {
            return $this->db->doPreparedQuery("SELECT maxa, tenxa, sodan, (SELECT name from tongcucacc t WHERE t.tsd = ch.maxa) as hotencb, (SELECT start from capquyen cq WHERE cq.tsd = ch.maxa) as start,
            (SELECT finish from capquyen cq WHERE cq.tsd = ch.maxa) as end, tiendo, (SELECT moquyen from capquyen cq WHERE cq.tsd = ch.maxa) as moquyen
            FROM caphuyen ch;", array());
        }
        public function getAllThon() {
            return $this->db->doPreparedQuery("SELECT mathon, tenthon, sodan, (SELECT name from tongcucacc t WHERE t.tsd = cx.mathon) as hotencb, (SELECT start from capquyen cq WHERE cq.tsd = cx.mathon) as start,
            (SELECT finish from capquyen cq WHERE cq.tsd = cx.mathon) as end, tiendo, (SELECT moquyen from capquyen cq WHERE cq.tsd = cx.mathon) as moquyen
            FROM capxa cx;", array());
        }
        public function getQNL($tsd) {
            return $this->db->doPreparedQuery("select * from capquyen where tsd = ?;", array($tsd));
        }
		public function getById($m) {
            return $this->db->doPreparedQuery("select * from sinhvien where masv = ?;", array($m));
        }
        /**Lấy tên TK đang đăng nhập */
        public function getName($tsd) {
            return $this->db->doPreparedQuery("select name from tongcucacc where tsd = ?;", array($tsd));
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
        //update quyền nhập liệu
        public function updatequyenNL($tsd, $start, $finish, $moquyen) {
            return $this->db->doPreparedSql("UPDATE capquyen SET finish = ?, start = ?, moquyen = ? WHERE tsd = ?;", array($finish, $start, $moquyen, $tsd));
        }
        //update quyền nhập liệu
        public function xacnhanBC($tiendo, $matinh) {
            return $this->db->doPreparedSql("UPDATE trunguong SET tiendo = ? WHERE matinh = ?;", array($tiendo, $matinh));
        }

        //lấy dữ liệu dân
        public function getAllDanThon($mathon) {
            return $this->db->doPreparedQuery("select * from dan where mathon = ?;", array($mathon));
        }
        public function getAllDanXa($maxa) {
            return $this->db->doPreparedQuery("SELECT * FROM dan d JOIN capxa cx ON cx.mathon = d.mathon WHERE cx.maxa = ?;", array($maxa));
        }
    }         
