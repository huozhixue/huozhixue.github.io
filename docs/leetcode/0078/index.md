# 0078：子集（★）


> <u>**[力扣第 78 题](https://leetcode.cn/problems/subsets/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，数组中的元素 <strong>互不相同</strong> 。返回该数组所有可能的<span data-keyword="subset">子集</span>（幂集）。</p>

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
<li><code>1 &lt;= nums.length &lt;= 10</code></li>
<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
<li><code>nums</code> 中的所有元素 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0090：子集 II](/leetcode/0090)
- [0320：列举单词的全部缩写](/leetcode/0320)
- [0784：字母大小写全排列（1341 分）](/leetcode/0784)
- [1982：从子集的和还原数组（2872 分）](/leetcode/1982)
- [2044：统计按位或能得到最大值的子集数目（1567 分）](/leetcode/2044)


## 分析

### #1

可以用回溯。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        def dfs(i):
            if i==len(nums):
                res.append(path[:])
                return
            dfs(i+1)
            path.append(nums[i])
            dfs(i+1)
            path.pop()
        res,path = [],[]
        dfs(0)
        return res
```
42 ms

### #2

也可以直接递推。

## 解答

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = [[]]
        for x in nums:
            res.extend([sub+[x] for sub in res])
        return res
```
41 ms
