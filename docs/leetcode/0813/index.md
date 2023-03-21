# 0813：最大平均值和的分组（★）


> <u>**[力扣第 79 场周赛第 3 题](https://leetcode.cn/problems/largest-sum-of-averages/)**</u>

## 题目

<p>给定数组 <code>nums</code> 和一个整数 <code>k</code> 。我们将给定的数组 <code>nums</code> 分成 <strong>最多</strong> <code>k</code> 个相邻的非空子数组 。 <strong>分数</strong> 由每个子数组内的平均值的总和构成。</p>

<p>注意我们必须使用 <code>nums</code> 数组中的每一个数进行分组，并且分数不一定需要是整数。</p>

<p>返回我们所能得到的最大 <strong>分数</strong> 是多少。答案误差在 <code>10<sup>-6</sup></code> 内被视为是正确的。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [9,1,2,3,9], k = 3
<strong>输出:</strong> 20.00000
<strong>解释:</strong>
nums 的最优分组是[9], [1, 2, 3], [9]. 得到的分数是 9 + (1 + 2 + 3) / 3 + 9 = 20.
我们也可以把 nums 分成[9, 1], [2], [3, 9].
这样的分组得到的分数为 5 + 2 + 6 = 13, 但不是最大值.
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,3,4,5,6,7], k = 4
<strong>输出:</strong> 20.50000
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 100</code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= k &lt;= nums.length</code></li>
</ul>


## 分析

按最后一组的长度即可转为递归子问题。

可以用前缀和优化递推过程。


## 解答

```python
def largestSumOfAverages(self, nums: List[int], k: int) -> float:
    @lru_cache(None)
    def dfs(j, k):
        if j == 0:
            return 0
        if k == 0:
            return float('-inf')
        return max((pre[j]-pre[i])/(j-i)+dfs(i, k-1) for i in range(j))

    n, pre = len(nums), list(accumulate([0]+nums))
    return dfs(n, k)
```
232 ms



