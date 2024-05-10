# 2585：获得分数的方法数（★★）


> <u>**[力扣第 335 场周赛第 4 题](https://leetcode.cn/problems/number-of-ways-to-earn-points/)**</u>

## 题目

<p>考试中有 <code>n</code> 种类型的题目。给你一个整数 <code>target</code> 和一个下标从 <strong>0</strong> 开始的二维整数数组 <code>types</code> ，其中 <code>types[i] = [count<sub>i</sub>, marks<sub>i</sub>] </code>表示第 <code>i</code> 种类型的题目有 <code>count<sub>i</sub></code> 道，每道题目对应 <code>marks<sub>i</sub></code> 分。</p>

<p>返回你在考试中恰好得到 <code>target</code> 分的方法数。由于答案可能很大，结果需要对 <code>10<sup>9</sup> +7</code> 取余。</p>

<p><strong>注意</strong>，同类型题目无法区分。</p>

<ul>
<li>比如说，如果有 <code>3</code> 道同类型题目，那么解答第 <code>1</code> 和第 <code>2</code> 道题目与解答第 <code>1</code> 和第 <code>3</code> 道题目或者第 <code>2</code> 和第 <code>3</code> 道题目是相同的。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>target = 6, types = [[6,1],[3,2],[2,3]]
<strong>输出：</strong>7
<strong>解释：</strong>要获得 6 分，你可以选择以下七种方法之一：
- 解决 6 道第 0 种类型的题目：1 + 1 + 1 + 1 + 1 + 1 = 6
- 解决 4 道第 0 种类型的题目和 1 道第 1 种类型的题目：1 + 1 + 1 + 1 + 2 = 6
- 解决 2 道第 0 种类型的题目和 2 道第 1 种类型的题目：1 + 1 + 2 + 2 = 6
- 解决 3 道第 0 种类型的题目和 1 道第 2 种类型的题目：1 + 1 + 1 + 3 = 6
- 解决 1 道第 0 种类型的题目、1 道第 1 种类型的题目和 1 道第 2 种类型的题目：1 + 2 + 3 = 6
- 解决 3 道第 1 种类型的题目：2 + 2 + 2 = 6
- 解决 2 道第 2 种类型的题目：3 + 3 = 6
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>target = 5, types = [[50,1],[50,2],[50,5]]
<strong>输出：</strong>4
<strong>解释：</strong>要获得 5 分，你可以选择以下四种方法之一：
- 解决 5 道第 0 种类型的题目：1 + 1 + 1 + 1 + 1 = 5
- 解决 3 道第 0 种类型的题目和 1 道第 1 种类型的题目：1 + 1 + 1 + 2 = 5
- 解决 1 道第 0 种类型的题目和 2 道第 1 种类型的题目：1 + 2 + 2 = 5
- 解决 1 道第 2 种类型的题目：5
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>target = 18, types = [[6,1],[3,2],[2,3]]
<strong>输出：</strong>1
<strong>解释：</strong>只有回答所有题目才能获得 18 分。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= target &lt;= 1000</code></li>
<li><code>n == types.length</code></li>
<li><code>1 &lt;= n &lt;= 50</code></li>
<li><code>types[i].length == 2</code></li>
<li><code>1 &lt;= count<sub>i</sub>, marks<sub>i</sub> &lt;= 50</code></li>
</ul>


## 分析

### #1

多重背包，按最后一个元素选择 1 到 cnt 个递推。

```python
class Solution:
    def waysToReachTarget(self, target: int, types: List[List[int]]) -> int:
        mod = 10**9+7
        f = [1]+[0]*target
        for c,m in types:
            for j in range(target,m-1,-1):
                for k in range(1,min(c,j//m)+1):
                    f[j] += f[j-k*m] 
                f[j] %= mod
        return f[-1]
```
906 ms

### #2

- 观察 f[j] 的递推式，可以预先保存等差 m 的 f 序列的前缀和，即可优化时间
- 可以直接在 f 上预先保存前缀和，节省时间

## 解答

```python
class Solution:
    def waysToReachTarget(self, target: int, types: List[List[int]]) -> int:
        mod = 10**9+7
        f = [1]+[0]*target
        for c,m in types:
            for j in range(m,target+1):
                f[j] = (f[j]+f[j-m])%mod
            a = c*m+m
            for j in range(target,a-1,-1):
                f[j] = (f[j]-f[j-a])%mod
        return f[-1]
```
134 ms


