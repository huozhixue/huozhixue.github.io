# 3018：可处理的最大删除操作数 I（★★）


> <u>**[力扣第 3018 题](https://leetcode.cn/problems/maximum-number-of-removal-queries-that-can-be-processed-i/)**</u>

## 题目

<p>给定一个下标 <strong>从 0 开始</strong> 的数组 <code>nums</code> 和一个下标 <strong>从</strong> <strong>0 开始 </strong>的数组 <code>queries</code>。</p>

<p>你可以在开始时执行以下操作 <strong>最多一次</strong>：</p>

<ul>
<li>用 <code>nums</code> 的 <span data-keyword="subsequence-array">子序列</span> 替换 <code>nums</code>。</li>
</ul>

<p>我们以给定的<code>queries</code>顺序处理查询；对于<code>queries[i]</code>，我们执行以下操作：</p>

<ul>
<li>如果 <code>nums</code> 的第一个 <strong>和</strong> 最后一个元素 <strong>小于</strong> <code>queries[i]</code>，则查询处理 <strong>结束</strong>。</li>
<li>否则，从 <code>nums</code> 选择第一个 <strong>或</strong> 最后一个元素，要求其<strong>大于或等于</strong> <code>queries[i]</code>，然后将其从 <code>nums</code> 中 <strong>删除</strong>。</li>
</ul>

<p>返回通过以最佳方式执行该操作可以处理的 <strong>最多 </strong>次数。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4,5], queries = [1,2,3,4,6]
<strong>输出：</strong>4
<strong>解释：</strong>我们不执行任何操作，并按如下方式处理查询：
1- 我们选择并移除 nums[0]，因为 1 &lt;= 1，那么 nums 就变成 [2,3,4,5]。
2- 我们选择并移除 nums[0]，因为 2 &lt;= 2，那么 nums 就变成 [3,4,5]。
3- 我们选择并移除 nums[0]，因为 3 &lt;= 3，那么 nums 就变成 [4,5]。
4- 我们选择并移除 nums[0]，因为 4 &lt;= 4，那么 nums 就变成 [5]。
5- 我们不能从 nums 中选择任何元素，因为它们不大于或等于 5。
因此，答案为 4。
可以看出，我们不能处理超过 4 个查询。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,3,2], queries = [2,2,3]
<b>输出：</b>3
<strong>解释：</strong>我们不做任何操作，按如下方式处理查询：
1- 我们选择并移除 nums[0]，因为 2 &lt;= 2，那么 nums 就变成 [3,2]。
2- 我们选择并移除 nums[1]，因为 2 &lt;= 2，那么 nums 就变成 [3]。
3- 我们选择并移除 nums[0]，因为 3 &lt;= 3，那么 nums 就变成 []。
因此，答案为 3。
可以看出，我们不能处理超过 3 个查询。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,4,3], queries = [4,3,2]
<strong>输出：</strong>2
<strong>解释：</strong>首先，我们用 nums 的子序列 [4,3] 替换 nums。
然后，我们可以按如下方式处理查询：
1- 我们选择并移除 nums[0]，因为 4 &lt;= 4，那么 nums 就变成 [3]。
2- 我们选择并移除 nums[0]，因为 3 &lt;= 3，那么 nums 就变成 []。
3- 我们无法处理更多查询，因为 nums 为空。
因此，答案为 2。
可以看出，我们不能处理超过 2 个查询。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>1 &lt;= queries.length &lt;= 1000</code></li>
<li><code>1 &lt;= nums[i], queries[i] &lt;= 10<sup>9</sup></code></li>
</ul>




## 分析

- 为了方便，令 A=nums, B=A[::-1] 
- 令 f[i][j] 代表用 A[:i] 和 B[:j] 能处理的最大次数
- 按最后由谁处理即可递推
- 注意保证 i+j<=n

## 解答

```python
class Solution:
    def maximumProcessableQueries(self, nums: List[int], queries: List[int]) -> int:
        n = len(nums)
        m = len(queries)
        A,B = nums,nums[::-1]
        f = [[0]*(n-i+1) for i in range(n+1)]
        for i in range(n+1):
            for j in range(n-i+1):
                if i:
                    a = f[i-1][j]
                    f[i][j] = a+(A[i-1]>=queries[a])
                if j:
                    b = f[i][j-1]
                    f[i][j] = max(f[i][j],b+(B[j-1]>=queries[b]))
                if f[i][j]==m:
                    return m
        return max(sub[-1] for sub in f)
```
3458 ms


