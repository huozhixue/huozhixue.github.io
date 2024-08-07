# 0514：自由之路（★★）


> <u>**[力扣第 514 题](https://leetcode.cn/problems/freedom-trail/)**</u>

## 题目

<p>电子游戏“辐射4”中，任务 <strong>“通向自由”</strong> 要求玩家到达名为 “<strong>Freedom Trail Ring”</strong> 的金属表盘，并使用表盘拼写特定关键词才能开门。</p>

<p>给定一个字符串 <code>ring</code> ，表示刻在外环上的编码；给定另一个字符串 <code>key</code> ，表示需要拼写的关键词。您需要算出能够拼写关键词中所有字符的<strong>最少</strong>步数。</p>

<p>最初，<strong>ring </strong>的第一个字符与 <code>12:00</code> 方向对齐。您需要顺时针或逆时针旋转 <code>ring</code> 以使 <strong>key </strong>的一个字符在 <code>12:00</code> 方向对齐，然后按下中心按钮，以此逐个拼写完 <strong><code>key</code> </strong>中的所有字符。</p>

<p>旋转 <code>ring</code><strong> </strong>拼出 key 字符 <code>key[i]</code><strong> </strong>的阶段中：</p>

<ol>
<li>您可以将 <strong>ring </strong>顺时针或逆时针旋转 <strong>一个位置 </strong>，计为1步。旋转的最终目的是将字符串 <strong><code>ring</code> </strong>的一个字符与 <code>12:00</code> 方向对齐，并且这个字符必须等于字符 <strong><code>key[i]</code> 。</strong></li>
<li>如果字符 <strong><code>key[i]</code> </strong>已经对齐到12:00方向，您需要按下中心按钮进行拼写，这也将算作 <strong>1 步</strong>。按完之后，您可以开始拼写 <strong>key </strong>的下一个字符（下一阶段）, 直至完成所有拼写。</li>
</ol>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/22/ring.jpg" style="height: 450px; width: 450px;" /></p>

<center> </center>

<pre>
<strong>输入:</strong> ring = "godding", key = "gd"
<strong>输出:</strong> 4
<strong>解释:</strong>
对于 key 的第一个字符 'g'，已经在正确的位置, 我们只需要1步来拼写这个字符。
对于 key 的第二个字符 'd'，我们需要逆时针旋转 ring "godding" 2步使它变成 "ddinggo"。
当然, 我们还需要1步进行拼写。
因此最终的输出是 4。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> ring = "godding", key = "godding"
<strong>输出:</strong> 13
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= ring.length, key.length &lt;= 100</code></li>
<li><code>ring</code> 和 <code>key</code> 只包含小写英文字母</li>
<li><strong>保证</strong> 字符串 <code>key</code> 一定可以由字符串  <code>ring</code> 旋转拼出</li>
</ul>




## 分析
### #1

按转到哪个位置递推即可，只需要顺/逆时针找第一个即可。

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        f = {0:0}
        for c in key:
            g = defaultdict(lambda:inf)
            for i,w in f.items():
                r = i
                while ring[r]!=c:
                    r = (r+1)%n
                g[r] = min(g[r],1+w+(r-i)%n)
                l = i
                while ring[l]!=c:
                    l = (l-1)%n
                g[l] = min(g[l],1+w+(i-l)%n)
            f = g
        return min(f.values())
```
114 ms

### #2

可以预先保存下标列表，二分查找最近的下标。
## 解答

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        d = defaultdict(list)
        for i,c in enumerate(ring):
            d[c].append(i)
        f = {0:0}
        for c in key:
            A = d[c]
            g = defaultdict(lambda:inf)
            for i,w in f.items():
                pos = bisect_left(A,i)
                l,r = A[pos-1],A[pos%len(A)]
                g[r] = min(g[r],1+w+(r-i)%n)
                g[l] = min(g[l],1+w+(i-l)%n)
            f = g
        return min(f.values())
```
72 ms
