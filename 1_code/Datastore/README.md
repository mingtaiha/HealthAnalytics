# Datastore

Contents of this directory
model (directory containing file created by the health model)
database-ddl.sql
database-dml.sql
datastore.php
health_stats.php
README.md
SE1Exception.php

Specifications of API server
MySQL version 5.6.21
PHP 5.6.12
IIS 7.5

The extension php_pdo_mysql.dll must be enabled in the PHP.ini config file.

model
The health model produces these files. They are originally saved in the directory 
"4_data_collection\State_Models". The contents of this directory are copied into the model
folder whenever the model updates itself.

database-dd1.sql
contains SQL commands for creating the database (tables and views). It will create a database named "se1".
(this must be run BEFORE database-dml.sql)

database-dml.sql
contains SQL commands for inserting data into the databae
(this must be run AFTER database-ddl.sql)

health_stats.php
Please open health_stats.php for more information

SE1Exemption.php
A customized execption class used for generating HTTP error codes.

In order for proper operation, datastore.php must be placed into the same directory as:
api.php
health_stats.php
SE1Exception.php
the folder "model"