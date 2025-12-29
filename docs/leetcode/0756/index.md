# 0756：金字塔转换矩阵（1990 分）


> <u>**[力扣第 756 题](https://leetcode.cn/problems/pyramid-transition-matrix/)**</u>

## 题目

<p>你正在把积木堆成金字塔。每个块都有一个颜色，用一个字母表示。每一行的块比它下面的行 <strong>少一个块</strong> ，并且居中。</p>

<p>为了使金字塔美观，只有特定的 <strong>三角形图案</strong> 是允许的。一个三角形的图案由 <strong>两个块</strong> 和叠在上面的 <strong>单个块</strong> 组成。模式是以三个字母字符串的列表形式 <code>allowed</code> 给出的，其中模式的前两个字符分别表示左右底部块，第三个字符表示顶部块。</p>

<ul>
<li>例如，<code>"ABC"</code> 表示一个三角形图案，其中一个 <code>“C”</code> 块堆叠在一个 <code>'A'</code> 块(左)和一个 <code>'B'</code> 块(右)之上。请注意，这与 <code>"BAC"</code> 不同，<code>"B"</code> 在左下角，<code>"A"</code> 在右下角。</li>
</ul>

<p>你从作为单个字符串给出的底部的一排积木 <code>bottom</code> 开始，<strong>必须</strong> 将其作为金字塔的底部。</p>

<p>在给定 <code>bottom</code> 和 <code>allowed</code> 的情况下，如果你能一直构建到金字塔顶部，使金字塔中的 <strong>每个三角形图案</strong> 都是在 <code>allowed</code> 中的，则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/08/26/pyramid1-grid.jpg" style="height: 232px; width: 600px;" /></p>

<pre>
<strong>输入：</strong>bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
<strong>输出：</strong>true
<strong>解释：</strong>允许的三角形图案显示在右边。
从最底层(第 3 层)开始，我们可以在第 2 层构建“CE”，然后在第 1 层构建“E”。
金字塔中有三种三角形图案，分别是 “BCC”、“CDE” 和 “CEA”。都是允许的。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/08/26/pyramid2-grid.jpg" style="height: 359px; width: 600px;" /></p>

<pre>
<strong>输入：</strong>bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
<strong>输出：</strong>false
<strong>解释：</strong>允许的三角形图案显示在右边。
从最底层(即第 4 层)开始，创造第 3 层有多种方法，但如果尝试所有可能性，你便会在创造第 1 层前陷入困境。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= bottom.length &lt;= 6</code></li>
<li><code>0 &lt;= allowed.length &lt;= 216</code></li>
<li><code>allowed[i].length == 3</code></li>
<li>所有输入字符串中的字母来自集合 <code>{'A', 'B', 'C', 'D', 'E', 'F'}</code>。</li>
<li> <code>allowed</code> 中所有值都是 <strong>唯一的</strong></li>
</ul>




## 分析

- 典型的轮廓线 dp，从下往上填，维护轮廓信息

## 解答


```python []
class Solution:
    def pyramidTransition(self, bottom: str, allowed: List[str]) -> bool:
        @cache
        def dfs(s,i):
            if len(s)==1:
                return True
            if i==len(s)-1:
                return dfs(s[:-1],0)
            return any(dfs(s[:i]+c+s[i+1:],i+1) for c in d[s[i:i+2]])
        
        d = defaultdict(list)
        for s in allowed:
            d[s[:2]].append(s[2])
        return dfs(bottom, 0)
```
103 ms
