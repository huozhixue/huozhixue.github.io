# 3269：构建两个递增数组（★★）


> <u>**[力扣第 3269 题](https://leetcode.cn/problems/constructing-two-increasing-arrays/)**</u>

## 题目

<p>给定两个只包含 0 和 1 的整数数组 <code>nums1</code> 和 <code>nums2</code>，你的任务是执行下面操作后使数组 <code>nums1</code> 和 <code>nums2</code> 中 <strong>最大</strong> 可达数字 <strong>尽可能小</strong>。</p>

<p>将每个 0 替换为正偶数，将每个 1 替换为正奇数。在替换后，两个数组都应该 <strong>递增</strong> 并且每个整数 <strong>至多</strong> 被使用一次。</p>

<p>返回执行操作后最小的最大可达数字。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums1 = [], nums2 = [1,0,1,1]</span></p>

<p><span class="example-io"><b>输出：</b>5</span></p>

<p><strong>解释：</strong></p>

<p>在替换之后， <code>nums1 = []</code> 与 <code>nums2 = [1, 2, 3, 5]</code>。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums1 = [0,1,0,1], nums2 = [1,0,0,1]</span></p>

<p><span class="example-io"><b>输出：</b>9</span></p>

<p><strong>解释：</strong></p>

<p>有最大元素 9 的一种替换方式， <code>nums1 = [2, 3, 8, 9]</code> 与 <code>nums2 = [1, 4, 6, 7]</code>。</p>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums1 = [0,1,0,0,1], nums2 = [0,0,0,1]</span></p>

<p><span class="example-io"><b>输出：</b>13</span></p>

<p><strong>解释：</strong></p>

<p>有最大元素 13 的一种替换方式，<code>nums1 = [2, 3, 4, 6, 7]</code> 与 <code>nums2 = [8, 10, 12, 13]</code>。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= nums1.length &lt;= 1000</code></li>
<li><code>1 &lt;= nums2.length &lt;= 1000</code></li>
<li><code>nums1</code> 和 <code>nums2</code> 只包含 0 和 1。</li>
</ul>




## 分析

- 按最大的是 nums1 末尾还是 nums2 末尾递推即可

## 解答


```python
class Solution:
    def minLargest(self, nums1: List[int], nums2: List[int]) -> int:
        m,n = len(nums1),len(nums2)
        f = [[inf]*(n+1) for _ in range(m+1)]
        f[0][0] = 0
        for i in range(m+1):
            for j in range(n+1):
                if i:
                    x = f[i-1][j]
                    x += 2 if (x+1)&1^nums1[i-1] else 1
                    f[i][j] = min(f[i][j],x)
                if j:
                    x = f[i][j-1]
                    x += 2 if (x+1)&1^nums2[j-1] else 1
                    f[i][j] = min(f[i][j],x)
        return f[-1][-1]
```
2328 ms
