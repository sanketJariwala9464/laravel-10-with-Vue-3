<?php

use Illuminate\Support\Facades\Crypt;

if (!function_exists('getMessage')) {
    /**
     * Generate success / error message
     */

    function encryptString($data){
        return Crypt::encryptString($data);
    }

    function decryptString($data){
        return Crypt::decryptString($data);
    }
}