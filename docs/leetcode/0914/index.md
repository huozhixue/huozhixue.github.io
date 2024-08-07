# 0914：卡牌分组（1370 分）


> <u>**[力扣第 104 场周赛第 1 题](https://leetcode.cn/problems/x-of-a-kind-in-a-deck-of-cards/)**</u>

## 题目

<p>给定一副牌，每张牌上都写着一个整数。</p>

<p>此时，你需要选定一个数字 <code>X</code>，使我们可以将整副牌按下述规则分成 1 组或更多组：</p>

<ul>
<li>每组都有 <code>X</code> 张牌。</li>
<li>组内所有的牌上都写着相同的整数。</li>
</ul>

<p>仅当你可选的 <code>X &gt;= 2</code> 时返回 <code>true</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>deck = [1,2,3,4,4,3,2,1]
<strong>输出：</strong>true
<strong>解释：</strong>可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>deck = [1,1,1,2,2,2,3,3]
<strong>输出：</strong>false
<strong>解释：</strong>没有满足要求的分组。
</pre>

<p><br />
<strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= deck.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= deck[i] &lt; 10<sup>4</sup></code></li>
</ul>




## 分析

先将相同的牌分到一组，发现如果所有组的牌数有一个大于 1 的最大公约数，则可行。

## 解答

```python
def hasGroupsSizeX(self, deck: List[int]) -> bool:
    return reduce(gcd, Counter(deck).values())>1
```
36 ms

