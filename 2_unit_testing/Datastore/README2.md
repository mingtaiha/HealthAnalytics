*Note:* Does not apply for Demo #1

Contents of this folder
datastoreTest.php
processorTest.php
README2.md

PHPUnit is used for unit testing the Datastore and Processor.
Information on installing PHPUnit can be found at:
https://phpunit.de/manual/current/en/installation.html

In order simply testing, both of the test files should be placed into
the same directory as api.php and datastore.php.  This folder should
contain the files:

the directory "model"
api.php
datastore.php
health_stats.php
SE1Exception.php
datastoreTest.php
processorTest.php

Once PHPUnit is properly installed, the syntax for running the tests are:
phpunit datastoreTest.php
phpunit processorTest.php