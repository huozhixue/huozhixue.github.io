# 0090：子集 II（★）


> <u>**[力扣第 90 题](https://leetcode.cn/problems/subsets-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。</p>

<p>解集 <strong>不能</strong> 包含重复的子集。返回的解集中，子集可以按 <strong>任意顺序</strong> 排列。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,2]
<strong>输出：</strong>[[],[1],[1,2],[1,2,2],[2],[2,2]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0]
<strong>输出：</strong>[[],[0]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10</code></li>
<li><code>-10 <= nums[i] <= 10</code></li>
</ul>
</div>
</div>


## 分析

{{< lc "0078" >}} 升级版，区别在于可能有重复数字，采用排序并跳过相同数字的通用方法即可。

## 解答

```python
def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
    def dfs(i):
        res.append(path[:])
        for j in range(i, n):
            if j > i and nums[j] == nums[j - 1]:
                continue
            path.append(nums[j])
            dfs(j + 1)
            path.pop()

    res, path, n = [], [], len(nums)
    nums.sort()
    dfs(0)
    return res
```
28 ms
