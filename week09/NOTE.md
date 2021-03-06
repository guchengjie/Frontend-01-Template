# web知识体系

## Html

### 通用计算机语言

- 语法
- 词法

### HTML as SGML

- entity

  一个HTML 实体 是一段文本（“串”），以与符号（开始&）和结束用分号（;）。实体通常用于显示保留字符（否则将被解释为HTML代码）和不可见字符（例如不间断空格）。您也可以使用它们来代替标准键盘难以键入的其他字符。 
  
  许多角色都有令人难忘的实体。例如，版权符号（©）  的实体为&copy;。对于难记的字符，例如  &#8212;或&#x2014;，可以使用参考图或解码器工具。
  
  实体（在 HTML 语境下就是 & 符后边的东西）

- DTD

  Document Type Definition
  https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

### HTML as  XML

- Namespace

	- svg
	- mathml
	- aria

	  Accessible Rich Internet Applications（ https://www.w3.org/TR/html-aria/）

- Tag

	- The elements of HTML

		- html
		- head
		- title
		- base
		- link
		- media
		- type
		- link
		- meta
		- style

	- Sections 

		- body
		- article
		- section
		- nav
		- aside
		- h1
		- h2
		- h3
		- h4
		- h5
		- h6
		- hgroup
		- header
		- footer
		- address

	- Grouping content

		- p
		- hr
		- pre
		- blockquote
		- ol
		- ul
		- menu
		- li
		- dl
		- dt
		- dd
		- figure
		- figcaption
		- main
		- div

	- Text-level semantics

		- a
		- em
		- strong
		- small
		- s
		- cite
		- q
		- dfn
		- abbr
		- ruby
		- rt
		- rp
		- data
		- time
		- code
		- var
		- samp
		- kbd
		- sub
		- sup
		- i
		- b
		- u
		- mark
		- bdi
		- bdo
		- span
		- br
		- wbr

	- Links

		- a
		- area

	- Edits

		- ins
		- del

	- Embedded content  可替换元素

		- picture
		- source
		- img
		- iframe
		- embed
		- object
		- param
		- video
		- audio
		- track
		- map
		- area

	- Tabular data

		- table
		- caption
		- colgroup
		- col
		- tbody
		- thead
		- tfoot
		- tr
		- td
		- th

	- Forms

		- form
		- label
		- input
		- button
		- select
		- datalist
		- optgroup
		- option
		- textarea
		- output
		- progress
		- meter
		- fieldset
		- legend

	- Interactive elements

		- details
		- summary
		- legend
		- dialog

	- Scripting

		- script
		- noscript
		- template
		- template
		- slot
		- canvas

### xhtml  html的子集

## Javascript

### Grammar语法

- Lexical词法

	- WhiteSpace空白符

	  U+0009 CHARACTER TABULATION  U+000B LINE TABULATION 
	  U+000C FORM FEED (FF) 
	  U+0020 SPACE  
	  U+00A0 NO-BREAK SPACE  
	  U+FEFF ZERO WIDTH NO-BREAK SPACE

		- <TAB>
		- <VT>
		- <FF>
		- <SP>
		- <NBSP>
		- <BOM>
		- <USP>

	- LineTerminator行终止符

	  U+000A LINE FEED (LF) 
	  U+000D CARRIAGE RETURN (CR) 
	  U+2028 LINE SEPARATOR  
	  U+2029 PARAGRAPH SEPARATOR

		- <LF>
		- <CR>
		- <LS>
		- <PS>

	- Comment注释

		- MultiLineComment

			- MultiLineCommentChars

				- MultiLineNotAsteriskChar

				  不能有*号

				- MultiLineNotForwardSlashOrAsteriskChar

				  不能有/和*号

				- PostAsteriskCommentChars

		- SingleLineComment

			- SingleLineCommentChars
			- SingleLineCommentChar

			  but not LineTerminator
			  不能有换行符

	- Token有效的输入元素

		- Identifier变量名

			- IdentifierStart

				- UnicodeIDStart

				  any Unicode code point with the Unicode property “ID_Start”

				- $
				- _
				- \ UnicodeEscapeSequence

			- IdentifierPart

				- UnicodeIDContinue
				- $
				- \ UnicodeEscapeSequence
				- <ZWNJ>
				- <ZWJ>

		- Keywords关键字

			- await
			- break
			- case
			- catch
			- class
			- const
			- continue
			- debugger
			- default
			- delete
			- do
			- else
			- export
			- extends
			- finally
			- for
			- function
			- if
			- import
			- in
			- instanceof
			- new
			- return
			- super
			- switch
			- this
			- throw
			- try
			- typeof
			- var
			- void
			- while
			- with
			- yield

		- Punctuator符号

			- {
			- (
			- )
			- [
			- ]
			- .
			- ...
			- ;
			- ,
			- <
			- >
			- <=
			- >=
			- ==
			- !=
			- ===
			- !==
			- +
			- -
			- *
			- %
			- **
			- ++
			- --
			- <<
			- >>
			- >>>
			- &
			- |
			- ^
			- !
			- ~
			- &&
			- ||
			- ?
			- :
			- =
			- +=
			- -=
			- *=
			- %=
			- **=
			- <<=
			- >>=
			- >>>=
			- &=
			- |=
			- ^=
			- =>

		- NumericLiteral数值直接量

			- DecimalLiteral

			  DecimalIntegerLiteral . DecimalDigitsopt ExponentPartopt . DecimalDigits ExponentPartopt DecimalIntegerLiteral ExponentPartopt
			  
			  DecimalIntegerLiteral :: 
			  	0 
			  	NonZeroDigit DecimalDigitsopt DecimalDigits :: 
			  	DecimalDigit 
			  	DecimalDigits DecimalDigit 
			  DecimalDigit :: one of 
			  	0 1 2 3 4 5 6 7 8 9 
			  NonZeroDigit :: one of 
			  	1 2 3 4 5 6 7 8 9 
			  ExponentPart :: 
			  	ExponentIndicator SignedInteger ExponentIndicator :: one of 
			  	e E 
			  SignedInteger :: 
			  	DecimalDigits 
			  	+DecimalDigits 
			  	- DecimalDigits

			- BinaryIntegerLiteral

			  BinaryIntegerLiteral :: 
			  	0b BinaryDigits 
			  	0B BinaryDigits 
			  BinaryDigits :: 
			  	BinaryDigit 
			  	BinaryDigits BinaryDigit 
			  BinaryDigit :: one of
			  	 0 1

			- OctalIntegerLiteral

			  OctalIntegerLiteral :: 
			  	0o OctalDigits 
			   	0O OctalDigits 
			  OctalDigits :: 
			  	OctalDigit 
			  	OctalDigits OctalDigit 
			  OctalDigit :: one of 
			  	0 1 2 3 4 5 6 7

			- HexIntegerLiteral

			  HexIntegerLiteral :: 
			  	0x HexDigits 
			  	0X HexDigits 
			  HexDigits ::
			   	HexDigit 
			  	HexDigits HexDigit 
			  HexDigit :: one of 
			  	0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F

		- StringLiteral字符串直接量
		- RegularExpressionLiteral正则直接量
		- Template字符串模板

- Syntax语法

	- Atom原子
	- Expression
	- Structure
	- Script and Module

### Semantics语义

语法和语义一一对应的关系

### Runtime运行时

- Type

	- Number
	- String
	- Boolean
	- Null
	- Symbol
	- Undefined
	- Object
	- 内部类型

		- Reference
		- Completion Record

- 执行过程

	- Job
	- Script and Module
	- Promise
	- Function
	- Statement
	- Expression
	- Literal
	- Identifier

## Css

css 2.1 
https://www.w3.org/TR/2011/REC-CSS2-20110607/

### 结构

- @charset
- @import
- @namespace
- rules

	- @media
	- @supports
	- @document
	- @page
	- @font-face
	- @keyframes
	- @viewport
	- @counter-style
	- @font-feature-values
	- rule

### 词法

### 语法

- At-rules

	- @charset
	- @import
	- @media
	- @page
	- @supports
	- @document
	- @font-face
	- @keyframes
	- @viewport
	- @counter-style
	- @font-feature-values

- rule

	- Selector

		- selectors_group  选择器列表  [  ,  ] 逗号分割
		- combinator  组合器

			- PLUS  +
			- GREATER   >
			- TILDE   ~
			- SPACE

		- simple_selector

			- type
			- *
			- .
			- []
			- #
			- :  Pseudo-classes

				- Linguistic
				- Location

					- :any-link
					- :link
					- :visited
					- :target

				- User Action

					- :link
					- :visited
					- :hover
					- :active
					- :focus

				- Time-dimensional
				- Resource State
				- Input 

					- :enabled
					- :disabled
					- :checked
					- :read-only
					- :enabled

				- Tree-Structural

					- :root
					- :empty
					- :first-child 
					- :last-child 
					- :only-child 
					- :nth-child() 
					- :nth-last-child()
					- :nth-of-type()
					- :nth-last-of-type()
					- :first-of-type
					- :last-of-type 
					- :only-of-type

			- ::  Pseudo-elements

				- ::before
				- ::after 
				- ::first-letter
				- ::first-line

		- specificity

			- inline
			- #id
			- .class | attributes | pseudo-classes
			- type | pseudo-elements 
			- * universal 

	- Declaration

		- Property
		- variable

### 普通规则组成

- 选择器

	- 简单

		- .Class
		- #Id
		- Tagname
		- *

	- 复合
	- 复杂

		- A B 后代选择器
		- A > B 子选择器
		- A + B  相邻选择器，A后面紧挨着B
		- A ~ B  后继选择器，A在B的后面

	- 选择器列表

- Property

	- layout

		- box boxes  盒模型

			- height

				- max-height
				- min-height

			- width

				- max-width
				- min-width

			- margin

				- margin-bottom
				- margin-left
				- margin-right
				- margin-top

			- padding

				- padding-bottom
				- padding-left
				- padding-right
				- padding-top

			- border

				- border-bottom-color
				- border-bottom-left-radius
				- border-bottom-right-radius
				- border-bottom-style
				- border-bottom-width
				- border-collapse
				- border-image-outset
				- border-image-repeat
				- border-image-slice
				- border-image-source
				- border-image-width
				- border-left-color
				- border-left-style
				- border-left-width
				- border-right-color
				- border-right-style
				- border-right-width
				- border-top-color
				- border-top-left-radius
				- border-top-right-radius
				- border-top-style
				- border-top-width

		- position

			- left
			- right
			- top
			- bottom

		- display
		- float  浮动布局

			- clear 清理浮动

		- flex  布局

			- flex-basis
			- flex-grow
			- flex-shrink
			- flex-direction
			- flex-wrap
			- justify-items
			- justify-self
			- justify-content
			- align-content
			- align-items
			- align-self
			- order

		- grid  grid布局

			- grid-auto-columns
			- grid-auto-flow
			- grid-auto-rows
			- grid-column-end
			- grid-column-start
			- grid-template-areas
			- grid-template-columns
			- grid-template-rows
			- grid-row-end
			- grid-row-start

		- columns   Multi-column 布局

			- widows
			- column-gap
			- column-count
			- column-rule-color
			- column-rule-style
			- column-rule-width
			- column-span
			- column-width

		- box-sizing
		- vertical-align
		- text

			- letter-spacing
			- line-height
			- white-space  用来设置如何处理元素中的 空白。
			- word-wrap
			- word-break
			- word-spacing
			- line-break  处理如何断开（break lines）带有标点符号的中文、日文或韩文（CJK）文本的行

		- z-index
		- zoom
		- breack 中断

			- break-after
			- break-before
			- break-inside

		- caption-side  table的页头位置方向
		- writing-mode  正常流的文字的书写方向
		- content
		- direction  文本、表列水平溢出的方向

		  unicode-bidi 与 direction 是仅有的两个不受 all 简写影响的属性。

		- unicode-bidi  同上
		- list-style  列表样式设置

			- list-style-image
			- list-style-position
			- list-style-type

		- orphans
		- resize  元素的可调整大小性
		- table-layout  指定table布局，行和列的算法
		- row-gap  用来设置行元素之间的间隙(gutter) 大小。
		- shape

			- shape-outside
			- shape-image-threshold
			- shape-margin

		- render/draw

			- background

				- background-attachment
				- background-blend-mode
				- background-clip
				- background-color
				- background-image
				- background-origin
				- background-position
				- background-repeat
				- background-size

			- font

				- font-family
				- font-kerning
				- font-optical-sizing
				- font-size
				- font-stretch
				- font-style
				- font-variant
				- font-variant-ligatures
				- font-variant-caps
				- font-variant-numeric
				- font-variant-east-asian
				- font-weight

			- outline

				- outline-color
				- outline-offset
				- outline-style
				- outline-width

			- text

				- text-align
				- text-align-last
				- text-decoration
				- text-decoration-line
				- text-decoration-style
				- text-decoration-color
				- text-decoration-skip-ink
				- text-underline-position
				- text-indent
				- text-rendering
				- text-shadow
				- text-size-adjust
				- text-overflow
				- text-transform

			- transform

				- transform-origin
				- transform-style

			- opacity
			- overflow

				- overflow-anchor
				- overflow-wrap
				- overflow-x
				- overflow-y

			- image

				- backdrop-filter  一个元素后面区域添加图形效果（如模糊或颜色偏移
				- image-rendering  设置图像缩放算法
				- text-rendering  设置图像缩放算法
				- buffered-rendering
				- filter   滤镜将模糊或颜色偏移等图形效果应用于元素

			- clip 已废弃

			  元素的哪一部分是可见，只适用于 position:absolute 的元素。推荐使用clip-path

			- clip-path  裁剪方式创建元素的可显示区域
			- clip-rule
			- box-shadow
			- color
			- cursor
			- empty-cells 

			  渲染表格 <table> 中没有可见内容的单元格的边框和背景

			- isolation  元素是否必须创建一个新的层叠上下文

			  该属性的主要作用是当和background-blend-mode属性一起使用时，可以只混合一个指定元素栈的背景：它允许使一组元素从它们后面的背景中独立出来，只混合这组元素的背景。

			- background-blend-mode 兼容不好

			  定义该元素的背景图片，以及背景色如何混合

				- mix-blend-mode

			- object-fit

			  可替换元素的内容对象在元素盒区域中的填充方式

			- object-position

			  可替换元素的内容对象在元素盒区域中的位置

			- perspective  定了观察者与 z=0 平面的距离

				- perspective-origin

		- interactive

			- animation

				- animation-delay
				- animation-direction
				- animation-duration
				- animation-fill-mode
				- animation-iteration-count
				- animation-name
				- animation-play-state
				- animation-timing-function
				- offset-path
				- offset-distance  指定延着位置offset-path为元素被放置
				- offset-rotate
				- transition

					- transition-delay
					- transition-duration
					- transition-property
					- transition-timing-function

			- pointer-events

			  指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。

			- scroll-behavior

			  户手动导航或者 CSSOM scrolling API 触发滚动操作时，CSS 属性 scroll-behavior 为一个滚动框指定滚动行为

			- speak
			- touch-action
			- user-select  控制用户能否选中文本
			- caret-color  插入光标

			  用来定义插入光标（caret）的颜色，这里说的插入光标，就是那个在网页的可编辑器区域内，用来指示用户的输入具体会插入到哪里的那个一闪一闪的形似竖杠 | 的东西。

		- svg

			- visibility 

			  让你能够控制一个图形元素的可见性。用了值hidden或者值collapse，当前的图形元素将不可见。

			- flood-color
			- flood-opacity
			- lighting-color
			- stop-color
			- stop-opacity
			- color-interpolation
			- color-interpolation-filters
			- color-rendering
			- fill
			- fill-opacity
			- fill-rule
			- marker-end
			- marker-mid
			- marker-start
			- mask-type
			- stroke

				- stroke-linecap
				- stroke-linejoin
				- stroke-miterlimit
				- stroke-opacity
				- stroke-width
				- stroke-dasharray
				- stroke-dashoffset

			- shape-rendering
			- alignment-baseline
			- baseline-shift
			- dominant-baseline
			- text-anchor
			- writing-mode
			- vector-effect
			- paint-order
			- d
			- cx
			- cy
			- x
			- y
			- r
			- rx
			- ry
			- caret-color

		- other

			- tab-size 实验性，用于自定义制表符 (U+0009) 的宽度
			- image-orientation  实验属性
			- will-change  实验属性

			  属性 will-change 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。 这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。

			- backface-visibility  实验属性

			  指定当元素背面朝向观察者时是否可见

			- hyphens   兼容差

- Value

### 机制分类

- 伪元素
- 排版
- 动画

	- 绘制

## Api

### Browser

- DOM  Document Object Model  文档对象模型

	- Nodes

		- appendChild
		-     cloneNode
		-     compareDocumentPosition
		-     contains
		-     getRootNode
		-     hasChildNodes
		-     insertBefore
		-     isDefaultNamespace
		-     isEqualNode
		-     isSameNode
		-     lookupPrefix
		-     lookupNamespaceURI
		-     normalize
		-     removeChild
		-     replaceChild

	- Range

	  const range = new Range();
	  range.setStart(element, 3);
	  range.setEnd(element, 4);
	  
	  const range =document.getSelection().getRangeAt(0)

		- position

			- setStart
			- setEnd
			- setStartBefore
			- setStartAfter
			- setEndBefore
			- setEndAfter
			- selectNode
			- selectNodeContents
			- collapse
			- setEndAfter

		- editor

			- cloneContents
			- deleteContents
			- extractContents
			- insertNode
			- surroundContents

		- other

			- cloneRange
			- getBoundingClientRect
			- getClientRects
			- intersectsNode

	- Events

- BOM brower Object  Model  游览器对象模型
- CSSOM  CSS  Object  Model  css对象模型

  该CSS对象模型是一组API，允许CSS通过JavaScript操纵的。它非常类似于DOM，但是用于CSS而不是HTML。它允许用户动态读取和修改CSS样式。
  
  view
  getClientRects
  getBoundingClientRects

	- AnimationEvent
	- CaretPosition
	- CSS
	- CSSCharsetRule
	- CSSConditionRule
	- CSSCounterStyleRule
	- CSSFontFaceRule
	- CSSFontFeatureValuesMap
	- CSSFontFeatureValuesRule
	- CSSGroupingRule
	- CSSImportRule
	- CSSKeyframeRule
	- CSSKeyframesRule
	- CSSMarginRule
	- CSSMediaRule
	- CSSNamespaceRule
	- CSSPageRule
	- CSSRule
	- CSSRuleList
	- CSSStyleDeclaration
	- CSSStyleSheet
	- CSSStyleRule
	- CSSSupportsRule
	- CSSVariablesMap
	- CSSViewportRule
	- ElementCSSInlineStyle
	- FontFace
	- FontFaceSet
	- FontFaceSetLoadEvent
	- GeometryUtils
	- GetStyleUtils
	- LinkStyle
	- MediaList
	- MediaQueryList
	- MediaQueryListEvent
	- MediaQueryListListener
	- Screen
	- StyleSheet
	- StyleSheetList
	- TransitionEvent

- Houdini   CSS引擎API

  Houdini是一组底层API，它们公开了CSS引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展CSS。 Houdini是一组API，它们使开发人员可以直接访问CSS 对象模型 （CSSOM），使开发人员可以编写浏览器可以解析为CSS的代码，从而创建新的CSS功能，而无需等待它们在浏览器中本地实现

### Node

### Weex

### Electron

## 学习书籍

### 计算机组成原理

### 操作系统

### 编译原理

*XMind: ZEN - Trial Version*