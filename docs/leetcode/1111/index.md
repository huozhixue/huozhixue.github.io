# 1111：有效括号的嵌套深度（1749 分）


> <u>**[力扣第 144 场周赛第 4 题](https://leetcode.cn/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)**</u>

## 题目

<p><strong>有效括号字符串 </strong>定义：对于每个左括号，都能找到与之对应的右括号，反之亦然。详情参见题末「<strong>有效括号字符串</strong>」部分。</p>

<p><strong>嵌套深度</strong> <code>depth</code> 定义：即有效括号字符串嵌套的层数，<code>depth(A)</code> 表示有效括号字符串 <code>A</code> 的嵌套深度。详情参见题末「<strong>嵌套深度</strong>」部分。</p>

<p>有效括号字符串类型与对应的嵌套深度计算方法如下图所示：</p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/01/1111.png" style="height: 152px; width: 600px;"></p>



<p>给你一个「有效括号字符串」 <code>seq</code>，请你将其分成两个不相交的有效括号字符串，<code>A</code> 和 <code>B</code>，并使这两个字符串的深度最小。</p>

<ul>
<li>不相交：每个 <code>seq[i]</code> 只能分给 <code>A</code> 和 <code>B</code> 二者中的一个，不能既属于 <code>A</code> 也属于 <code>B</code> 。</li>
<li><code>A</code> 或 <code>B</code> 中的元素在原字符串中可以不连续。</li>
<li><code>A.length + B.length = seq.length</code></li>
<li>深度最小：<code>max(depth(A), depth(B))</code> 的可能取值最小。 </li>
</ul>

<p>划分方案用一个长度为 <code>seq.length</code> 的答案数组 <code>answer</code> 表示，编码规则如下：</p>

<ul>
<li><code>answer[i] = 0</code>，<code>seq[i]</code> 分给 <code>A</code> 。</li>
<li><code>answer[i] = 1</code>，<code>seq[i]</code> 分给 <code>B</code> 。</li>
</ul>

<p>如果存在多个满足要求的答案，只需返回其中任意 <strong>一个 </strong>即可。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>seq = &quot;(()())&quot;
<strong>输出：</strong>[0,1,1,1,1,0]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>seq = &quot;()(())()&quot;
<strong>输出：</strong>[0,0,0,1,1,0,1,1]
<strong>解释：</strong>本示例答案不唯一。
按此输出 A = &quot;()()&quot;, B = &quot;()()&quot;, max(depth(A), depth(B)) = 1，它们的深度最小。
像 [1,1,1,0,0,1,1,1]，也是正确结果，其中 A = &quot;()()()&quot;, B = &quot;()&quot;, max(depth(A), depth(B)) = 1 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt; seq.size &lt;= 10000</code></li>
</ul>



<p><strong>有效括号字符串：</strong></p>

<pre>仅由 <code>&quot;(&quot;</code> 和 <code>&quot;)&quot;</code> 构成的字符串，对于每个左括号，都能找到与之对应的右括号，反之亦然。
下述几种情况同样属于有效括号字符串：

1. 空字符串
2. 连接，可以记作 <code>AB</code>（<code>A</code> 与 <code>B</code> 连接），其中 <code>A</code> 和 <code>B</code> 都是有效括号字符串
3. 嵌套，可以记作 <code>(A)</code>，其中 <code>A</code> 是有效括号字符串
</pre>

<p><strong>嵌套深度：</strong></p>

<pre>类似地，我们可以定义任意有效括号字符串 <code>s</code> 的 <strong>嵌套深度</strong> <code>depth(S)</code>：

1.<code> s</code> 为空时，<code>depth(&quot;&quot;) = 0</code>
<code>  2. s</code> 为 <code>A</code> 与 <code>B</code> 连接时，<code>depth(A + B) = max(depth(A), depth(B))</code>，其中 <code>A</code> 和 <code>B</code> 都是有效括号字符串
<code>  3. s</code> 为嵌套情况，<code>depth(&quot;(&quot; + A + &quot;)&quot;) = 1 + depth(A)</code>，其中 <code>A</code> 是有效括号字符串

例如：<code>&quot;&quot;</code>，<code>&quot;()()&quot;</code>，和 <code>&quot;()(()())&quot;</code> 都是有效括号字符串，嵌套深度分别为 0，1，2，而 <code>&quot;)(&quot;</code> 和 <code>&quot;(()&quot;</code> 都不是有效括号字符串。
</pre>


**相似问题：**
- [1614：括号的最大嵌套深度（1322 分）](/leetcode/1614)


## 分析

### #1

根据 {{< lc "1614" >}} 可以得到每个括号所处的深度。

为了使拆分后的深度最小，可以将深度为奇数的都给 A，偶数的都给 B，从而尽量接近最大深度的一半。

```python
def maxDepthAfterSplit(self, seq: str) -> List[int]:
    res, size = [], 0
    for char in seq:
        size += 1 if char == '(' else -1
        res.append(size&1 if char == '(' else size&1^1)
    return res
```
32 ms

### #2

观察可知，size+=1 和 size-=1 其实对深度的奇偶性没有影响。所以可以直接用位置 i 代替 size。

## 解答

```python
def maxDepthAfterSplit(self, seq: str) -> List[int]:
    return [i&1 if char=='(' else i&1^1 for i, char in enumerate(seq)]
```
44 ms

