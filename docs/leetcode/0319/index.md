# 0319：灯泡开关（★）


> <u>**[力扣第 319 题](https://leetcode.cn/problems/bulb-switcher/)**</u>

## 题目

<p>初始时有 <code>n</code><em> </em>个灯泡处于关闭状态。第一轮，你将会打开所有灯泡。接下来的第二轮，你将会每两个灯泡关闭第二个。</p>

<p>第三轮，你每三个灯泡就切换第三个灯泡的开关（即，打开变关闭，关闭变打开）。第 <code>i</code> 轮，你每 <code>i</code> 个灯泡就切换第 <code>i</code> 个灯泡的开关。直到第 <code>n</code> 轮，你只需要切换最后一个灯泡的开关。</p>

<p>找出并返回 <code>n</code><em> </em>轮后有多少个亮着的灯泡。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/bulb.jpg" style="width: 421px; height: 321px;" /></p>

<pre>
<strong>输入：</strong>n =<strong> </strong>3
<strong>输出：</strong>1
<strong>解释：</strong>
初始时, 灯泡状态 <strong>[关闭, 关闭, 关闭]</strong>.
第一轮后, 灯泡状态 <strong>[开启, 开启, 开启]</strong>.
第二轮后, 灯泡状态 <strong>[开启, 关闭, 开启]</strong>.
第三轮后, 灯泡状态 <strong>[开启, 关闭, 关闭]</strong>.

你应该返回 1，因为只有一个灯泡还亮着。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0672：灯泡开关 Ⅱ](/leetcode/0672)
- [0995：K 连续位的最小翻转次数（1835 分）](/leetcode/0995)
- [1375：二进制字符串前缀一致的次数（1438 分）](/leetcode/1375)
- [2485：找出中枢整数（1207 分）](/leetcode/2485)


## 分析

可以观察每个位置的灯泡切换了多少次：
- 位置 x 的灯泡，第 i 轮切换等价于 x % i == 0
- 位置 x 的灯泡的切换次数即为 x 的因数个数
- 根据数学知识，只有完全平方数有奇数个因数，其它都是偶数个因数
- 因此计算 1 到 n 有多少个完全平方数即可

## 解答

```python
class Solution:
    def bulbSwitch(self, n: int) -> int:
        return isqrt(n)
```
32 ms

