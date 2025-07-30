# Powershell无法使用npm命令问题
### 问题原因
在 PowerShell 中遇到 PSSecurityException 错误，提示无法使用 npm 命令，通常是由于执行策略限制导致的。

### 解决方法
#### 更改 PowerShell 执行策略
```sh
Set-ExecutionPolicy RemoteSigned
```
这将允许本地脚本运行，但要求从互联网下载的脚本必须是签名的。

- **注意：** 如果你不想更改全局设置，可以只对当前会话进行更改：

```sh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```
重启powershell后即可生效。