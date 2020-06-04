# 每周总结可以写在这里

一、本周通过系统的学习css相关的概念，建立了完善全面的css体系，并结合toy-brower的开发，理清游览器的css处理规则和原理


1、inline-box Txt  IFC 横向排版的正常流
2、line-box        BFC 纵向排版的正常流
   block-level-box

## 每周总结可以写在这里
1、Block-level  块级元素，可以放进BFC里的元素
2、block containers  里面可以产生BFC的元素,里面是正常流
3、block boxes  上述两个都满足， 里外都是Block-level， 里面还可以产生BFC

一个BFC里就是一个正常流，一个正常流里就有一个BFC和多个IFC

flex  inline-flex
table inline-table
grid  inline-grid
block inline-block

inline
run-in

block containers [block inline-block flex-item]
Block-level [flex table grid block]
block boxes [block]