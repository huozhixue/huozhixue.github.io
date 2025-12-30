# 0548：将数组分割成和相等的子数组（★★）


> <u>**[力扣第 548 题](https://leetcode.cn/problems/split-array-with-equal-sum/)**</u>

## 题目

<p>给定一个有 <code>n</code> 个整数的数组 <code>nums</code> ，如果能找到满足以下条件的三元组  <code>(i, j, k)</code>  则返回 <code>true</code> ：</p>

<ol>
<li><code>0 &lt; i, i + 1 &lt; j, j + 1 &lt; k &lt; n - 1</code></li>
<li>子数组 <code>(0, i - 1)</code> ， <code>(i + 1, j - 1)</code> ， <code>(j + 1, k - 1)</code> ， <code>(k + 1, n - 1)</code> 的和应该相等。</li>
</ol>

<p>这里我们定义子数组 <code>(l, r)</code> 表示原数组从索引为 <code>l</code> 的元素开始至索引为 <code>r</code> 的元素。</p>



<p><strong>示例 1: </strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,1,2,1,2,1]
<strong>输出:</strong> True
<strong>解释:</strong>
i = 1, j = 3, k = 5.
sum(0, i - 1) = sum(0, 0) = 1
sum(i + 1, j - 1) = sum(2, 2) = 1
sum(j + 1, k - 1) = sum(4, 4) = 1
sum(k + 1, n - 1) = sum(6, 6) = 1
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,2,1,2,1,2,1,2]
<strong>输出:</strong> false
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 2000</code></li>
<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

- 类似 {{< lc "0454" >}}，预处理两块的哈希表，再遍历剩下的两块

## 解答

```python []
class Solution:
    def splitArray(self, nums: List[int]) -> bool:
        n = len(nums)
        P = list(accumulate(nums))
        for j in range(3,n-3):
            vis = {P[i-1] for i in range(1,j-1) if P[i-1]==P[j-1]-P[i]}
            for k in range(j+2,n-1):
                if P[k-1]-P[j]==P[n-1]-P[k] and P[k-1]-P[j] in vis:
                    return True
        return False
```

979 ms
