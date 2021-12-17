<?php
namespace account\model;
require_once("server/core/model/PDOData.php");

class User {
	private $db;
    public function __construct() { $this->db = new \core\model\PDOData();}
    public function __destruct() { $this->db = null;}
    //
	//
	// Xác thực username/password
	// return true/false + họ tên người dùng đăng nhập thành công 
    public function checkAccount($u, $p) {
        $data = $this->db->doPreparedQuery("select * from nsd where tsd like ? and mk like password(?);", array($u, $p));
     	// Thành công
        if (count($data) > 0) {
            return [true, $data[0]["ht"]];
        }
        // không thành công
        return [false, ""];
    }
	//
	//
	// Kiểm tra quyền truy cập
	// Input: user, resource
	// return Danh sách quyền 
    public function accessRights($user, $resource) {
        $data = $this->db->doPreparedQuery("select quyen from quyensd where tsd like ? and tainguyen like ?;", array($user, $resource));
		$ret = array();
		foreach ($data as $item)
			array_push($ret, $item["quyen"]);
        return $ret;
    }
}
