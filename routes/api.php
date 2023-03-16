<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserContactFormController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {

    Route::post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        
        Route::prefix('admin')->group(function () {
            Route::get('/user-contact-list', [UserContactFormController::class, 'index'])->name('user-contact-form.index');
            Route::get('/user-contact-get/{id}', [UserContactFormController::class, 'get'])->name('user-contact-form.get');
            Route::patch('/user-update-form/{id}', [UserContactFormController::class, 'update'])->name('user-contact-form.update');
            Route::patch('/user-contact-change-status/{id}', [UserContactFormController::class, 'updateStatus'])->name('user-contact-form.updateStatus');
            Route::patch('/user-contact-delete/{id}', [UserContactFormController::class, 'deleteContact'])->name('user-contact-form.deleteContact');
        });
    });

    Route::post('/user-contact-form', [UserContactFormController::class, 'create'])->name('user-contact-form.create');
    Route::post('/unique-email', [UserContactFormController::class, 'uniqueEmail'])->name('user-contact-form.unique-email');
});
