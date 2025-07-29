# CentOS安装MySQL5遇到的的一些问题
好久没在linux上安装过mysql了，最近安装使用遇到一些问题，记录一下。

##  mysql启动成功，可是远程无法连接，navicat测试连接，测试超时，暂时能想到的就是防火墙问题，因为部署web代码时遇到过一次了，问了下AI:
### 1. 检查SQL配置文件
确认 MySQL 配置文件（通常是 /etc/my.cnf 或 /etc/my.cnf.d/mysqld.cnf）中的绑定地址设置。确保 bind-address 配置项设置为 0.0.0.0 或服务器的 IP 地址，以允许外部连接：
```sh
[mysqld]
bind-address = 0.0.0.0
```

### 2. 检查防火墙设置
如果防火墙正在运行，它可能会阻止 MySQL 的默认端口（3306）的访问。使用以下命令检查防火墙状态：
```sh
sudo firewall-cmd --state
```
如果防火墙已启用，可以使用以下命令允许 MySQL 端口：
```sh
sudo firewall-cmd --add-service=mysql --permanent
sudo firewall-cmd --reload
```
### 3.检查 SELinux 设置
如果启用了 SELinux，它也可能会阻止 MySQL 连接。可以暂时将 SELinux 设置为宽松模式，以测试是否是 SELinux 导致的问题：
```sh
sudo setenforce 0
```
要永久更改 SELinux 设置，需要编辑 /etc/selinux/config 文件并将 SELINUX=enforcing 更改为 SELINUX=permissive，然后重启系统。

## 通常的问题一般情况下是防火墙导致的，关闭防火墙
仍然无法连接，不过这个给出了提示："not allowed connect"，mysql权限问题，修改权限让远程可连接mysql:
### 确认用户权限
首先，登录到 MySQL，查看 root 用户或其他用户的权限：
```sh
mysql -u root -p
```
然后运行以下 SQL 查询来检查用户的主机限制：
```sql
SELECT User, Host FROM mysql.user;
```
#### 此时发现无法执行sql，提示：`ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.`意思是需要先将临时密码修改才行，修改临时密码：<br>

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123123';
```
#### 执行sql提示：`ERROR 1819 (HY000): Your password does not satisfy the current policy requirements`，大概意思是不合规，经查，在mysql5.7之后，密码必须遵循最新的密码策略，要求使用强密码，否则无法更改，规则为：
1. 长度：密码通常需要至少 8 个字符。
2. 字符类型：
    - 至少包含一个小写字母（a-z）。
    - 至少包含一个大写字母（A-Z）。
    - 至少包含一个数字（0-9）。
    - 至少包含一个特殊字符（如 !@#$%^&*() 等）。
3. 不应包含用户的用户名：密码不能包含与用户名称相同的部分。

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '复杂密码!';
```
现在就可以连接成功了。