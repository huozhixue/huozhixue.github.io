# 1253：重构 2 行二进制矩阵（★）


> <u>**[力扣第 162 场周赛第 2 题](https://leetcode.cn/problems/reconstruct-a-2-row-binary-matrix/)**</u>

## 题目

<p>给你一个 <code>2</code> 行 <code>n</code> 列的二进制数组：</p>

<ul>
<li>矩阵是一个二进制矩阵，这意味着矩阵中的每个元素不是 <code>0</code> 就是 <code>1</code>。</li>
<li>第 <code>0</code> 行的元素之和为 <code>upper</code>。</li>
<li>第 <code>1</code> 行的元素之和为 <code>lower</code>。</li>
<li>第 <code>i</code> 列（从 <code>0</code> 开始编号）的元素之和为 <code>colsum[i]</code>，<code>colsum</code> 是一个长度为 <code>n</code> 的整数数组。</li>
</ul>

<p>你需要利用 <code>upper</code>，<code>lower</code> 和 <code>colsum</code> 来重构这个矩阵，并以二维整数数组的形式返回它。</p>

<p>如果有多个不同的答案，那么任意一个都可以通过本题。</p>

<p>如果不存在符合要求的答案，就请返回一个空的二维数组。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>upper = 2, lower = 1, colsum = [1,1,1]
<strong>输出：</strong>[[1,1,0],[0,0,1]]
<strong>解释：</strong>[[1,0,1],[0,1,0]] 和 [[0,1,1],[1,0,0]] 也是正确答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>upper = 2, lower = 3, colsum = [2,2,1,1]
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>upper = 5, lower = 5, colsum = [2,1,2,0,1,0,1,2,0,1]
<strong>输出：</strong>[[1,1,1,0,1,0,0,1,0,0],[1,0,1,0,0,0,1,1,0,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= colsum.length &lt;= 10^5</code></li>
<li><code>0 &lt;= upper, lower &lt;= colsum.length</code></li>
<li><code>0 &lt;= colsum[i] &lt;= 2</code></li>
</ul>


## 分析

python 贪心
- 列和为 0 或 2 时，显然只有一种分法
- 列和为 1 时，优先分 upper 和 lower 中较大的
- 用了后，更新 upper  和 lower
- 遍历完毕后，upper 和 lower 都刚好分完，即是答案，否则返回空

## 解答


```python
def reconstructMatrix(self, upper: int, lower: int, colsum: List[int]) -> List[List[int]]:
    res = [[], []]
    for x in colsum:
        a,b = (x//2,x//2) if x!=1 else (1,0) if upper>=lower else (0,1)
        upper,lower = upper-a,lower-b
        res[0].append(a)
        res[1].append(b)
    return res if upper==lower==0 else []
```
124 ms
