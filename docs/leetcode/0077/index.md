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


## 分析

### #1

可以直接调库。

```python
def combine(self, n: int, k: int) -> List[List[int]]:
	return list(combinations(range(1, n+1), k))
```

44 ms

### #2

{{< lc "0078" >}} 升级版，添加了个数的限制。

## 解答

```python
def combine(self, n: int, k: int) -> List[List[int]]:
    def dfs(i):
        if n + 1 - i + len(path) < k:
            return
        if len(path) == k:
            res.append(path[:])
            return
        for j in range(i, n + 1):
            path.append(j)
            dfs(j+1)
            path.pop()

    res, path = [], []
    dfs(1)
    return res
```
44 ms
