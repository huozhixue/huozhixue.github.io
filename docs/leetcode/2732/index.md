# 2732：找到矩阵中的好子集（2239 分）


> <u>**[力扣第 106 场双周赛第 4 题](https://leetcode.cn/problems/find-a-good-subset-of-the-matrix/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始大小为 <code>m x n</code> 的二进制矩阵 <code>grid</code> 。</p>

<p>从原矩阵中选出若干行构成一个行的 <strong>非空 </strong>子集，如果子集中任何一列的和至多为子集大小的一半，那么我们称这个子集是 <strong>好子集</strong>。</p>

<p>更正式的，如果选出来的行子集大小（即行的数量）为 k，那么每一列的和至多为 <code>floor(k / 2)</code> 。</p>

<p>请你返回一个整数数组，它包含好子集的行下标，请你将其 <b>升序</b> 返回。</p>

<p>如果有多个好子集，你可以返回任意一个。如果没有好子集，请你返回一个空数组。</p>

<p>一个矩阵 <code>grid</code> 的行 <strong>子集</strong> ，是删除 <code>grid</code> 中某些（也可能不删除）行后，剩余行构成的元素集合。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>grid = [[0,1,1,0],[0,0,0,1],[1,1,1,1]]
<b>输出：</b>[0,1]
<b>解释：</b>我们可以选择第 0 和第 1 行构成一个好子集。
选出来的子集大小为 2 。
- 第 0 列的和为 0 + 0 = 0 ，小于等于子集大小的一半。
- 第 1 列的和为 1 + 0 = 1 ，小于等于子集大小的一半。
- 第 2 列的和为 1 + 0 = 1 ，小于等于子集大小的一半。
- 第 3 列的和为 0 + 1 = 1 ，小于等于子集大小的一半。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>grid = [[0]]
<b>输出：</b>[0]
<strong>解释：</strong>我们可以选择第 0 行构成一个好子集。
选出来的子集大小为 1 。
- 第 0 列的和为 0 ，小于等于子集大小的一半。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>grid = [[1,1,1],[1,1,1]]
<b>输出：</b>[]
<b>解释：</b>没有办法得到一个好子集。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= n &lt;= 5</code></li>
<li><code>grid[i][j]</code> 要么是 <code>0</code> ，要么是 <code>1</code> 。</li>
</ul>




## 分析

- 可以证明，如果不存在 1 行和 2 行的答案，则无解，详细见 [严格证明+三种计算方法（Python/Java/C++/Go）](https://leetcode.cn/problems/find-a-good-subset-of-the-matrix/solutions/2305490/xiang-xi-fen-xi-wei-shi-yao-zhi-duo-kao-mbl6a/)
- 所以遍历时，有全 0 的行就返回，否则查找当前行的补集的子集即可

## 解答

```python
class Solution:
    def goodSubsetofBinaryMatrix(self, grid: List[List[int]]) -> List[int]:
        m,n = len(grid),len(grid[0])
        d = {}
        for i,row in enumerate(grid):
            st = sum(1<<j for j,x in enumerate(row) if x==1)
            if st==0:
                return [i]
            st2 = y = st^((1<<n)-1)
            while y:
                if y in d:
                    return [d[y],i]
                y = (y-1)&st2
            d[st] = i
        return []
```
109 ms

