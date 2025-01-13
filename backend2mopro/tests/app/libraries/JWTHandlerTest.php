<?php
namespace Tests\app\models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Libraries\JWTHandler;

class JWTHandlerTest extends CIUnitTestCase
{
    /**
     * Menguji fungsi generateId pada Utilies
     * php vendor/bin/phpunit --filter testGenerateId tests/app/libraries/UtilitiesTest.php
     * @return void
     * @test
     */
    public function testGenerateId()
    {
        $jwt_handler = new JWTHandler();
        $actual = $jwt_handler->generateToken(['user_id' => "123", "username" => "admin"]);

        $expected = 25;
        d($actual);
        $this->assertIsString($actual);

        $this->assertEquals($expected, strlen($actual));
    }

}