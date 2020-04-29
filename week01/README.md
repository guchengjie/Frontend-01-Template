1. 编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动。
2. 讲讲 position float display 各有哪些取值，它们互相之间会如何影响？

  position:
    absolute ===== 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
    fixed ===== 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
    relative ===== 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
    static ===== 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
    inherit ===== 规定应该从父元素继承 position 属性的值。

  float:
    left ===== 元素向左浮动。
    right ===== 元素向右浮动。
    none ===== 默认值。元素不浮动，并会显示在其在文本中出现的位置。
    inherit ===== 规定应该从父元素继承 float 属性的值。

  display:
    none ===== 不会被显示。
    block ===== 将显示为块级元素，前后会带有换行符。
    inline ===== 默认。会被显示为内联元素，元素前后没有换行符。
    list-item ===== 会作为列表显示。
    run-in ===== 会根据上下文作为块级元素或内联元素显示。
    compact ===== 会根据上下文作为块级元素或内联元素显示。
    table ===== 会作为块级表格来显示（类似 <table>），表格前后带有换行符。
    inline-table ===== 会作为内联表格来显示（类似 <table>），表格前后没有换行符。
    table-row-group ===== 会作为一个或多个行的分组来显示（类似 <tbody>）。
    table-header-group ===== 会作为一个或多个行的分组来显示（类似 <thead>）。
    table-footer-group ===== 会作为一个或多个行的分组来显示（类似 <tfoot>）。
    table-row ===== 会作为一个表格行显示（类似 <tr>）。
    table-column-group ===== 会作为一个或多个列的分组来显示（类似 <colgroup>）。
    table-column ===== 会作为一个单元格列显示（类似 <col>）
    table-cell ===== 会作为一个表格单元格显示（类似 <td> 和 <th>）
    table-caption ===== 会作为一个表格标题显示（类似 <caption>）


3. JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？
4. HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？
5. 编写一个快速排序代码，并且用动画演示它的过程。



【关于我】
  一线搬运工，长期沉溺在coding, game中,热爱学习和骑行
【关于工作】
  工作3年多的react前端开发，主要从事水利方面的后台专业系统开发
【工作之外】
  看看心理学，自制力，历史等方面的书籍, 网上学学新的前沿的技术，看看视频，玩玩游戏，外出放风等
  