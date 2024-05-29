# 0292：Nim 游戏


> <u>**[力扣第 292 题](https://leetcode.cn/problems/nim-game/)**</u>

## 题目

<p>你和你的朋友，两个人一起玩 <a href="https://baike.baidu.com/item/Nim游戏/6737105" target="_blank">Nim 游戏</a>：</p>

<ul>
<li>桌子上有一堆石头。</li>
<li>你们轮流进行自己的回合， <strong>你作为先手 </strong>。</li>
<li>每一回合，轮到的人拿掉 1 - 3 块石头。</li>
<li>拿掉最后一块石头的人就是获胜者。</li>
</ul>

<p>假设你们每一步都是最优解。请编写一个函数，来判断你是否可以在给定石头数量为 <code>n</code> 的情况下赢得游戏。如果可以赢，返回 <code>true</code>；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong><code>n = 4</code>
<strong>输出：</strong>false
<strong>解释：</strong>以下是可能的结果:
1. 移除1颗石头。你的朋友移走了3块石头，包括最后一块。你的朋友赢了。
2. 移除2个石子。你的朋友移走2块石头，包括最后一块。你的朋友赢了。
3.你移走3颗石子。你的朋友移走了最后一块石头。你的朋友赢了。
在所有结果中，你的朋友是赢家。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>true
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

经典的博弈：
- 如果 n 是 4 的倍数，先手必输
	- 因为后手可以保证每一轮共拿走 4 块，最后一轮刚好拿完
- 如果 n 不是 4 的倍数，先手比赢
	- 因为先手拿走 n%4 块使得 n 变为 4 的倍数，就变为上面的情况了

## 解答

```python
class Solution:
    def canWinNim(self, n: int) -> bool:
        return n%4>0
```
30 ms


