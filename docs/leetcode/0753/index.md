# 0753：破解保险箱（★★）


> <u>**[力扣第 64 场双周赛第 4 题](https://leetcode.cn/problems/cracking-the-safe/)**</u>

## 题目

<p>有一个需要密码才能打开的保险箱。密码是 <code>n</code> 位数, 密码的每一位都是范围 <code>[0, k - 1]</code> 中的一个数字。</p>

<p>保险箱有一种特殊的密码校验方法，你可以随意输入密码序列，保险箱会自动记住 <strong>最后 <code>n</code> 位输入</strong> ，如果匹配，则能够打开保险箱。</p>

<ul>
<li>例如，正确的密码是 <code>"345"</code> ，并且你输入的是 <code>"012345"</code> ：

<ul>
<li>输入 <code>0</code> 之后，最后 <code>3</code> 位输入是 <code>"0"</code> ，不正确。</li>
<li>输入 <code>1</code> 之后，最后 <code>3</code> 位输入是 <code>"01"</code> ，不正确。</li>
<li>输入 <code>2</code> 之后，最后 <code>3</code> 位输入是 <code>"012"</code> ，不正确。</li>
<li>输入 <code>3</code> 之后，最后 <code>3</code> 位输入是 <code>"123"</code> ，不正确。</li>
<li>输入 <code>4</code> 之后，最后 <code>3</code> 位输入是 <code>"234"</code> ，不正确。</li>
<li>输入 <code>5</code> 之后，最后 <code>3</code> 位输入是 <code>"345"</code> ，正确，打开保险箱。</li>
</ul>
</li>
</ul>

<p>在只知道密码位数 <code>n</code> 和范围边界 <code>k</code> 的前提下，请你找出并返回确保在输入的 <strong>某个时刻</strong> 能够打开保险箱的任一 <strong>最短</strong> 密码序列 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1, k = 2
<strong>输出：</strong>"10"
<strong>解释：</strong>密码只有 1 位，所以输入每一位就可以。"01" 也能够确保打开保险箱。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2, k = 2
<strong>输出：</strong>"01100"
<strong>解释：</strong>对于每种可能的密码：
- "00" 从第 4 位开始输入。
- "01" 从第 1 位开始输入。
- "10" 从第 3 位开始输入。
- "11" 从第 2 位开始输入。
因此 "01100" 可以确保打开保险箱。"01100"、"10011" 和 "11001" 也可以确保打开保险箱。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 4</code></li>
<li><code>1 &lt;= k &lt;= 10</code></li>
<li><code>1 &lt;= k<sup>n</sup> &lt;= 4096</code></li>
</ul>


## 分析

本题有个非常巧妙的方法。将所有 n-1 位数作为顶点，如果 u 的后 n-2 位和 v 的前 n-2 位相同，就添加一条边 u 指向 v。

那么输入的字符串可以看作是有向图中的一条路径。字符串要覆盖所有密码，等价于图中的路径要经过所有边。
因此问题转化为求最短的经过所有边的路径。 

该图中所有顶点的入度和出度相同，因此是欧拉图。用 Hierholzer 算法求欧拉回路即可。注意 n==1 的特殊情况。

## 解答

```python
def crackSafe(self, n: int, k: int) -> str:
    def dfs(u):
        while nxt[u] < k:
            nxt[u] += 1
            dfs(u[1:]+str(nxt[u]-1))
        stack.append(u[-1])

    if n == 1:
        return ''.join(str(i) for i in range(k))
    stack, nxt = [], defaultdict(int)
    dfs('0'*(n-1))
    return ''.join(stack) + '0'*(n-2)
```
44 ms

## *附加

其实只要每次都选最大的后继顶点，就不会遇到死胡同。所以本题还可以直接构造。

```python
def crackSafe(self, n: int, k: int) -> str:
    if n == 1:
        return ''.join(str(i) for i in range(k))
    res, nxt = '0' * (n-1), defaultdict(lambda: k-1)
    for _ in range(k**n):
        u = res[1-n:]
        res += str(nxt[u])
        nxt[u] -= 1
    return res
```
40 ms
