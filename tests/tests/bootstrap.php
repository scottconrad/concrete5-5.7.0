<?php
/**
 * @author Andrew Embler
 */

// testing credentials
define('DB_USERNAME', 'phpunitTesting');
define('DB_PASSWORD', 'phpunitTesting');
define('DB_DATABASE', 'phpunitTesting');
define('DB_SERVER', 'localhost');

// support classes for tests
require realpath(dirname(__FILE__) . '/ConcreteDatabaseTestcase.php');

// error reporting
PHPUnit_Framework_Error_Notice::$enabled = FALSE;
error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);


define('DIR_BASE', realpath(dirname(__FILE__) . '/../../web'));
$DIR_BASE_CORE = realpath(dirname(__FILE__) . '/../../web/concrete');

require $DIR_BASE_CORE . '/bootstrap/configure.php';

/**
 * Include all autoloaders
 */
require $DIR_BASE_CORE . '/bootstrap/autoload.php';

/**
 * Begin concrete5 startup.
 */
$cms = require $DIR_BASE_CORE . '/bootstrap/start.php';



/** 
 * Kill this because it plays hell with phpunit.
 */
unset($cms);