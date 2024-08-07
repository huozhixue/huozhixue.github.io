# 0646：最长数对链（★）


> <u>**[力扣第 646 题](https://leetcode.cn/problems/maximum-length-of-pair-chain/)**</u>

## 题目

<p>给你一个由 <code>n</code> 个数对组成的数对数组 <code>pairs</code> ，其中 <code>pairs[i] = [left<sub>i</sub>, right<sub>i</sub>]</code> 且 <code>left<sub>i</sub> &lt; right<sub>i</sub></code><sub> 。</sub></p>

<p>现在，我们定义一种 <strong>跟随</strong> 关系，当且仅当 <code>b &lt; c</code> 时，数对 <code>p2 = [c, d]</code> 才可以跟在 <code>p1 = [a, b]</code> 后面。我们用这种形式来构造 <strong>数对链</strong> 。</p>

<p>找出并返回能够形成的 <strong>最长数对链的长度</strong> 。</p>

<p>你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>pairs = [[1,2], [2,3], [3,4]]
<strong>输出：</strong>2
<strong>解释：</strong>最长的数对链是 [1,2] -&gt; [3,4] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>pairs = [[1,2],[7,8],[4,5]]
<b>输出：</b>3
<b>解释：</b>最长的数对链是 [1,2] -&gt; [4,5] -&gt; [7,8] 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == pairs.length</code></li>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>-1000 &lt;= left<sub>i</sub> &lt; right<sub>i</sub> &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0300：最长递增子序列](/leetcode/0300)
- [0491：非递减子序列](/leetcode/0491)
- [2771：构造最长非递减子数组（1791 分）](/leetcode/2771)


## 分析

类似 {{< lc "0435" >}}，贪心地选第二个数最小的数对即可。

## 解答

```python
def findLongestChain(self, pairs: List[List[int]]) -> int:
    pairs.sort(key=lambda x: x[1])
    res, end = 0, float('-inf')
    for s, e in pairs:
        if s>end:
            res += 1
            end = e
    return res
```
56 ms

