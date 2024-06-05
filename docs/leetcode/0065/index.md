# 0065：有效数字（★★）


> <u>**[力扣第 65 题](https://leetcode.cn/problems/valid-number/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，返回 <code>s</code> 是否是一个 <strong>有效数字</strong>。</p>

<p>例如，下面的都是有效数字：<code>"2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"</code>，而接下来的不是：<code>"abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"</code>。</p>

<p>一般的，一个 <strong>有效数字</strong> 可以用以下的规则之一定义：</p>

<ol>
<li>一个 <strong>整数</strong> 后面跟着一个 <strong>可选指数</strong>。</li>
<li>一个 <strong>十进制数</strong> 后面跟着一个 <strong>可选指数</strong>。</li>
</ol>

<p>一个 <strong>整数</strong> 定义为一个 <strong>可选符号</strong> <code>'-'</code> 或 <code>'+'</code> 后面跟着 <strong>数字</strong>。</p>

<p>一个 <strong>十进制数</strong> 定义为一个 <strong>可选符号 </strong><code>'-'</code> 或 <code>'+'</code> 后面跟着下述规则：</p>

<ol>
<li><strong>数字 </strong>后跟着一个 <strong>小数点 <code>.</code></strong>。</li>
<li><strong>数字 </strong>后跟着一个 <strong>小数点 <code>.</code> </strong>再跟着<strong> 数位</strong>。</li>
<li>一个 <strong>小数点 <code>.</code> </strong>后跟着<strong> 数位</strong>。</li>
</ol>

<p><strong>指数</strong> 定义为指数符号 <code>'e'</code> 或 <code>'E'</code>，后面跟着一个 <b>整数</b>。</p>

<p><strong>数字</strong> 定义为一个或多个数位。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "0"</span></p>

<p><strong>输出：</strong><span class="example-io">true</span></p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "e"</span></p>

<p><strong>输出：</strong><span class="example-io">false</span></p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "."</span></p>

<p><strong>输出：</strong><span class="example-io">false</span></p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 20</code></li>
<li><code>s</code> 仅含英文字母（大写和小写），数字（<code>0-9</code>），加号 <code>'+'</code> ，减号 <code>'-'</code> ，或者点 <code>'.'</code> 。</li>
</ul>


## 分析

正则：
- 有效整数很简单:	 
		'[+-]?\d+'	
- 有效小数基于有效整数，考虑两种格式:
	- '.' 之前至少一位数字 ：
			'[+-]?\d+\.\d*'
	- '.' 之前没有数字，之后至少一位 ：
			'[+-]?\.\d+'
- 有效整数或小数整合为：	   
		'[+-]?(\d+\.?\d*|\.\d+)'
- 有效数字基于有效整数和小数，考虑两种格式:
	- 不存在 "eE", 就是一个整数或小数	
	- 存在一个 "eE", 前面是整数或小数, 后面是整数 
- 整合即得最终表达式


## 解答

```python
class Solution:
    def isNumber(self, s: str) -> bool:
        return bool(re.match('[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$',s))
```
38 ms

