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

### #1

调用次数最多 1000，所以可以考虑暴力法。维护值为 1 的下标集合，每轮拒绝采样即可。

```python
class Solution:

    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n
        self.vis = set()

    def flip(self) -> List[int]:
        while True:
            i = random.randint(0, self.m-1)
            j = random.randint(0, self.n-1)
            if (i, j) not in self.vis:
                self.vis.add((i, j))
                return [i, j]

    def reset(self) -> None:
        self.vis = set()
```
时间复杂度 O(K^2) （K 为调用次数），76 ms

### #2

还有个巧妙的方法是类似 {{< lc "0710" >}}，将返回过的下标映射为连续区间，从而方便随机。

具体来说：
    
    设数组 A=list(range(m*n))，将 (i, j) 看作是 A 的下标 i*n+j
    设已经选过了 cnt 个下标，并且都交换到了 A[:cnt]
    用哈希表 d 维护 A[cnt:] 中经过了交换的数
    那么调用 flip 时
        随机一个 >=cnt 的下标 y，A[y]=d.get(y,y)，转回二维坐标 (i,j) 即是结果
        更新 d[y] = d.get(cnt, cnt)，代表 A[y] 和 A[cnt] 进行了交换

## 解答

```python
class Solution:

    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n
        self.cnt = 0
        self.d = {}

    def flip(self) -> List[int]:
        y = random.randint(self.cnt, self.m*self.n-1)
        x = self.d.get(y, y)
        self.d[y] = self.d.get(self.cnt, self.cnt)
        self.cnt += 1
        return [x // self.n, x % self.n]
        
    def reset(self) -> None:
        self.cnt = 0
        self.d = {}
```
56 ms
