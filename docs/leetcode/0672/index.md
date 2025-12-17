# 0672：灯泡开关 Ⅱ（★）


> <u>**[力扣第 672 题](https://leetcode.cn/problems/bulb-switcher-ii/)**</u>

## 题目

<p>房间中有 <code>n</code> 只已经打开的灯泡，编号从 <code>1</code> 到 <code>n</code> 。墙上挂着 <strong>4 个开关</strong> 。</p>

<p>这 4 个开关各自都具有不同的功能，其中：</p>

<ul>
<li><strong>开关 1 ：</strong>反转当前所有灯的状态（即开变为关，关变为开）</li>
<li><strong>开关 2 ：</strong>反转编号为偶数的灯的状态（即 <code>0, 2, 4, ...</code>）</li>
<li><strong>开关 3 ：</strong>反转编号为奇数的灯的状态（即 <code>1, 3, ...</code>）</li>
<li><strong>开关 4 ：</strong>反转编号为 <code>j = 3k + 1</code> 的灯的状态，其中 <code>k = 0, 1, 2, ...</code>（即 <code>1, 4, 7, 10, ...</code>）</li>
</ul>

<p>你必须 <strong>恰好</strong> 按压开关 <code>presses</code> 次。每次按压，你都需要从 4 个开关中选出一个来执行按压操作。</p>

<p>给你两个整数 <code>n</code> 和 <code>presses</code> ，执行完所有按压之后，返回 <strong>不同可能状态</strong> 的数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1, presses = 1
<strong>输出：</strong>2
<strong>解释：</strong>状态可以是：
- 按压开关 1 ，[关]
- 按压开关 2 ，[开]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2, presses = 1
<strong>输出：</strong>3
<strong>解释：</strong>状态可以是：
- 按压开关 1 ，[关, 关]
- 按压开关 2 ，[开, 关]
- 按压开关 3 ，[关, 开]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 3, presses = 1
<strong>输出：</strong>4
<strong>解释：</strong>状态可以是：
- 按压开关 1 ，[关, 关, 关]
- 按压开关 2 ，[关, 开, 关]
- 按压开关 3 ，[开, 关, 开]
- 按压开关 4 ，[关, 开, 开]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
<li><code>0 &lt;= presses &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0319：灯泡开关](/leetcode/0319)
- [1375：二进制字符串前缀一致的次数（1438 分）](/leetcode/1375)


## 分析

- 令 0/1 分别代表灯泡打开/关闭状态，并假设 4 个开关的状态分别是 a/b/c/d
- 可以得到每个灯泡的状态：
	- a^c^d, a^b, a^c, a^b^d, a^c, a^b, a^c^d, ....
	- 以 6 个为一组循环
	- 注意到灯泡4的状态 a^b^d = (a^c^d)^(a^b)^(a^c)，所以前三个灯泡的状态决定了所有灯泡的状态
- 再考察下哪些灯泡的状态能达到
	- 若刚好开关一次，前三个灯泡的状态可以为 111、101、010、100
	- 若刚好开关两次，前三个灯泡的状态可以为 000、101、010、011、111、001、110，只有 100 无法得到
	- 若刚好开关三次，可以基于开关两次的所有状态，按压开关1，得到除 011 的所有状态，而 011 可以通过按压开关 2/3/4 得到，所以能得到所有状态
	- 若刚好开关三次以上，可以基于开关三次的所有状态，一直按压开关1，得到所有状态
- 再特判下 n<3 的情况即可


## 解答

```python
class Solution:
    def flipLights(self, n: int, presses: int) -> int:
        if presses==0:
            return 1
        if n==1:
            return 2
        if n==2:
            return 3+(presses>1)
        return 4 if presses==1 else 7 if presses==2 else 8
```
0 ms


