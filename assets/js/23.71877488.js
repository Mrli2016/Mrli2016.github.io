(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{546:function(s,n,a){"use strict";a.r(n);var t=a(6),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[s._v("#")]),s._v(" 应用场景")]),s._v(" "),a("p",[s._v("*.cfg文件一般是程序运行的配置文件，如何正确使用cfg是程序员的必备技能，曾看过不规范的cfg使用方法，所以特地记录分享下。\npython为读写常见配置文件提供了一个内置的"),a("code",[s._v("configparser")]),s._v("模块，所以在python中解析配置文件相当简单。")]),s._v(" "),a("blockquote",[a("p",[s._v("文档代码基于python3.7运行。")])]),s._v(" "),a("h2",{attrs:{id:"读取配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读取配置"}},[s._v("#")]),s._v(" 读取配置")]),s._v(" "),a("p",[s._v("现有示例配置"),a("code",[s._v("settings.cfg")]),s._v("文件，内容如下：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("[db_config]\n \ndatabase_host = 192.168.X.X\n \ndatabase_port = 5432\n \ndatabase_name = DATABASE_NAME\n \ndatabase_username = test\n\n[deploy]\n\nproject = product\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("然后通过python来读取配置：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('import os\nimport configparser\n\nCONFIG_FILE = \'settings.cfg\'\n\ndef run():\n\n    # 判断配置文件是否存在\n    if os.path.exists(os.path.join(os.getcwd(), CONFIG_FILE)):\n        config = configparser.ConfigParser()\n\n        # 传入读取文件的地址，encoding文件编码格式，中文必须设为UTF-8\n        config.read(CONFIG_FILE, encoding=\'UTF-8\')\n\n        #第一个参数指定要读取的段名，第二个是要读取的选项名\n\n        # 获取db_config相关配置\n        host = config.get("db_config", "database_host")\n        \n        # 获取deploy配置\n        project = config.get("deploy", "project")\n\n        # fallback参数可设置默认值, 在未获取到相关配置时返回\n        url = config.get("deploy", "project", fallback=\'test.com\')\n\n        print(host, project, url)\n        # 192.168.X.X product test.com\n\nif __name__ == \'__main__\':\n    run()\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br")])]),a("h2",{attrs:{id:"部署流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署流程"}},[s._v("#")]),s._v(" 部署流程")]),s._v(" "),a("p",[s._v("设置git忽略"),a("code",[s._v("settings.cfg")]),s._v("文件，git只push配置文件的副本"),a("code",[s._v("settings.ini")]),s._v("文件，然后在服务器端交给运维来根据配置文件副本生成线上真正的"),a("code",[s._v("settings.cfg")]),s._v("文件。因为一些线上服务器的敏感配置是不能暴露的，如密钥、服务器ip密码那些，所以要交给运维来修改添加。")])])}),[],!1,null,null,null);n.default=e.exports}}]);