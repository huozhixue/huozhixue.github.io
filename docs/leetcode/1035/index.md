# 1035：不相交的线（1805 分）


> <u>**[力扣第 134 场周赛第 3 题](https://leetcode.cn/problems/uncrossed-lines/)**</u>

## 题目

<p>在两条独立的水平线上按给定的顺序写下 <code>nums1</code> 和 <code>nums2</code> 中的整数。</p>

<p>现在，可以绘制一些连接两个数字 <code>nums1[i]</code> 和 <code>nums2[j]</code> 的直线，这些直线需要同时满足：</p>

<ul>
<li> <code>nums1[i] == nums2[j]</code></li>
<li>且绘制的直线不与任何其他连线（非水平线）相交。</li>
</ul>

<p>请注意，连线即使在端点也不能相交：每个数字只能属于一条连线。</p>

<p>以这种方法绘制线条，并返回可以绘制的最大连线数。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/04/26/142.png" style="width: 400px; height: 286px;" />
<pre>
<strong>输入：</strong>nums1 = <span id="example-input-1-1">[1,4,2]</span>, nums2 = <span id="example-input-1-2">[1,2,4]</span>
<strong>输出：</strong><span id="example-output-1">2</span>
<strong>解释：</strong>可以画出两条不交叉的线，如上图所示。
但无法画出第三条不相交的直线，因为从 nums1[1]=4 到 nums2[2]=4 的直线将与从 nums1[2]=2 到 nums2[1]=2 的直线相交。
</pre>

<div>
<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = <span id="example-input-2-1">[2,5,1,2,5]</span>, nums2 = <span id="example-input-2-2">[10,5,2,1,5,2]</span>
<strong>输出：</strong><span id="example-output-2">3</span>
</pre>

<div>
<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums1 = <span id="example-input-3-1">[1,3,7,1,7,5]</span>, nums2 = <span id="example-input-3-2">[1,9,2,5,1]</span>
<strong>输出：</strong><span id="example-output-3">2</span></pre>


</div>
</div>

<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length, nums2.length &lt;= 500</code></li>
<li><code>1 &lt;= nums1[i], nums2[j] &lt;= 2000</code></li>
</ul>




**相似问题：**
- [0072：编辑距离](/leetcode/0072)


## 分析

等价于求最长公共子序列。
## 解答


```python
class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        m,n = len(nums1),len(nums2)
        f = [0]*(n+1)
        for a in nums1:
            g = f[:]
            for j in range(1,n+1):
                if a==nums2[j-1]:
                    f[j] = 1+g[j-1]
                else:
                    f[j] = max(g[j],f[j-1])
        return f[-1]
```
112 ms
