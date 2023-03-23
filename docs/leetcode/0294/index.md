# 0294：翻转游戏 II（★）


> <u>**[力扣第 294 题](https://leetcode.cn/problems/flip-game-ii/)**</u>

## 题目

<p>你和朋友玩一个叫做「翻转游戏」的游戏。游戏规则如下：</p>

<p>给你一个字符串 <code>currentState</code> ，其中只含 <code>'+'</code> 和 <code>'-'</code> 。你和朋友轮流将 <strong>连续 </strong>的两个 <code>"++"</code> 反转成 <code>"--"</code> 。当一方无法进行有效的翻转时便意味着游戏结束，则另一方获胜。默认每个人都会采取最优策略。</p>

<p>请你写出一个函数来判定起始玩家 <strong>是否存在必胜的方案</strong> ：如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>currentState = "++++"
<strong>输出：</strong>true
<strong>解释：</strong>起始玩家可将中间的 <code>"++"</code> 翻转变为 <code>"+--+" 从而得胜。</code></pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>currentState = "+"
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= currentState.length &lt;= 60</code></li>
<li><code>currentState[i]</code> 不是 <code>'+'</code> 就是 <code>'-'</code></li>
</ul>



<p><strong>进阶：</strong>请推导你算法的时间复杂度。</p>


## 分析

### #1

典型的博弈问题，考虑用 dp，遍历每种操作并递归即可。

```python
def canWin(self, currentState: str) -> bool:
    @lru_cache(None)
    def dfs(s):
        for i in range(len(s)):
            if s[i:i+2]=='++' and not dfs(s[:i]+'--'+s[i+2:]):
                return True
        return False
    
    return dfs(currentState)
```
60 ms

### #2

上面 dp 的时间复杂度其实很高，是 $O(N*2^{N/2})$，能通过是因为数据太弱。

更优的是利用 [Sprague-Grundy 定理](https://zhuanlan.zhihu.com/p/20611132)， 时间复杂度 $O(N^2)$。

## 解答

```python
def canWin(self, currentState: str) -> bool:
    def mex(vis):
        x = 0
        while x in vis:
            x += 1
        return x

    A = [len(sub) for sub in currentState.split('-') if sub]
    n = max(A, default=0)
    sg = [0] * (n+1)
    for i in range(2, n+1):
        sg[i] = mex({sg[x]^sg[i-2-x] for x in range(i-1)})
    return reduce(xor, [sg[x] for x in A], 0)>0
```
36 ms
