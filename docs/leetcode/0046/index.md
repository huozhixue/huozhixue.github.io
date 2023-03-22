# 0046：全排列（★）


> <u>**[力扣第 46 题](https://leetcode.cn/problems/permutations/)**</u>

## 题目

<p>给定一个不含重复数字的数组 <code>nums</code> ，返回其 <em>所有可能的全排列</em> 。你可以 <strong>按任意顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1]
<strong>输出：</strong>[[0,1],[1,0]]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>[[1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 6</code></li>
<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>
</ul>


## 分析 

### #1

python 里可以直接调库。

```python
def permute(self, nums: List[int]) -> List[List[int]]:
	return list(permutations(nums))
```

40 ms

### #2

自己实现可以用 dfs，依次选择数字即可。
注意标记选过的数字。

## 解答

```python
def permute(self, nums: List[int]) -> List[List[int]]:
    def dfs(path):
        if len(path) == len(nums):
            res.append(path)
        for i, num in enumerate(nums):
            if i not in vis:
                vis.add(i)
                dfs(path+[num])
                vis.remove(i)
                
    res, vis = [], set()
    dfs([])
    return res
```
28 ms

