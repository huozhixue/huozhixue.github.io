# 1467：两个盒子中球的颜色数相同的概率（2356 分）


> <u>**[力扣第 191 场周赛第 4 题](https://leetcode.cn/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls/)**</u>

## 题目

<p>桌面上有 <code>2n</code> 个颜色不完全相同的球，球上的颜色共有 <code>k</code> 种。给你一个大小为 <code>k</code> 的整数数组 <code>balls</code> ，其中 <code>balls[i]</code> 是颜色为 <code>i</code> 的球的数量。</p>

<p>所有的球都已经 <strong>随机打乱顺序</strong> ，前 <code>n</code> 个球放入第一个盒子，后 <code>n</code> 个球放入另一个盒子（请认真阅读示例 2 的解释部分）。</p>

<p><strong>注意：</strong>这两个盒子是不同的。例如，两个球颜色分别为 <code>a</code> 和 <code>b</code>，盒子分别为 <code>[]</code> 和 <code>()</code>，那么 <code>[a] (b)</code> 和 <code>[b] (a)</code> 这两种分配方式是不同的（请认真阅读示例的解释部分）。</p>

<p>请返回「两个盒子中球的颜色数相同」的情况的概率。答案与真实值误差在 <code>10^-5</code> 以内，则被视为正确答案</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>balls = [1,1]
<strong>输出：</strong>1.00000
<strong>解释：</strong>球平均分配的方式只有两种：
- 颜色为 1 的球放入第一个盒子，颜色为 2 的球放入第二个盒子
- 颜色为 2 的球放入第一个盒子，颜色为 1 的球放入第二个盒子
这两种分配，两个盒子中球的颜色数都相同。所以概率为 2/2 = 1 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>balls = [2,1,1]
<strong>输出：</strong>0.66667
<strong>解释：</strong>球的列表为 [1, 1, 2, 3]
随机打乱，得到 12 种等概率的不同打乱方案，每种方案概率为 1/12 ：
[1,1 / 2,3], [1,1 / 3,2], [1,2 / 1,3], [1,2 / 3,1], [1,3 / 1,2], [1,3 / 2,1], [2,1 / 1,3], [2,1 / 3,1], [2,3 / 1,1], [3,1 / 1,2], [3,1 / 2,1], [3,2 / 1,1]
然后，我们将前两个球放入第一个盒子，后两个球放入第二个盒子。
这 12 种可能的随机打乱方式中的 8 种满足「两个盒子中球的颜色数相同」。
概率 = 8/12 = 0.66667
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>balls = [1,2,1,2]
<strong>输出：</strong>0.60000
<strong>解释：</strong>球的列表为 [1, 2, 2, 3, 4, 4]。要想显示所有 180 种随机打乱方案是很难的，但只检查「两个盒子中球的颜色数相同」的 108 种情况是比较容易的。
概率 = 108 / 180 = 0.6 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= balls.length &lt;= 8</code></li>
<li><code>1 &lt;= balls[i] &lt;= 6</code></li>
<li><code>sum(balls)</code> 是偶数</li>
</ul>




## 分析

- 令 f(a,b) 代表两个盒子球数之差为 a，颜色数之差为 b 的方案数
- 按第一种颜色分多少个给第一个盒子，递推即可

## 解答

```python
class Solution:
    def getProbability(self, balls: List[int]) -> float:
        f = {(0,0):1}
        for c in balls:
            g = defaultdict(int)
            for x in range(c+1):
                y,mul = c-x,comb(c,x)
                for (a,b),w in f.items():
                    g[(a+x-y,b+(x>0)-(y>0))] += w*mul
            f = g
        return f[(0,0)]/sum(f[p] for p in f if p[0]==0)
```
3 ms

