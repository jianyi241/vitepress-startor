# CentOS7更换yum源

### 163yum源：
::: tip
使用之前请确保已经安装wget，如未安装请执行下面一条命令来安装 `yum install -y wget`
:::

1.备份当前yum源防止出现意外还可以还原回来
```sh
cd /etc/yum.repos.d/
cp /CentOS-Base.repo /CentOS-Base-repo.bak
```

2.使用wget下载163yum源repo文件
```sh
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
```
3.清理旧包

```sh
yum clean all
```
4.把下载下来163repo文件设置成为默认源
```sh
mv CentOS7-Base-163.repo CentOS-Base.repo
```
5.生成163yum源缓存并更新yum源
```sh
yum makecache
yum update
```
<br>

---

### 阿里云yum源:
> 使用之前请确保已经安装wget，如未安装请执行下面一条命令来安装 yum install -y wget）

1.备份当前yum源防止出现意外还可以还原回来
```sh
cd /etc/yum.repos.d/
cp /CentOS-Base.repo /CentOS-Base-repo.bak
```

2.使用wget下载阿里yum源repo文件
```sh
wget http://mirrors.aliyun.com/repo/Centos-7.repo
```
3.清理旧包

```sh
yum clean all
```
4.把下载下来阿里云repo文件设置成为默认源
```sh
mv Centos-7.repo CentOS-Base.repo
```
5.生成阿里云yum源缓存并更新yum源
```sh
yum makecache
yum update
```

(转载自：https://www.cnblogs.com/tangsong41/p/14441845.html)