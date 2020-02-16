<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function getImage($filename) {
        if($filename == '-')
            $storage_path = storage_path('app/images/noimage.png');
        else
            $storage_path = storage_path('app/images/' . $filename);
        return response()->file($storage_path);
    }
}
