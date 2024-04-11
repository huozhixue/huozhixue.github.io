# 0018：四数之和（★）


> <u>**[力扣第 18 题](https://leetcode.cn/problems/4sum/)**</u>

## 题目

<p>给你一个由 <code>n</code> 个整数组成的数组 <code>nums</code> ，和一个目标值 <code>target</code> 。请你找出并返回满足下述全部条件且<strong>不重复</strong>的四元组 <code>[nums[a], nums[b], nums[c], nums[d]]</code> （若两个四元组元素一一对应，则认为两个四元组重复）：</p>

<ul>
<li><code>0 &lt;= a, b, c, d &lt; n</code></li>
<li><code>a</code>、<code>b</code>、<code>c</code> 和 <code>d</code> <strong>互不相同</strong></li>
<li><code>nums[a] + nums[b] + nums[c] + nums[d] == target</code></li>
</ul>

<p>你可以按 <strong>任意顺序</strong> 返回答案 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,0,-1,0,-2,2], target = 0
<strong>输出：</strong>[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,2,2,2], target = 8
<strong>输出：</strong>[[2,2,2,2]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 200</code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析


类似 {{< lc "0015" >}}，不过是多加了一重循环。

## 解答

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        d = {x:i for i,x in enumerate(nums)}
        res = []
        for i in range(n):
            if i and nums[i]==nums[i-1]:
                continue
            for j in range(i+1,n):
                if j>i+1 and nums[j]==nums[j-1]:
                    continue
                for k in range(j+1,n):
                    if k>j+1 and nums[k]==nums[k-1]:
                        continue
                    t = target-nums[i]-nums[j]-nums[k]
                    if d.get(t,-1)>k:
                        res.append((nums[i],nums[j],nums[k],t))
        return res
```
时间 O(N^3)，662 ms

### *附加

本题的循环轮数较多，可以加强限制，例如：
- sum(nums[i:i+4])>target 时可以跳出循环
- nums[i]+sum(nums[-3:])<target 时，可以跳过 i


```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        d = {x: i for i, x in enumerate(nums)}
        res, n = [], len(nums)
        for i in range(n-3):
            if sum(nums[i:i+4])>target:
                break
            if (i and nums[i]==nums[i-1]) or nums[i]+sum(nums[-3:])<target:
                continue
            for j in range(i+1, n-2):
                if nums[i]+sum(nums[j:j+3])>target:
                    break
                if (j>i+1 and nums[j]==nums[j-1]) or nums[i]+nums[j]+sum(nums[-2:])<target:
                    continue
                for k in range(j+1, n-1):
                    if nums[i]+nums[j]+sum(nums[k:k+2])>target:
                        break
                    if k>j+1 and nums[k]==nums[k-1]:
                        continue
                    t = target-nums[i]-nums[j]-nums[k]
                    if d.get(t,-1)>k:
                        res.append([nums[i], nums[j], nums[k], t])
        return res
```
51 ms
