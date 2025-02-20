# 0818：赛车（2391 分）


> <u>**[力扣第 818 题](https://leetcode.cn/problems/race-car/)**</u>

## 题目

你的赛车可以从位置 <code>0</code> 开始，并且速度为 <code>+1</code> ，在一条无限长的数轴上行驶。赛车也可以向负方向行驶。赛车可以按照由加速指令 <code>'A'</code> 和倒车指令 <code>'R'</code> 组成的指令序列自动行驶。
<ul>
<li>当收到指令 <code>'A'</code> 时，赛车这样行驶：
<ul>
<li><code>position += speed</code></li>
<li><code>speed *= 2</code></li>
</ul>
</li>
<li>当收到指令 <code>'R'</code> 时，赛车这样行驶：
<ul>
<li>如果速度为正数，那么<code>speed = -1</code></li>
<li>否则 <code>speed = 1</code></li>
</ul>
当前所处位置不变。</li>
</ul>

<p>例如，在执行指令 <code>"AAR"</code> 后，赛车位置变化为 <code>0 --&gt; 1 --&gt; 3 --&gt; 3</code> ，速度变化为 <code>1 --&gt; 2 --&gt; 4 --&gt; -1</code> 。</p>

<p>给你一个目标位置 <code>target</code> ，返回能到达目标位置的最短指令序列的长度。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 3
<strong>输出：</strong>2
<strong>解释：</strong>
最短指令序列是 "AA" 。
位置变化 0 --&gt; 1 --&gt; 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 6
<strong>输出：</strong>5
<strong>解释：</strong>
最短指令序列是 "AAARA" 。
位置变化 0 --&gt; 1 --&gt; 3 --&gt; 7 --&gt; 7 --&gt; 6 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= target &lt;= 10<sup>4</sup></code></li>
</ul>




## 分析

### #1

- 用A^k表示连续使用`k`次A指令，那么最优指令必然可以表示为 $A^{k1}​RA^{k2}​R⋯A^{kn}​,ki​≥0$
	- 假如某个指令列表是 $RA^{k1}​RA^{k2}​R⋯A^{kn}​$，可以将 $RA^{k1}R$ 放到结尾变成 $RA^{k1}$ 或 $RRA^{k1}$，长度相等或更短
	- 还可以将 ki 排序，使得 k1 最大，长度不变
- 先求 target 的二进制位数 m，则 2^(m-1)<=target<2^m 
	- 若 target=2^m-1，k1 取 m，直接到达终点
	- 否则 k1 要么取 m，要么取 m-1：
		- k1 取 m，那么用了指令 $RA^{k1}R$ 后，转为递归子问题，求 t=2^m-1-target 的最短长度
		- k1 取 m-1，那么枚举 0<=k2<k1，用了指令 $RA^{k1}​RA^{k2}​R$ 后，转为递归子问题，求 t=target-2^(m-1)+2^(k2) 的最短长度
- k1、k2 取值限制的证明见 [O(n^0.695)复杂度的dfs，以及一些性质证明](https://leetcode.cn/problems/race-car/solutions/891407/onfu-za-du-de-dfsyi-ji-yi-xie-xing-zhi-z-1i47/)

```python
class Solution(object):
    def racecar(self, target):
        @cache
        def dfs(t):
            k = t.bit_length()
            base = 1<<(k-1)
            if t==base*2-1:
                return k
            res = dfs(base*2-1-t)+k+1
            for j in range(k-1):
                res = min(res,dfs(t-base+(1<<j))+k+j+1)
            return res
        return dfs(target)
```
7 ms

### #2

还可以写成最短路的形式，用 dijkstra
## 解答


```python
class Solution(object):
    def racecar(self, target):
        pq = [(0,target)]
        d = defaultdict(lambda:inf)
        d[target] = 0
        while pq:
            w,u = heapq.heappop(pq)
            if u==0:
                return w
            if w>d[u]:
                continue
            k = u.bit_length()
            base = 1<<(k-1)
            if u==base*2-1:
                heappush(pq,(w+k,0))
                continue
            v,w2 = base*2-1-u,w+k+1
            if w2<d[v]:
                d[v] = w2
                heappush(pq,(w2,v))
            for j in range(k-1):
                v,w2 = u-base+(1<<j),w+k+j+1
                if w2<d[v]:
                    d[v] = w2
                    heappush(pq,(w2,v))
```
0 ms
