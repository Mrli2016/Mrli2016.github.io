(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{530:function(s,e,a){s.exports=a.p+"assets/img/gpsmon.6507b4b6.png"},560:function(s,e,a){"use strict";a.r(e);var n=a(6),t=Object(n.a)({},(function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"gps模块输出哪些位置信息"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#gps模块输出哪些位置信息"}},[s._v("#")]),s._v(" GPS模块输出哪些位置信息？")]),s._v(" "),n("p",[s._v("GPS定位模块定位之后会输出位置信息，也就是工程师说的定位语句信息。GPS定位信息串行输出格式大多采用美国国家海洋电子协会制定的NMEA-0183 通信标准格式。其输出数据采用的是ASCII码，内容包含了纬度、经度、高度、速度、日期、时间、航向以及卫星状况等信息，常用语句有6 种，包括GGA、GLL、GSA、GSV、RMC 和 VTG。")]),s._v(" "),n("p",[s._v("NMEA-0183的数据信息有十几种，这些信息的作用分别是：$GPGGA：输出GPS的定位信息；$GPGSA：输出卫星DOP值信息；$GPGSV：输出可见的卫星信息；$GPRMC：输出最小数据量的GPS信息；$GPVTG：地面速度信息；$GPGLL：输出大地坐标信息；$GPZDA：输出UTC时间信息；$GPGST：输出定位标准差信息；$GPALM：输出卫星星历信息；")]),s._v(" "),n("p",[s._v("具体含义可看：https://www.eecis.udel.edu/~mills/ntp/html/drivers/driver20.html")]),s._v(" "),n("h2",{attrs:{id:"查看gps设备"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看gps设备"}},[s._v("#")]),s._v(" 查看GPS设备")]),s._v(" "),n("p",[s._v("gps 设备节点："),n("code",[s._v("/dev/gpsX")]),s._v("\nPPS 设备节点： "),n("code",[s._v("/dev/pps0")]),s._v("\nSysfs文件节点: "),n("code",[s._v("/sys/class/pps/pps0/")])]),s._v(" "),n("p",[s._v("每当GPS的PPS过来后，会在对应的GPIO下降沿时会产生一个中断信号，此时也会产生一个timestamp时间戳，通过如下命令查看：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$cat /sys/class/pps/pps0/assert \n1662522391.694739876#6707\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("如果"),n("code",[s._v("PPS sysfs")]),s._v("和"),n("code",[s._v("dev")]),s._v("节点未出现则排查模块安装是否正确、信号接收是否正常。")]),s._v(" "),n("blockquote",[n("p",[s._v("A pulse per second (PPS or 1PPS) is an electrical signal that has a width of less than one second and a sharply rising or abruptly falling edge that accurately repeats once per second. PPS signals are output by radio beacons, frequency standards, other types of precision oscillators and some GPS receivers.Precision clocks are sometimes manufactured by interfacing a PPS signal generator to processing equipment that aligns the PPS signal to the UTC second and converts it to a useful display. Atomic clocks usually have an external PPS output, although internally they may operate at 9,192,631,770 Hz. PPS signals have an accuracy ranging from a 12 picoseconds to a few microseconds per second, or 2.0 nanoseconds to a few milliseconds per day based on the resolution and accuracy of the device generating the signal.")])]),s._v(" "),n("blockquote",[n("p",[s._v("每秒脉冲(PPS或1PPS)是一种宽度小于一秒的电子信号，其下降沿或上升沿以精确的时间每秒重复一次。PPS信号由无线电信标、频率标准、其他类型的精密振荡器和一些GPS接收机输出。精密时钟有时是通过将PPS信号发生器连接到处理设备来制造的，处理设备将PPS信号校准到UTC秒，并将其转换为有用的显示。原子钟通常有外部PPS输出，但内部可能运行在9192631770赫兹。根据产生信号的设备的分辨率和精度，PPS信号的精度范围在12皮秒到几微秒之间，或者每天2.0纳秒到几毫秒之间。")])]),s._v(" "),n("h2",{attrs:{id:"查看信号"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看信号"}},[s._v("#")]),s._v(" 查看信号")]),s._v(" "),n("h3",{attrs:{id:"_1-安装第三方工具"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装第三方工具"}},[s._v("#")]),s._v(" 1. 安装第三方工具")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("sudo apt-get install -y setserial gpsd gpsd-clients python-gps pps-tools cmake\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h3",{attrs:{id:"_2-查看gps信号"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-查看gps信号"}},[s._v("#")]),s._v(" 2. 查看GPS信号")]),s._v(" "),n("p",[s._v("在这里，我的GPS设备节点在"),n("code",[s._v("/dev/gps1")])]),s._v(" "),n("p",[s._v("方法一：\n通过"),n("code",[s._v("cat")]),s._v("直接查看")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$cat /dev/gps1\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("命令行中会持续输出gps信号：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$GNVTG,,T,,M,0.335,N,0.621,K,A*3D\n\n$GNGGA,034523.00,2232.35397,N,11356.87346,E,1,05,2.12,230.0,M,-2.7,M,,*58\n\n$GNGSA,A,3,15,13,12,20,05,,,,,,,,2.76,2.12,1.77*1D\n\n$GNGSA,A,3,,,,,,,,,,,,,2.76,2.12,1.77*1F\n\n$GPGSV,4,1,14,02,64,011,,05,50,346,11,06,19,112,,07,00,047,*70\n\n$GPGSV,4,2,14,11,46,087,16,12,08,213,09,13,77,132,19,15,53,222,26*7C\n\n$GPGSV,4,3,14,18,01,311,,20,37,039,07,24,03,190,,25,05,247,*75\n\n$GPGSV,4,4,14,29,40,307,,30,15,074,*73\n\n$GLGSV,2,1,06,65,29,240,,71,34,018,,72,64,306,,85,27,139,*67\n\n$GLGSV,2,2,06,86,71,097,,87,35,340,*6B\n\n$GNGLL,2232.35397,N,11356.87346,E,034523.00,A,A*70\n\n$GNRMC,034524.00,A,2232.35377,N,11356.87285,E,0.131,,070922,,,A*63\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br")])]),n("p",[s._v("方法二：\n借助第三方工具查看\n修改"),n("code",[s._v("sudo nano /etc/default/gpsd")]),s._v("文件如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('DEVICES="/dev/gps1"\nGPSD_OPTIONS="-n -G"\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("stty -F /dev/gps1 9600\nsudo gpsd /dev/gps1 -F /var/run/gpsd.sock\n\ngpsd 运行服务： (开机自启动）\n# sudo systemctl daemon-reload\nsudo systemctl enable gpsd\nsudo systemctl restart gpsd\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("运行"),n("code",[s._v("gpsmon")]),s._v("即可查看"),n("code",[s._v("cgps")]),s._v("状态如图(经纬度、时间、NMEA等)")]),s._v(" "),n("p",[n("img",{attrs:{src:a(530),alt:"gpsmon运行结果"}})]),s._v(" "),n("h3",{attrs:{id:"_3、测试pps信号-通过pps-tools-工具测试"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、测试pps信号-通过pps-tools-工具测试"}},[s._v("#")]),s._v(" 3、测试PPS信号 (通过pps-tools 工具测试)")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("sudo ppstest /dev/pps*\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("输出信息：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('trying PPS source "/dev/pps0"\nfound PPS source "/dev/pps0"\nok, found 1 source(s), now start fetching data...\nsource 0 - assert 1662537647.997898697, sequence: 12508 - clear  0.000000000, sequence: 0\nsource 0 - assert 1662537648.997892803, sequence: 12509 - clear  0.000000000, sequence: 0\nsource 0 - assert 1662537649.997886186, sequence: 12510 - clear  0.000000000, sequence: 0\nsource 0 - assert 1662537650.997878978, sequence: 12511 - clear  0.000000000, sequence: 0\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("以上是有GPS信号，且获取到经纬度和时间信息后，PPS才有输出，否则的话将输出以下信息：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('trying PPS source "/dev/pps0"\nfound PPS source "/dev/pps0"\nok, found 1 source(s), now start fetching data...\ntime_pps_fetch() error -1 (Connection timed out)\ntime_pps_fetch() error -1 (Connection timed out)\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])])])}),[],!1,null,null,null);e.default=t.exports}}]);