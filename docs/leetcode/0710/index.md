# 0710：黑名单中的随机数（★★）


> <u>**[力扣第 710 题](https://leetcode.cn/problems/random-pick-with-blacklist/)**</u>

## 题目

<p>给定一个整数 <code>n</code> 和一个 <strong>无重复</strong> 黑名单整数数组 <code>blacklist</code> 。设计一种算法，从 <code>[0, n - 1]</code> 范围内的任意整数中选取一个 <strong>未加入 </strong>黑名单 <code>blacklist</code> 的整数。任何在上述范围内且不在黑名单 <code>blacklist</code> 中的整数都应该有 <strong>同等的可能性</strong> 被返回。</p>

<p>优化你的算法，使它最小化调用语言 <strong>内置</strong> 随机函数的次数。</p>

<p>实现 <code>Solution</code> 类:</p>

<ul>
<li><code>Solution(int n, int[] blacklist)</code> 初始化整数 <code>n</code> 和被加入黑名单 <code>blacklist</code> 的整数</li>
<li><code>int pick()</code> 返回一个范围为 <code>[0, n - 1]</code> 且不在黑名单 <code>blacklist</code> 中的随机整数</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["Solution", "pick", "pick", "pick", "pick", "pick", "pick", "pick"]
[[7, [2, 3, 5]], [], [], [], [], [], [], []]
<strong>输出</strong>
[null, 0, 4, 1, 6, 1, 0, 4]

<b>解释
</b>Solution solution = new Solution(7, [2, 3, 5]);
solution.pick(); // 返回0，任何[0,1,4,6]的整数都可以。注意，对于每一个pick的调用，
// 0、1、4和6的返回概率必须相等(即概率为1/4)。
solution.pick(); // 返回 4
solution.pick(); // 返回 1
solution.pick(); // 返回 6
solution.pick(); // 返回 1
solution.pick(); // 返回 0
solution.pick(); // 返回 4
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= blacklist.length &lt;= min(10<sup>5</sup>, n - 1)</code></li>
<li><code>0 &lt;= blacklist[i] &lt; n</code></li>
<li><code>blacklist</code> 中所有值都 <strong>不同</strong></li>
<li> <code>pick</code> 最多被调用 <code>2 * 10<sup>4</sup></code> 次</li>
</ul>


**相似问题：**
- [0398：随机数索引](/leetcode/0398)
- [0528：按权重随机选择](/leetcode/0528)
- [1980：找出不同的二进制字符串（1361 分）](/leetcode/1980)


## 分析

### #1

- 设黑名单长度 m，那么考虑建立 [0,n-m-1] 和不在黑名单中的数的映射
- 假设 x 映射得到的数是 y，y-x 即是 <=y 的黑名单的个数
- 那么 y 减去 <=y 的黑名单的个数即是原来的 x，这是递增的
- 因此给定 x，可以二分查找到 y
	- 注意为了不定位到黑名单，计算的是 <=y 而不是 <y 的个数

```python
class Solution:

    def __init__(self, n: int, blacklist: List[int]):
        self.A = sorted(blacklist)
        self.n = n
        self.k = n-len(self.A)

    def pick(self) -> int:
        def cal(y):
            return y-bisect_right(self.A,y)

        x = randrange(self.k)
        return bisect_left(range(self.n),x,key=cal)
```
567 ms

### #2

- 还有种直接建立映射的方法
- 注意到 n-m 很大，而 m 较小，该映射中大部分数其实是不变的
- 因此考虑只对变化的数做映射
	- [0,n-m-1] 范围内要变化的数其实就是该范围内黑名单中的数
	- 而映射得到的数其实就是 [n-m,n-1] 范围内不在黑名单中的数
- pick 时，随机选一个 [0,n-m-1] 范围内的数，映射即可 

## 解答

```python
class Solution:

    def __init__(self, n: int, blacklist: List[int]):
        m = len(blacklist)
        vis = set(blacklist)
        A = [x for x in blacklist if x<n-m]
        B = [y for y in range(n-m,n) if y not in vis]
        self.k = n-m
        self.d = dict(zip(A,B))

    def pick(self) -> int:
        x = randrange(self.k)
        return self.d.get(x,x)
```
87 ms

