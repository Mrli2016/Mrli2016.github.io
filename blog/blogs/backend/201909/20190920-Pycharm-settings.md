---
title: Pycharm常用设置
date: 2019-09-20
categories: 
- 后端
tags:
- 工具
- 后端
---

## 前言
作为开发者，开发工具好不好用尤为重要。我们首先要将工具设置到最顺手的状态才能提高开发效率。目前版本更新了很多，旧版本的配置已经改了很多，本文章基于`2019.2.2`版本进行说明。

## 设置
通过左上角顶部栏Pycharm-> preferences打开个性化设置面板。

* [注册激活](https://blog.csdn.net/l297969586/article/details/78183671) （测试可用，最新激活码有效期至2020年4月21日）

* 设置主题字体样式 Appearance & Behavior
    1. 主题：Appearance > Theme，选择 Darcula 暗色主题。
    2. 设置背景图片：Appearance > UI Options，点击Background Image设置。
    2. 显示内存：Appearance > Window Options，勾选 Show memory indicator。

* 编辑器设置 Editor
    1. 设置字体：Font，这里选择一款支持中文的字体即可，一般使用menlo、Monaco。大小行高看各人习惯。右侧勾选Show only monospaced fonts 显示等宽字体。
    2. 设置自己的个性化方案：Color Scheme > Scheme，选择Darcula，然后右侧点Duplicate复制一份配置重命名，这样就能基于Darcula的配置进行个性化修改而不影响默认Darcula方案。
    3. 设置自动显示行号：General > Appearance，勾选Show line numbers和Show method separators。根据个人喜好，还能勾选 Show whitespaces，这样就能看出缩进是 tab 缩进还是空格缩进。
    4. 标识修改文件：General > Editor Tabs，勾选Mark modified(*)，这样被修改的文件会以 * 号标识出来，你可以及时保存相关的文件。
    5. 关闭单词拼写检查：Inspections > Spelling > Typo，取消勾选。
    6. 去掉Python的requirements提示：Inspections > Python > Package requirements，取消勾选。
    7. 修改代码最长宽度：Code Style > Hard wrap at，根据自己屏幕大小设置，24寸屏幕推荐160的值。
    8. 设置Python文件模板：File and Code Templates。选中Python Script添加头部
    ```
    # -*- coding: utf-8 -*-
    ```

* 安装插件 Plugins
    日常好用的插件有：
    * `CodeGlance` 代码小地图，安装后右侧会出现完整代码块。
    * `GitToolBox` git管理工具
    * `Iedis` redis管理工具
    * `Mongo Plugin` mongodb管理工具

* 项目设置 Project
    1. 项目环境选择：Default Project > Project Interpreter 选择python2.7或3.7的环境检查组件安装。

* 语言设置 Languages & Frameworks
    1. `Javascripts > Libraries` 点击右边的 Download 选择`Bootstrap`、`Jquery`和`Jqery UI`、`vue`并且选中。
    2. js代码检查：`Javascripts > Code Quality Tools` 启用JSHint和选中Jquery的代码检查。


