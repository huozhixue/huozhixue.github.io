# 0887：鸡蛋掉落（2376 分）


> <u>**[力扣第 97 场周赛第 4 题](https://leetcode.cn/problems/super-egg-drop/)**</u>

## 题目

<p>给你 <code>k</code> 枚相同的鸡蛋，并可以使用一栋从第 <code>1</code> 层到第 <code>n</code> 层共有 <code>n</code> 层楼的建筑。</p>

<p>已知存在楼层 <code>f</code> ，满足 <code>0 <= f <= n</code> ，任何从<strong> 高于</strong> <code>f</code> 的楼层落下的鸡蛋都会碎，从 <code>f</code> 楼层或比它低的楼层落下的鸡蛋都不会破。</p>

<p>每次操作，你可以取一枚没有碎的鸡蛋并把它从任一楼层 <code>x</code> 扔下（满足 <code>1 <= x <= n</code>）。如果鸡蛋碎了，你就不能再次使用它。如果某枚鸡蛋扔下后没有摔碎，则可以在之后的操作中 <strong>重复使用</strong> 这枚鸡蛋。</p>

<p>请你计算并返回要确定 <code>f</code> <strong>确切的值</strong> 的 <strong>最小操作次数</strong> 是多少？</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>k = 1, n = 2
<strong>输出：</strong>2
<strong>解释：</strong>
鸡蛋从 1 楼掉落。如果它碎了，肯定能得出 f = 0 。
否则，鸡蛋从 2 楼掉落。如果它碎了，肯定能得出 f = 1 。
如果它没碎，那么肯定能得出 f = 2 。
因此，在最坏的情况下我们需要移动 2 次以确定 f 是多少。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>k = 2, n = 6
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>k = 3, n = 14
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= k <= 100</code></li>
<li><code>1 <= n <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [1884：鸡蛋掉落-两枚鸡蛋](/leetcode/1884)


## 分析

- 经典问题，最优的方法是反过来算扔 i 次能确定多少楼层
	- 令 g[i][j] 代表 j 枚鸡蛋扔 i 次能确定的楼层数
	- 问题即是求最小的 i 使得 g[i][k]>=n
- 然后考虑如何递推 g[i][j]
	- 假设第一次在楼层 x 扔鸡蛋，如果鸡蛋碎了
		- 还能用 j-1 枚鸡蛋扔 i-1 次，要保证 g[i-1]][j-1]>=x-1，才能确定楼层
		- 因此最优的选择是让 x=g[i-1]][j-1]+1
	- 如果鸡蛋没碎
		- 还能用 j 枚鸡蛋扔 i-1 次，把 x 层看作新的 0 层，还能确定 g[i-1][j] 层
	- 因此 g[i][j] = 1+g[i-1][j-1]+g[i-1][j]
- 可以用滚动数组优化

## 解答


```python
class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        g = [0]*(k+1)
        i = 0
        while g[-1]<n:
            g = [0]+[1+a+b for a,b in pairwise(g)]
            i += 1
        return i
```
0 ms
