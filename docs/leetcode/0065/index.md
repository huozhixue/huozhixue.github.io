# 0065：有效数字（★★）


> <u>**[力扣第 65 题](https://leetcode.cn/problems/valid-number/)**</u>

## 题目

<p><strong>有效数字</strong>（按顺序）可以分成以下几个部分：</p>

<ol>
<li>一个 <strong>小数</strong> 或者 <strong>整数</strong></li>
<li>（可选）一个 <code>'e'</code> 或 <code>'E'</code> ，后面跟着一个 <strong>整数</strong></li>
</ol>

<p><strong>小数</strong>（按顺序）可以分成以下几个部分：</p>

<ol>
<li>（可选）一个符号字符（<code>'+'</code> 或 <code>'-'</code>）</li>
<li>下述格式之一：
<ol>
<li>至少一位数字，后面跟着一个点 <code>'.'</code></li>
<li>至少一位数字，后面跟着一个点 <code>'.'</code> ，后面再跟着至少一位数字</li>
<li>一个点 <code>'.'</code> ，后面跟着至少一位数字</li>
</ol>
</li>
</ol>

<p><strong>整数</strong>（按顺序）可以分成以下几个部分：</p>

<ol>
<li>（可选）一个符号字符（<code>'+'</code> 或 <code>'-'</code>）</li>
<li>至少一位数字</li>
</ol>

<p>部分有效数字列举如下：<code>["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]</code></p>

<p>部分无效数字列举如下：<code>["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]</code></p>

<p>给你一个字符串 <code>s</code> ，如果 <code>s</code> 是一个 <strong>有效数字</strong> ，请返回 <code>true</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "0"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "e"
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "."
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 20</code></li>
<li><code>s</code> 仅含英文字母（大写和小写），数字（<code>0-9</code>），加号 <code>'+'</code> ，减号 <code>'-'</code> ，或者点 <code>'.'</code> 。</li>
</ul>


## 分析

首先想到用正则：

	有效整数很简单:									"[+-]?\d+"

	有效小数基于有效整数，考虑两种格式:
	'.' 之前至少一位数字 							"[+-]?\d+\.\d*"
	'.' 之前没有数字，之后至少一位 					"[+-]?\.\d+"
	
	有效整数或小数整合为：							"[+-]?(\d+(\.\d*)?|\.\d+)"
	
	有效数字基于有效整数和小数，考虑两种格式:
	不存在 "eE", 就是一个整数或小数					"[+-]?(\d+(\.\d*)?|\.\d+)"
	存在一个 "eE", 前面是整数或小数, 后面是整数		"[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+"

整合一下即得最终表达式。


## 解答

```python
def isNumber(self, s: str) -> bool:
	return bool(re.match(r"[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$", s))
```
40 ms

## *附加

还有更加通用的 [DFA（确定有限状态自动机）](https://zhuanlan.zhihu.com/p/30009083)方法。

```python
def isNumber(self, s: str) -> bool:
    st = ['0_initial', '1_sign', '2_int', '3_dot', '4_dot_without_int', '5_decimal', 
          '6_e', '7_e_sign', '8_e_int']
    act = ['0_sign', '1_int', '2_dot', '3_e']
    shift = {st[0]: {act[0]: st[1], act[1]: st[2], act[2]: st[4]},
             st[1]: {act[1]: st[2], act[2]: st[4]},
             st[2]: {act[1]: st[2], act[2]: st[3], act[3]: st[6]},
             st[3]: {act[1]: st[5], act[3]: st[6]},
             st[4]: {act[1]: st[5]},
             st[5]: {act[1]: st[5], act[3]: st[6]},
             st[6]: {act[0]: st[7], act[1]: st[8]},
             st[7]: {act[1]: st[8]},
             st[8]: {act[1]: st[8]},
             }
    char2act = {'+': act[0], '-': act[0], '.': act[2], 'e': act[3], 'E': act[3]}
    state = st[0]
    for char in s:
        action = act[1] if char.isdigit() else char2act.get(char)
        if action not in shift[state]:
            return False
        state = shift[state][action]
    return state in {st[2], st[3], st[5], st[8]}
```
28 ms
