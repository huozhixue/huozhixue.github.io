# 0047：全排列 II（★）


> <u>**[力扣第 47 题](https://leetcode.cn/problems/permutations-ii/)**</u>

## 题目

<p>给定一个可包含重复数字的序列 <code>nums</code> ，<em><strong>按任意顺序</strong></em> 返回所有不重复的全排列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,2]
<strong>输出：</strong>
[[1,1,2],
[1,2,1],
[2,1,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 8</code></li>
<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
</ul>


## 分析 

### #1

依然可以调库。

```python
def permuteUnique(self, nums: List[int]) -> List[List[int]]:
	return list(set(permutations(nums)))
```
64 ms

### #2

与 {{< lc "0046" >}} 的区别是有重复数字。
所以把 nums 排序后再遍历。

每个位置选数字时，在未标记集合中选重复数字最前面的，从而保证排列不重复。


## 解答

```python
def permuteUnique(self, nums: List[int]) -> List[List[int]]:
    def dfs(path):
        if len(path) == len(nums):
            res.append(path)
            return
        for i, num in enumerate(nums):
            if i and nums[i-1] == num and i-1 not in vis:
                continue
            if i not in vis:
                vis.add(i)
                dfs(path + [num])
                vis.remove(i)

    res, vis = [], set()
    nums.sort()
    dfs([])
    return res
```
40 ms

