<?php
    namespace fallback\control;
    
    class FallbackControl {
        public function proc($arr) {
            return array("status" => "ERR", "data" => "ACTION-NOT-FOUND"); 
        }
    }
