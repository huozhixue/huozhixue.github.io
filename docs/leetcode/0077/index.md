# 0077：组合（★）


> <u>**[力扣第 77 题](https://leetcode.cn/problems/combinations/)**</u>

## 题目

<p>给定两个整数 <code>n</code> 和 <code>k</code>，返回范围 <code>[1, n]</code> 中所有可能的 <code>k</code> 个数的组合。</p>

<p>你可以按 <strong>任何顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 4, k = 2
<strong>输出：</strong>
[
[2,4],
[3,4],
[2,3],
[1,2],
[1,3],
[1,4],
]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1, k = 1
<strong>输出：</strong>[[1]]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 20</code></li>
<li><code>1 <= k <= n</code></li>
</ul>


**相似问题：**
- [0039：组合总和](/leetcode/0039)
- [0046：全排列](/leetcode/0046)


## 分析


除了直接调库，可以用回溯。

## 解答

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        def dfs(i):
            if i>n or len(path)==k:
                if len(path)==k:
                    res.append(path[:])
                return
            dfs(i+1)
            path.append(i)
            dfs(i+1)
            path.pop()
        res,path = [],[]
        dfs(1)
        return res
```
198 ms
