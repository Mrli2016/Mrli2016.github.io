---
title: ntp客户端配置流程(2021最新版本)
date: 2021-11-02
categories: 
 - 系统
tags:
 - linux
 - ntp
---

## 前言
最新版本的ntp配置变化了很多，找了一些文档，全是乱七八糟的文章内容（万恶的X度），踩了不少坑最后才配置好。

## 安装ntp
首先安装ntp同步工具
```sh
sudo apt install ntp ntpdate -y
```

## 修改时区
```
timedatectl set-timezone Asia/Shanghai
```

## 配置ntp同步服务器
打开ntp配置文件:
```
sudo vim /etc/ntp.conf
```
找到下方的位置行，大概在20行，将它们注释掉：
```
#pool 0.ubuntu.pool.ntp.org iburst
#pool 1.ubuntu.pool.ntp.org iburst
#pool 2.ubuntu.pool.ntp.org iburst
#pool 3.ubuntu.pool.ntp.org iburst
```
接下来添加你们想要同步的目标服务器，例如我有个时间服务器配置到了ip为`192.168.98.180`上：
```
server 192.168.98.180 iburst
```
后面加`iburst`是为了能在启动的时候能先同步一次，而不用等待第一个时间周期后才进行同步处理。
如果你还想增加一个备用的时间服务器可以在后面继续添加一个，这个顺序很重要，排到前面的优先级高，例如：
```
# 主时间服务地址
server 192.168.98.180 iburst
# 备用时间服务地址
server ntp.ubuntu.com
```

## 查看同步效果
可以通过`ntpq -q`命令来查看：
```
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
xminieye.lan     LOCAL(0)         6 u   45   64  377    0.442   29.413   5.080
xchilipepper.can 145.238.203.14   2 u   42   64  377  290.323  1095849  24.501

```
### 表头
* remote – 用于同步的远程节点或服务器。“LOCAL”表示本机 （当没有远程服务器可用时会出现）
* refid – 远程的服务器进行同步的更高一级服务器
* st – 远程节点或服务器的 Stratum（级别，NTP 时间同步是分层的）
* t – 类型 (u: unicast（单播） 或 manycast（选播） 客户端, b: broadcast（广播） 或 multicast（多播） 客户端, l: 本地时钟, s: 对称节点（用于备份）, A: 选播服务器, B: 广播服务器, M: 多播服务器, 参见“Automatic Server Discovery“)
* when – 最后一次同步到现在的时间 (默认单位为秒, “h”表示小时，“d”表示天)
* poll – 同步的频率：rfc5905建议在 NTPv4 中这个值的范围在 4 (16秒) 至 17 (36小时) 之间（即2的指数次秒），然而观察发现这个值的实际大小在一个小的多的范围内 ：64 (26 )秒 至 1024 (210 )秒
* reach – 一个8位的左移移位寄存器值，用来测试能否和服务器连接，每成功连接一次它的值就会增加，以 8 进制显示
* delay – 从本地到远程节点或服务器通信的往返时间（毫秒）
* offset – 主机与远程节点或服务器时间源的时间偏移量，offset 越接近于0，主机和 NTP 服务器的时间越接近(以方均根表示，单位为毫秒)
* jitter – 与远程节点同步的时间源的平均偏差（多个时间样本中的 offset 的偏差，单位是毫秒），这个数值的绝对值越小，主机的时间就越精确

### remote的状态标识
第一列中的第一个字符是状态标识（参见 Peer Status Word），包含 " "，"x"，"-"，"#"，"+"，"*"，"o"。
* " " – 无状态，表示:没有远程通信的主机，LOCAL" 即本机，（未被使用的）高层级服务器，远程主机使用的这台机器作为同步服务器
* “x” – 已不再使用
* “-” – 已不再使用
* “#” – 良好的远程节点或服务器但是未被使用 （不在按同步距离排序的前六个节点中，作为备用节点使用）
* “+” – 良好的且优先使用的远程节点或服务器（包含在组合算法中）
* “*” – 当前作为优先主同步对象的远程节点或服务器
* “o” – PPS 节点 (当优先节点是有效时)。实际的系统同步是源于秒脉冲信号（pulse-per-second，PPS），可能通过PPS 时钟驱动或者通过内核接口。

### refid的含义
* 一个IP地址 – 远程节点或服务器的 IP 地址
* .LOCL. – 本机 (当没有远程节点或服务器可用时）
* .PPS. – 时间标准中的“Pulse Per Second”（秒脉冲）
* .IRIG. – Inter-Range Instrumentation Group 时间码
* .ACTS. – 美国 NIST 标准时间 电话调制器
* .NIST. –美国 NIST 标准时间电话调制器
* .PTB. – 德国 PTB 时间标准电话调制器
* .USNO. – 美国 USNO 标准时间 电话调制器
* .CHU. – CHU (HF, Ottawa, ON, Canada) 标准时间无线电接收器
* .DCFa. – DCF77 (LF, Mainflingen, Germany) 标准时间无线电接收器
* .HBG. – HBG (LF Prangins, Switzerland) 标准时间无线电接收器
* .JJY. – JJY (LF Fukushima, Japan) 标准时间无线电接收器
* .LORC. – LORAN-C station (MF) 标准时间无线电接收器，注： 不再可用 (被 eLORAN 废弃)
* .MSF. – MSF (LF, Anthorn, Great Britain) 标准时间无线电接收器
* .TDF. – TDF (MF, Allouis, France)标准时间无线电接收器
* .WWV. – WWV (HF, Ft. Collins, CO, America) 标准时间无线电接收器
* .WWVB. – WWVB (LF, Ft. Collins, CO, America) 标准时间无线电接收器
* .WWVH. – WWVH (HF, Kauai, HI, America) 标准时间无线电接收器
* .GOES. – 美国静止环境观测卫星;
* .GPS. – 美国 GPS;
* .GAL. – 伽利略定位系统欧洲 GNSS;
* .ACST. – 选播服务器
* .AUTH. – 认证错误
* .AUTO. – Autokey （NTP 的一种认证机制）顺序错误
* .BCST. – 广播服务器
* .CRYPT. – Autokey 协议错误
* .DENY. – 服务器拒绝访问;
* .INIT. – 关联初始化
* .MCST. – 多播服务器
* .RATE. – (轮询) 速率超出限定
* .TIME. – 关联超时
* .STEP. – 间隔时长改变，偏移量比危险阈值小(1000ms) 比间隔时间 (125ms)大

## 常见场景问题
### 1、第一优先级的时间服务器无法访问，它会自动选择备用服务器继续同步吗？
答：会的
### 2、第一优先级的时间服务器恢复后，它会自动从备用服务器切换回第一优先级的服务器吗？
答：并不会，需要重启`ntp`服务，重新进行同步：`sudo systemctl restart ntp`