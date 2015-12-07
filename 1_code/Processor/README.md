# Processor

Contents of this directory
api.html (the API instructional file)
api.php
README.md
web.config

Specifications of API server
MySQL version 5.6.21
PHP 5.6.12
IIS 7.5

The extension php_pdo_mysql.dll must be enabled in the PHP.ini config file.

IIS must be configured to allow Friendly URLs. This is accomplished by using the web.config file.
The web.config is placed in the wwwroot folder.  On our server, api.php was placed in the folder
"c:\inetpub\wwwroot\se1".  The web.config file is located "c:\inetpub\wwwroot".  web.config is the 
IIS equivalent of Apache's .htaccess.

There is also a specification for custom headers in the web.config file.  The API implements a 
concept called CORS("Cross-origin resource sharing" :https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
This allows the front ends to make success AJAX calls from different servers. Lines 134-137 in api.php
implement this concept.

In order for proper operation, api.php must be placed into the same directory as:
datastore.php
health_stats.php
SE1Exception.php
the folder "model"
