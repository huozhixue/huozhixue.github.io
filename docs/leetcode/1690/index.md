# 1690：石子游戏 VII（1951 分）


> <u>**[力扣第 219 场周赛第 3 题](https://leetcode.cn/problems/stone-game-vii/)**</u>

## 题目

<p>石子游戏中，爱丽丝和鲍勃轮流进行自己的回合，<strong>爱丽丝先开始</strong> 。</p>

<p>有 <code>n</code> 块石子排成一排。每个玩家的回合中，可以从行中 <strong>移除</strong> 最左边的石头或最右边的石头，并获得与该行中剩余石头值之 <strong>和</strong> 相等的得分。当没有石头可移除时，得分较高者获胜。</p>

<p>鲍勃发现他总是输掉游戏（可怜的鲍勃，他总是输），所以他决定尽力 <strong>减小得分的差值</strong> 。爱丽丝的目标是最大限度地 <strong>扩大得分的差值</strong> 。</p>

<p>给你一个整数数组 <code>stones</code> ，其中 <code>stones[i]</code> 表示 <strong>从左边开始</strong> 的第 <code>i</code> 个石头的值，如果爱丽丝和鲍勃都 <strong>发挥出最佳水平</strong> ，请返回他们 <strong>得分的差值</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>stones = [5,3,1,4,2]
<strong>输出：</strong>6
<strong>解释：</strong>
- 爱丽丝移除 2 ，得分 5 + 3 + 1 + 4 = 13 。游戏情况：爱丽丝 = 13 ，鲍勃 = 0 ，石子 = [5,3,1,4] 。
- 鲍勃移除 5 ，得分 3 + 1 + 4 = 8 。游戏情况：爱丽丝 = 13 ，鲍勃 = 8 ，石子 = [3,1,4] 。
- 爱丽丝移除 3 ，得分 1 + 4 = 5 。游戏情况：爱丽丝 = 18 ，鲍勃 = 8 ，石子 = [1,4] 。
- 鲍勃移除 1 ，得分 4 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [4] 。
- 爱丽丝移除 4 ，得分 0 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [] 。
得分的差值 18 - 12 = 6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>stones = [7,90,5,1,100,10,10,2]
<strong>输出：</strong>122</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == stones.length</code></li>
<li><code>2 <= n <= 1000</code></li>
<li><code>1 <= stones[i] <= 1000</code></li>
</ul>


**相似问题：**
- [0877：石子游戏（1590 分）](/leetcode/0877)
- [1140：石子游戏 II（2034 分）](/leetcode/1140)
- [1406：石子游戏 III（2026 分）](/leetcode/1406)
- [1510：石子游戏 IV（1786 分）](/leetcode/1510)
- [1563：石子游戏 V（2087 分）](/leetcode/1563)
- [1686：石子游戏 VI（2000 分）](/leetcode/1686)
- [1770：执行乘法运算的最大分数（2068 分）](/leetcode/1770)
- [1872：石子游戏 VIII（2439 分）](/leetcode/1872)
- [2029：石子游戏 IX（2277 分）](/leetcode/2029)


## 分析

{{< lc "0486" >}}，升级版，唯一的区别是分值要算剩下元素总和，可以用前缀和快速得到。

## 解答

```python
class Solution:
    def stoneGameVII(self, stones: List[int]) -> int:
        n = len(stones)
        P = list(accumulate([0]+stones))
        dp = [[0]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i+1,n):
                dp[i][j] = max(P[j+1]-P[i+1]-dp[i+1][j],P[j]-P[i]-dp[i][j-1])
        return dp[0][-1]
```

1678 ms


