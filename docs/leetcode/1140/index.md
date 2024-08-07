# 1140：石子游戏 II（2034 分）


> <u>**[力扣第 147 场周赛第 4 题](https://leetcode.cn/problems/stone-game-ii/)**</u>

## 题目

<p>爱丽丝和鲍勃继续他们的石子游戏。许多堆石子 <strong>排成一行</strong>，每堆都有正整数颗石子 <code>piles[i]</code>。游戏以谁手中的石子最多来决出胜负。</p>

<p>爱丽丝和鲍勃轮流进行，爱丽丝先开始。最初，<code>M = 1</code>。</p>

<p>在每个玩家的回合中，该玩家可以拿走剩下的 <strong>前</strong> <code>X</code> 堆的所有石子，其中 <code>1 &lt;= X &lt;= 2M</code>。然后，令 <code>M = max(M, X)</code>。</p>

<p>游戏一直持续到所有石子都被拿走。</p>

<p>假设爱丽丝和鲍勃都发挥出最佳水平，返回爱丽丝可以得到的最大数量的石头。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>piles = [2,7,9,4,4]
<strong>输出：</strong>10
<strong>解释：</strong>如果一开始Alice取了一堆，Bob取了两堆，然后Alice再取两堆。爱丽丝可以得到2 + 4 + 4 = 10堆。如果Alice一开始拿走了两堆，那么Bob可以拿走剩下的三堆。在这种情况下，Alice得到2 + 7 = 9堆。返回10，因为它更大。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>piles = [1,2,3,4,5,100]
<strong>输出：</strong>104
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= piles.length &lt;= 100</code></li>
<li><meta charset="UTF-8" /><code>1 &lt;= piles[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [1563：石子游戏 V（2087 分）](/leetcode/1563)
- [1686：石子游戏 VI（2000 分）](/leetcode/1686)
- [1690：石子游戏 VII（1951 分）](/leetcode/1690)
- [1872：石子游戏 VIII（2439 分）](/leetcode/1872)
- [2029：石子游戏 IX（2277 分）](/leetcode/2029)


## 分析

典型的博弈问题，多加一个 M 参数即可。


## 解答

```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        @cache
        def dfs(i,m):
            res = sum(piles[i:])
            if i+2*m<n:
                res -= min(dfs(i+x,max(x,m)) for x in range(1,2*m+1))
            return res
        n = len(piles)
        return dfs(0,1)
```

146 ms


