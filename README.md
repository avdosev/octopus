# OCTOPUS
**потому что осьминог** 
## развертка на локалке
LOGININDATABASE='octopusSQL'\
PASSWORD='123456'\
DATABASE='gitsDB'\
HOST='127.0.0.1'

```
create database gitsDB; 
create user 'octopusSQL'@'localhost' identified with mysql_native_password by '123456';
grant all privileges on gitsDB.* to 'octopusSQL'@'localhost';
```