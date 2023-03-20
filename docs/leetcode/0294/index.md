# 0294：翻转游戏 II（★★★）


## 题目

你和朋友玩一个叫做「翻转游戏」的游戏。游戏规则如下：

给你一个字符串 currentState ，其中只含 '+' 和 '-' 。你和朋友轮流将 连续 的两个 "++" 
反转成 "--" 。当一方无法进行有效的翻转时便意味着游戏结束，则另一方获胜。默认每个人都会采取最优策略。

请你写出一个函数来判定起始玩家 是否存在必胜的方案 ：如果存在，返回 true ；否则，返回 false 。
 
示例 1：

	输入：currentState = "++++"
	输出：true
	解释：起始玩家可将中间的 "++" 翻转变为 "+--+" 从而得胜。

示例 2：

	输入：currentState = "+"
	输出：false
	 

提示：
- 1 <= currentState.length <= 60
- currentState[i] 不是 '+' 就是 '-'
 

进阶：请推导你算法的时间复杂度。


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
