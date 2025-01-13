<?php
namespace Tests\app\models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Libraries\Utilities;

class UtilitiesTest extends CIUnitTestCase
{
    /**
     * Menguji fungsi generateId pada Utilies
     * php vendor/bin/phpunit --filter testGenerateId tests/app/libraries/UtilitiesTest.php
     * @return void
     * @test
     */
    public function testGenerateId()
    {
        $Utilities = new Utilities();
        $actual = $Utilities->generateId();

        $expected = 25;
        d($actual);
        $this->assertIsString($actual);

        $this->assertEquals($expected, strlen($actual));
    }

}