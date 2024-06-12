# 0354：俄罗斯套娃信封问题（★★）


> <u>**[力扣第 354 题](https://leetcode.cn/problems/russian-doll-envelopes/)**</u>

## 题目

<p>给你一个二维整数数组 <code>envelopes</code> ，其中 <code>envelopes[i] = [w<sub>i</sub>, h<sub>i</sub>]</code> ，表示第 <code>i</code> 个信封的宽度和高度。</p>

<p>当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。</p>

<p>请计算 <strong>最多能有多少个</strong> 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。</p>

<p><strong>注意</strong>：不允许旋转信封。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>envelopes = [[5,4],[6,4],[6,7],[2,3]]
<strong>输出：</strong>3
<strong>解释：</strong>最多信封的个数为 <code>3, 组合为: </code>[2,3] =&gt; [5,4] =&gt; [6,7]。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>envelopes = [[1,1],[1,1],[1,1]]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= envelopes.length &lt;= 10<sup>5</sup></code></li>
<li><code>envelopes[i].length == 2</code></li>
<li><code>1 &lt;= w<sub>i</sub>, h<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

将信封按宽度排序：
- 如果宽度各不相同，等价于在高度序列中找最长递增子序列，即是问题 {{< lc "0300" >}} 
- 若存在宽度相同的信封，按高度反序排列即可

## 解答

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        A = []
        for w,h in sorted(envelopes,key=lambda p:(p[0],-p[1])):
            pos = bisect_left(A,h)
            A[pos:pos+1] = [h]
        return len(A)
```
243 ms

