# 0822：翻转卡片游戏（1594 分）


> <u>**[力扣第 822 题](https://leetcode.cn/problems/card-flipping-game/)**</u>

## 题目

<p>在桌子上有 <code>n</code> 张卡片，每张卡片的正面和背面都写着一个正数（正面与背面上的数有可能不一样）。</p>

<p>我们可以先翻转任意张卡片，然后选择其中一张卡片。</p>

<p>如果选中的那张卡片背面的数字 <code>x</code> 与任意一张卡片的正面的数字都不同，那么这个数字是我们想要的数字。</p>

<p>哪个数是这些想要的数字中最小的数（找到这些数中的最小值）呢？如果没有一个数字符合要求的，输出 <code>0</code> 。</p>

<p>其中, <code>fronts[i]</code> 和 <code>backs[i]</code> 分别代表第 <code>i</code> 张卡片的正面和背面的数字。</p>

<p>如果我们通过翻转卡片来交换正面与背面上的数，那么当初在正面的数就变成背面的数，背面的数就变成正面的数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>fronts = [1,2,4,4,7], backs = [1,3,4,1,3]
<strong>输出：</strong><code>2</code>
<strong>解释：</strong>假设我们翻转第二张卡片，那么在正面的数变成了 <code>[1,3,4,4,7]</code> ， 背面的数变成了 <code>[1,2,4,1,3]。</code>
接着我们选择第二张卡片，因为现在该卡片的背面的数是 2，2 与任意卡片上正面的数都不同，所以 2 就是我们想要的数字。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>fronts = [1], backs = [1]
<strong>输出：</strong>0
<strong>解释：</strong>
无论如何翻转都无法得到想要的数字，所以返回 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == fronts.length == backs.length</code></li>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>1 &lt;= fronts[i], backs[i] &lt;= 2000</code></li>
</ul>


## 分析

先想想暴力做法。比如示例中，先看 fronts+backs 中最小的数 1，发现第一张卡片正面数字必然是 1，故无法满足。
继续看第二小的数 2，发现每张卡片都可以让正面不为 2，故即为所求。

观察发现，对于数字 x，只要一张卡片不是正反面都为 x，那么就可以让正面不为 x。反之，若有一张卡片正反面都为 x，x 必然不满足要求。

因此，只需要去掉所有 fronts[i]==backs[i] 的数字，取剩下的最小数字即可。


## 解答

```python
def flipgame(self, fronts: List[int], backs: List[int]) -> int:
	same = set(front for front, back in zip(fronts, backs) if front==back)
	tmp = [num for num in fronts+backs if num not in same]
	return min(tmp) if tmp else 0
```

时间复杂度 O(N)，120 ms

