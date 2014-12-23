Egret Action
=====================


Egret Action 是一套模仿了 cocos2d-x action 机制的动作 API

目前处于 alpha 0 阶段，不保证向下兼容性


how-to-use
========================

1. 在 egretProerties.json 里配置 ``` { name : "action" path : "path-to-egret-action" } ```
2. 执行 ``` egret build -e ```


todolist
================

* 集成 Node
* Sequence
* CallBack
* RepeatForever


roadmap
===============


1. 实现绝大部分 cocos2d-x Action 机制的 API
2. 精简接口和内部实现方式，优化性能，和 Egret 更好的集成
3. 分离 cocos2d-x style API 和 egret style API
4. 简易教程文档
5. 作为标准扩展集成进 Egret-Core