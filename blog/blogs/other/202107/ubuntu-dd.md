---
title: Ubuntu20.04通过dd备份系统镜像
date: 2021-07-10
categories: 
 - 系统
tags:
 - 工具
 - 系统
---

## 备份
首先使用fdisk 先查看磁盘分区
```
sudo fdisk -u -l
```
例如我这边的输出结果是：
```
......

Disk /dev/mmcblk0: 29.74 GiB, 31914983424 bytes, 62333952 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 9C9A7D47-E91A-4255-8E62-5C9E9288598A

Device           Start      End  Sectors  Size Type
/dev/mmcblk0p1    2048  1050623  1048576  512M EFI System
/dev/mmcblk0p2 1050624 28375848 27325225   13G Linux filesystem


Disk /dev/sdb: 29.83 GiB, 32010928128 bytes, 62521344 sectors
Disk model: Storage Device  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 9C9A7D47-E91A-4255-8E62-5C9E9288598A

Device       Start      End  Sectors  Size Type
/dev/sdb1     2048  1050623  1048576  512M EFI System
/dev/sdb2  1050624 62519295 61468672 29.3G Linux filesystem
```

里面的`/dev/mmcblk0`就是我的系统盘，`/dev/sdb`是我的备份U盘，而我需要做的就是将其中的`/dev/mmcblk0p2`备份到`/dev/sdb2`。

这里需要注意下，我看到很多文章都没提到，如果你直接用这两个磁盘名字去备份的话，会找不到`/dev/sdb2`这个文件路径，原因是没有挂载这个硬盘，所以我们还得手动将这个目标磁盘挂载到系统文件下面。

> 注意：`/dev/mmcblk0`跟`/dev/sdb2`只是我这边的磁盘名字，遇到的硬盘名都不一定相同。

### 挂载备份盘
1、创建挂载文件名，这里建议在`/media`路径下创建：
```
sudo mkdir /media/bk
```
2、挂载硬盘
```
sudo mount /dev/sdb2 /media/bk
```

这里的备份分全盘备份、分区备份和压缩备份，按个人需求进行选择备份方式。

### 1、全盘备份
对整个硬盘进行全盘复制，并不会跳过磁盘未使用的空间。一定要确保输出目标容量比原来的磁盘文件大。
```
dd if=/dev/mmcblk0p2  of=/media/bk
```
输出目标还可以保存为img文件：
```
sudo dd if=/dev/mmcblk0p2 of=/media/bk/ubuntu.img
```

### 2、分区备份
指明备份块的大小和数量，进行分区备份，这样的话就不会将空白空间也拷贝进去。
```
dd bs=512 count=[fdisk命令中最大的end数+1] if=/dev/mmcblk0p2 of=dev/sdb2/disk1.img
# 如：dd bs=512 count=15002048 if=/dev/mmcblk0p2 of=/media/bk/ubuntu.img
```

### 查看备份进度
当你输入备份命令后，命令行会一直被阻塞而没有任何提示，这样的话不太友好。如果你是通过远程备份系统镜像的话，可以另外开个命令行窗口，对进度进行监听：
```
sudo watch -n 5 killall -USR1 dd
#（注：killall并不是传说中把进程kill掉，而是发送一个指定的信号到指定的进程）
```
然后切换回之前的命令行窗口，就能看到备份情况了

### 备份完成
取消挂载文件
```
sudo umount /media/bk
```

## 还原
还原的过程就是将目标调换一下：
```
dd if=ubuntu.img of=/dev/sda
```
找个备份好的linux，然后将这个系统镜像写入到新硬盘中。

### 遇到的坑
我在新的系统中遇到了无法正常初始化网卡的问题，通过`ifconfig`命令只能看到`lo`的本地网卡，没看到其他网卡信息。
其实是能看到的，只要加个`-a`就出现了：
```
ifconfig -a
```
然后启动你想要的网卡：
```
ifconfig 网卡名 up
```
启动后就能正常看到了，再通过`ifconfig`就能看到该网卡信息。
但只是启动了网卡还不行，还需要给它配置网络。这个在Ubuntu20.04中可以通过`netplan`来管理网络配置，配置文件位于`/etc/netplan/*`，里面的配置文件通过开头数字来覆盖，所以只要改其中权重最大的配置文件就可以了。
最简单的配置项：
```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
```

最后重启网络`sudo netplan apply`
