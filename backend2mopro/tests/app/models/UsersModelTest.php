<?php
namespace Tests\app\models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Models\UsersModel;

class UsersModelTest extends CIUnitTestCase
{
    /**
     * Menguji fungsi generateId pada usersModel
     * php vendor/bin/phpunit --filter testGenerateId tests/app/models/UsersModelTest.php
     * @return void
     * @test
     */
    public function testGenerateId()
    {
        $users_model = new UsersModel();
        $actual = $users_model->generateId();

        $expected = 25;
        d($actual);
        $this->assertIsString($actual);

        $this->assertEquals($expected, strlen($actual));
    }

    /**
     * Menguji bagaimana password diverifikasi untuk login
     * php vendor/bin/phpunit --filter testPassword tests/app/models/UsersModelTest.php
     * @return void
     */
    public function testPassword(){
        $users_model    = new UsersModel();
        $password_db    = $users_model->where("username", "admin")->select("password")->find();
        $input_password = "admin#1234";
        $actual         = password_verify($input_password, $password_db[0]['password']);

        $expected = true;

        d($input_password, $password_db[0]["password"]);

        $this->assertEquals($expected, $actual);
    }

    /**
     * Menguji apakah login berhasil
     * php vendor/bin/phpunit --filter testLogin tests/app/models/UsersModelTest.php
     * @return void
     */
    public function testLogin(){
        $users_model    = new UsersModel();
        $input_password = "admin#1234";
        $get_record     = $users_model->where("username", "admin")->find();

        $expected = true;
        if ($get_record && password_verify($input_password, $get_record[0]['password'])) {
            $actual = true; // Password cocok
        }else{
            $actual = false; // Password cocok
        }
        d($actual, $expected);

        $this->assertEquals($expected, $actual);
    }
}