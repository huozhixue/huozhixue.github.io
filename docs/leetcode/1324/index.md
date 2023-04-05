# 1324：竖直打印单词


> <u>**[力扣第 172 场周赛第 2 题](https://leetcode.cn/problems/print-words-vertically/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>。请你按照单词在 <code>s</code> 中的出现顺序将它们全部竖直返回。<br>
单词应该以字符串列表的形式返回，必要时用空格补位，但输出尾部的空格需要删除（不允许尾随空格）。<br>
每个单词只能放在一列上，每一列中也只能有一个单词。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;HOW ARE YOU&quot;
<strong>输出：</strong>[&quot;HAY&quot;,&quot;ORO&quot;,&quot;WEU&quot;]
<strong>解释：</strong>每个单词都应该竖直打印。
&quot;HAY&quot;
&quot;ORO&quot;
&quot;WEU&quot;
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;TO BE OR NOT TO BE&quot;
<strong>输出：</strong>[&quot;TBONTB&quot;,&quot;OEROOE&quot;,&quot;   T&quot;]
<strong>解释：</strong>题目允许使用空格补位，但不允许输出末尾出现空格。
&quot;TBONTB&quot;
&quot;OEROOE&quot;
&quot;   T&quot;
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;CONTEST IS COMING&quot;
<strong>输出：</strong>[&quot;CIC&quot;,&quot;OSO&quot;,&quot;N M&quot;,&quot;T I&quot;,&quot;E N&quot;,&quot;S G&quot;,&quot;T&quot;]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 200</code></li>
<li><code>s</code> 仅含大写英文字母。</li>
<li>题目数据保证两个单词之间只有一个空格。</li>
</ul>


## 分析


模拟即可。python 可以用 zip_longest 方便地提取每列。

## 解答


```python
def printVertically(self, s: str) -> List[str]:
	return [''.join(col).rstrip() for col in zip_longest(*s.split(), fillvalue=' ')]
```
40 ms
