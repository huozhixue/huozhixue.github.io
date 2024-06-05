# 1632：矩阵转换后的秩（2529 分）


> <u>**[力扣第 212 场周赛第 4 题](https://leetcode.cn/problems/rank-transform-of-a-matrix/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的矩阵 <code>matrix</code> ，请你返回一个新的矩阵<em> </em><code>answer</code> ，其中<em> </em><code>answer[row][col]</code> 是 <code>matrix[row][col]</code> 的秩。</p>

<p>每个元素的 <b>秩</b> 是一个整数，表示这个元素相对于其他元素的大小关系，它按照如下规则计算：</p>

<ul>
<li>秩是从 1 开始的一个整数。</li>
<li>如果两个元素 <code>p</code> 和 <code>q</code> 在 <strong>同一行</strong> 或者 <strong>同一列</strong> ，那么：
<ul>
<li>如果 <code>p < q</code> ，那么 <code>rank(p) < rank(q)</code></li>
<li>如果 <code>p == q</code> ，那么 <code>rank(p) == rank(q)</code></li>
<li>如果 <code>p > q</code> ，那么 <code>rank(p) > rank(q)</code></li>
</ul>
</li>
<li><b>秩</b> 需要越 <strong>小</strong> 越好。</li>
</ul>

<p>题目保证按照上面规则 <code>answer</code> 数组是唯一的。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank1.jpg" style="width: 442px; height: 162px;" />
<pre>
<b>输入：</b>matrix = [[1,2],[3,4]]
<b>输出：</b>[[1,2],[2,3]]
<strong>解释：</strong>
matrix[0][0] 的秩为 1 ，因为它是所在行和列的最小整数。
matrix[0][1] 的秩为 2 ，因为 matrix[0][1] > matrix[0][0] 且 matrix[0][0] 的秩为 1 。
matrix[1][0] 的秩为 2 ，因为 matrix[1][0] > matrix[0][0] 且 matrix[0][0] 的秩为 1 。
matrix[1][1] 的秩为 3 ，因为 matrix[1][1] > matrix[0][1]， matrix[1][1] > matrix[1][0] 且 matrix[0][1] 和 matrix[1][0] 的秩都为 2 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank2.jpg" style="width: 442px; height: 162px;" />
<pre>
<b>输入：</b>matrix = [[7,7],[7,7]]
<b>输出：</b>[[1,1],[1,1]]
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank3.jpg" style="width: 601px; height: 322px;" />
<pre>
<b>输入：</b>matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]
<b>输出：</b>[[4,2,3],[1,3,4],[5,1,6],[1,3,4]]
</pre>

<p><strong>示例 4：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank4.jpg" style="width: 601px; height: 242px;" />
<pre>
<b>输入：</b>matrix = [[7,3,6],[1,4,5],[9,8,2]]
<b>输出：</b>[[5,1,4],[1,2,3],[6,3,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 <= m, n <= 500</code></li>
<li><code>-10<sup>9</sup> <= matrix[row][col] <= 10<sup>9</sup></code></li>
</ul>


## 分析

先考虑简化情形：没有相同的元素。那么显然最小的元素的秩为 1，第二小的元素则要考虑是否和最小元素同行或同列。
于是得到贪心解法：

    从小到大遍历元素，并维护每行/列的最大秩，该元素的秩即为同行/列的最大秩加 1

存在相同元素时则较为复杂，假设两个相同元素同行/列，那么就要考虑到两个元素分别对应的 行/列 的最大秩。
同时还可能出现连动，比如元素 a 和 b 同行，b 和 c 同列，那么要同时考虑这三个元素。

这种连动容易想到并查集，于是用并查集将相同元素分为几个连通块，对于每个连通块，
里面所有元素对应的 行/列 最大秩 加 1，即为该连通块内所有元素的秩。

## 解答


```python
def matrixRankTransform(self, matrix: List[List[int]]) -> List[List[int]]:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    m, n = len(matrix), len(matrix[0])
    d = defaultdict(list)
    for i, j in product(range(m), range(n)):
        d[matrix[i][j]].append((i, j))
    row, col = [0] * m, [0] * n
    res = [[0] * n for _ in range(m)]
    for x in sorted(d):
        f, rank = {}, defaultdict(int)
        for i, j in d[x]:
            union(i, j+500)
        for i, j in d[x]:
            rank[find(i)] = max(rank[find(i)], row[i], col[j])
        for i, j in d[x]:
            res[i][j] = row[i] = col[j] = 1+rank[find(i)]
    return res
```
1152 ms


