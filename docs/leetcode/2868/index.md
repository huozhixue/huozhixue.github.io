# 2868：单词游戏（★★）


> <u>**[力扣第 2868 题](https://leetcode.cn/problems/the-wording-game/)**</u>

## 题目

<p>Alice 和 Bob 分别拥有一个 <strong>按字典序排序 </strong>的字符串数组，分别命名为 <code>a</code> 和 <code>b</code>。</p>

<p>他们正在玩一个单词游戏，遵循以下规则：</p>

<ul>
<li>每一轮，当前玩家应该从他的列表中选择一个单词，并且选择的单词比上一个单词 <strong>紧邻大</strong>；然后轮到另一名玩家。</li>
<li>如果一名玩家在自己的回合中无法选择单词，则输掉比赛。</li>
</ul>

<p>Alice 通过选择在 <strong>字典序最小</strong> 的单词开始游戏。</p>

<p>给定 <code>a</code> 和 <code>b</code>，已知两名玩家都按最佳策略玩游戏，如果 Alice 可以获胜，则返回 <code>true</code> ，否则返回 <code>false</code>。</p>

<p>如果满足以下条件，则称一个单词 <code>w</code> 比另一个单词 <code>z</code> <strong>紧邻大</strong>：</p>

<ul>
<li><code>w</code> 在 <strong>字典序上大于</strong> <code>z</code>。</li>
<li>如果 <code>w<sub>1</sub></code> 是 <code>w</code> 的第一个字母，<code>z<sub>1</sub></code> 是 <code>z</code> 的第一个字母，那么 <code>w<sub>1</sub></code> 应该 <strong>等于</strong> <code>z<sub>1</sub></code> 或者是字母表中 <code>z<sub>1</sub></code> <strong>后面相邻 </strong>的字母。</li>
<li>例如，单词 <code>"care"</code> 比 <code>"book"</code> 和 <code>"car"</code> 紧邻大，但不比 <code>"ant"</code> 或 <code>"cook"</code> 紧邻大。</li>
</ul>

<p>如果在 <code>s</code> 和 <code>t</code> 不同的第一个位置处，字符串 <code>s</code> 的字母比字符串 <code>t</code> 的字母在字母表中的顺序更靠后，则称为字符串 <code>s</code> 在 <strong>字典序上大于</strong> 字符串 <code>t</code>。如果前 <code>min(s.length, t.length)</code> 个字符没有区别，那么较长的字符串是在字典序上较大的那一个。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> a = ["avokado","dabar"], b = ["brazil"]

<strong>输出:</strong> false

<strong>解释:</strong> Alice 必须从单词 "avokado" 来开始游戏，因为这是她最小的单词，然后 Bob 使用他唯一的单词 "brazil"，他可以使用它因为它的第一个字母 'b' 在 Alice 的单词的第一个字母 'a' 之后。

Alice 无法出牌，因为剩下的唯一单词的第一个字母既不等于 'b' 也不是 'b' 之后的字母 'c'。

所以，Alice 输了，游戏结束。</pre>
<strong>示例 2：</strong>

<pre>
<strong>输入:</strong> a = ["ananas","atlas","banana"], b = ["albatros","cikla","nogomet"]

<strong>输出:</strong> true

<strong>解释:</strong> Alice 必须从单词 "ananas" 来开始游戏。

Bob 无法出牌，因为他唯一拥有的以字母 'a' 或 'b' 开头的单词是 "albatros"，而它比 Alice 的单词小。

所以，Alice 获胜，游戏结束。</pre>
<strong>示例 3：</strong>

<pre>
<strong>输入:</strong> a = ["hrvatska","zastava"], b = ["bijeli","galeb"]

<strong>输出:</strong> true

<strong>解释:</strong> Alice 必须从单词 "hrvatska" 来开始游戏。

Bob 无法出牌，因为他的两个单词的第一个字母都比 Alice 的单词的第一个字母 'h' 小。

所以，Alice 获胜，游戏结束。</pre>



<p><strong>约束条件：</strong></p>

<ul>
<li><code>1 &lt;= a.length, b.length &lt;= 10<sup>5</sup></code></li>
<li><code>a[i]</code> 和 <code>b[i]</code> 仅包含小写英文字母。</li>
<li><code>a</code> 和 <code>b</code> 按 <strong>字典序排序</strong>。</li>
<li><code>a</code> 和 <code>b</code> 中所有的单词都是 <strong>不同的</strong>。</li>
<li><code>a</code> 和 <code>b</code> 中所有单词的长度之和不超过 <code>10<sup>6</sup></code>。</li>
</ul>




## 分析

### #1 dp

- 令 f(i) 代表从 Alice 选 a[i] 开始，Alice 能否获胜；g(i) 代表从 Bob 选 b[i] 开始，Bob 能否获胜
- 二分找出 b 中比 a[i] 紧邻大的范围 [j:k]，f[i]=1 当且仅当 g[j:k] 都为 0
- 为了保证求 f[i] 时已经得到 g[j]，将 a+b 一起排序并倒序遍历即可
- 维护 f 和 g 的后缀和数组，即可快速递推

```python
class Solution:
    def canAliceWin(self, a: List[str], b: List[str]) -> bool:
        m,n = len(a),len(b)
        A = [(x,0,i) for i,x in enumerate(a)]+[(x,1,i) for i,x in enumerate(b)]
        A.sort()
        f = [0]*m
        g = [0]*n
        sf = [0]*(m+1)
        sg = [0]*(n+1)
        for x,c,i in A[::-1]:
            y = chr(ord(x[0])+2)
            if c==0:
                j = bisect_right(b,x)
                k = bisect_left(b,y)
                f[i] = sg[j]==sg[k]
                sf[i] = f[i]+sf[i+1]
            else:
                j = bisect_right(a,x)
                k = bisect_left(a,y)
                g[i] = sf[j]==sf[k]
                sg[i] = g[i]+sg[i+1]
        return f[0]
```
514 ms

### #2 贪心

- 还可以直接贪心，每轮玩家选尽可能小的单词
- 假如某一轮 Alice 可以选 a1,a2，a1 < a2
	- 若 b 中不存在 a1<b1<a2，情况不会变坏（Bob能选的就算换 a2 也一样能选）
	- 若存在，Bob 下一轮选了 b1，那么 Alice 必然可以再选 a2（首字母最多差 1），情况不会变坏
	- 因此选 a1 总不会更坏

## 解答


```python
class Solution:
    def canAliceWin(self, a: List[str], b: List[str]) -> bool:
        m,n = len(a),len(b)
        i,j = 0,0
        while True:
            while j<n and b[j]<a[i]:
                j += 1
            if j==n or ord(b[j][0])-ord(a[i][0])>1:
                return True
            while i<m and a[i]<b[j]:
                i += 1
            if i==m or ord(a[i][0])-ord(b[j][0])>1:
                return False
```
62 ms
