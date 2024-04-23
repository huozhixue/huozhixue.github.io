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

### #1

{{< lc "0078" >}} 升级版，区别在于有重复数字，回溯时用 Counter 计数即可。

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        def dfs(i):
            if i==len(A):
                res.append(path[:])
                return
            dfs(i+1)
            x,w = A[i]
            if w:
                A[i][1]-=1
                path.append(x)
                dfs(i)
                path.pop()
                A[i][1]+=1
        res,path = [],[]
        A = [[x,w] for x,w in Counter(nums).items()]
        dfs(0)
        return res
```
29 ms


### #2

也可以直接递推。

## 解答

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res = [[]]
        for x,w in Counter(nums).items():
            res += [sub+[x]*k for sub in res for k in range(1,w+1)]
        return res
```
37 ms
