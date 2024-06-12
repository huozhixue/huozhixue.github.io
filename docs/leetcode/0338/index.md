# 0338：比特位计数


> <u>**[力扣第 338 题](https://leetcode.cn/problems/counting-bits/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，对于 <code>0 &lt;= i &lt;= n</code> 中的每个 <code>i</code> ，计算其二进制表示中 <strong><code>1</code> 的个数</strong> ，返回一个长度为 <code>n + 1</code> 的数组 <code>ans</code> 作为答案。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>[0,1,1]
<strong>解释：</strong>
0 --&gt; 0
1 --&gt; 1
2 --&gt; 10
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 5
<strong>输出：</strong>[0,1,1,2,1,2]
<strong>解释：</strong>
0 --&gt; 0
1 --&gt; 1
2 --&gt; 10
3 --&gt; 11
4 --&gt; 100
5 --&gt; 101
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>很容易就能实现时间复杂度为 <code>O(n log n)</code> 的解决方案，你可以在线性时间复杂度 <code>O(n)</code> 内用一趟扫描解决此问题吗？</li>
<li>你能不使用任何内置函数解决此问题吗？（如，C++ 中的 <code>__builtin_popcount</code> ）</li>
</ul>
</div>
</div>


## 分析


可以直接计数，也可以基于 {{< lc "0191" >}}，用 n & (n-1) 递推 n。

## 解答

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = [0]*(n+1)
        for i in range(1,n+1):
            res[i] = res[i&(i-1)]+1
        return res
```
42 ms

