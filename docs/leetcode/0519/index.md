# 0519：随机翻转矩阵（★）


> <u>**[力扣第 519 题](https://leetcode.cn/problems/random-flip-matrix/)**</u>

## 题目

<p>给你一个 <code>m x n</code> 的二元矩阵 <code>matrix</code> ，且所有值被初始化为 <code>0</code> 。请你设计一个算法，随机选取一个满足 <code>matrix[i][j] == 0</code> 的下标 <code>(i, j)</code> ，并将它的值变为 <code>1</code> 。所有满足 <code>matrix[i][j] == 0</code> 的下标 <code>(i, j)</code> 被选取的概率应当均等。</p>

<p>尽量最少调用内置的随机函数，并且优化时间和空间复杂度。</p>

<p>实现 <code>Solution</code> 类：</p>

<ul>
<li><code>Solution(int m, int n)</code> 使用二元矩阵的大小 <code>m</code> 和 <code>n</code> 初始化该对象</li>
<li><code>int[] flip()</code> 返回一个满足 <code>matrix[i][j] == 0</code> 的随机下标 <code>[i, j]</code> ，并将其对应格子中的值变为 <code>1</code></li>
<li><code>void reset()</code> 将矩阵中所有的值重置为 <code>0</code></li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["Solution", "flip", "flip", "flip", "reset", "flip"]
[[3, 1], [], [], [], [], []]
<strong>输出</strong>
[null, [1, 0], [2, 0], [0, 0], null, [2, 0]]

<strong>解释</strong>
Solution solution = new Solution(3, 1);
solution.flip();  // 返回 [1, 0]，此时返回 [0,0]、[1,0] 和 [2,0] 的概率应当相同
solution.flip();  // 返回 [2, 0]，因为 [1,0] 已经返回过了，此时返回 [2,0] 和 [0,0] 的概率应当相同
solution.flip();  // 返回 [0, 0]，根据前面已经返回过的下标，此时只能返回 [0,0]
solution.reset(); // 所有值都重置为 0 ，并可以再次选择下标返回
solution.flip();  // 返回 [2, 0]，此时返回 [0,0]、[1,0] 和 [2,0] 的概率应当相同</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>
<li>每次调用<code>flip</code> 时，矩阵中至少存在一个值为 0 的格子。</li>
<li>最多调用 <code>1000</code> 次 <code>flip</code> 和 <code>reset</code> 方法。</li>
</ul>




## 分析

- 调用次数最多 1000，可以考虑暴力拒绝采样
- 一个更优的方法是类似 {{< lc "0380" >}} 的想法，将随机到的下标交换到末尾弹出
	- 由于值域太大，因此考虑用哈希表维护交换过的下标，其它的无需维护


## 解答

```python
class Solution:

    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n
        self.s = m*n
        self.d = {}

    def flip(self) -> List[int]:
        x = random.randrange(self.s)
        res = self.d.get(x,x)
        self.s -= 1
        self.d[x] = self.d.get(self.s,self.s)
        return divmod(res,self.n)

    def reset(self) -> None:
        self.s = self.m*self.n
        self.d.clear()
```
47 ms
