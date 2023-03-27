# 0078：子集（★）


> <u>**[力扣第 78 题](https://leetcode.cn/problems/subsets/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，数组中的元素 <strong>互不相同</strong> 。返回该数组所有可能的子集（幂集）。</p>

<p>解集 <strong>不能</strong> 包含重复的子集。你可以按 <strong>任意顺序</strong> 返回解集。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
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
<li><code>nums</code> 中的所有元素 <strong>互不相同</strong></li>
</ul>


## 分析

### #1

典型的回溯问题，遍历时有取或不取两种选择。

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
    def dfs(i):
        res.append(path[:])
        for j in range(i, n):
            path.append(nums[j])
            dfs(j+1)
            path.pop()

    res, path, n = [], [], len(nums)
    dfs(0)
    return res
```
32 ms

### #2

实际应用中常用递推式的写法。

令 dp[i] 代表 nums[:i] 的所有子集，则：

$$dp[i] = dp[i-1]+[sub+[nums[i]] \ for\ sub\ in\ dp[i-1]]$$
	
## 解答

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
    res = [[]]
    for x in nums:
        res += [sub+[x] for sub in res]
    return res
```
40 ms
