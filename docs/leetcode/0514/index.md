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

先按顺/逆时针找到第一个 key[0] 后，可以转为递归子问题。

那么令 dfs(i, j) 代表当 ring[i] 对齐北方时，拼写 key[j:] 的最少步数，即可递推。

要找与 ring[i] 最近的 key[j] 位置，考虑保存 ring 中每个字符的位置列表（递增的），
然后可以二分查找离 i 最近的某字符位置，节省时间。

## 解答

```python
def findRotateSteps(self, ring: str, key: str) -> int:
    @lru_cache(None)
    def dfs(i, j):
        if j == len(key):
            return 0
        A = d[key[j]]
        pos = bisect_left(A, i)
        left, right = A[pos-1], A[pos % len(A)]
        return 1+min((i-left)%n+dfs(left, j+1), (right-i)%n+dfs(right, j+1))

    d, n = defaultdict(list), len(ring)
    for i, char in enumerate(ring):
        d[char].append(i)
    return dfs(0, 0)
```
72 ms
