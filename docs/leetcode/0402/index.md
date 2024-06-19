# 0402：移掉 K 位数字（★）


> <u>**[力扣第 402 题](https://leetcode.cn/problems/remove-k-digits/)**</u>

## 题目

<p>给你一个以字符串表示的非负整数 <code>num</code> 和一个整数 <code>k</code> ，移除这个数中的 <code>k</code><em> </em>位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。</p>


<p><strong>示例 1 ：</strong></p>

<pre>
<strong>输入：</strong>num = "1432219", k = 3
<strong>输出：</strong>"1219"
<strong>解释：</strong>移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
</pre>

<p><strong>示例 2 ：</strong></p>

<pre>
<strong>输入：</strong>num = "10200", k = 1
<strong>输出：</strong>"200"
<strong>解释：</strong>移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
</pre>

<p><strong>示例 3 ：</strong></p>

<pre>
<strong>输入：</strong>num = "10", k = 2
<strong>输出：</strong>"0"
<strong>解释：</strong>从原数字移除所有的数字，剩余为空就是 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= k <= num.length <= 10<sup>5</sup></code></li>
<li><code>num</code> 仅由若干位数字（0 - 9）组成</li>
<li>除了 <strong>0</strong> 本身之外，<code>num</code> 不含任何前导零</li>
</ul>


## 分析

- 类似 {{< lc "0316" >}}，还更简单些
- 遍历 num，假如还没删够，且当前字符比前一字符小，删掉前一字符
- 如果最终还没删够，去掉最后几位即可

## 解答

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        sk = []
        for c in num:
            while k and sk and sk[-1]>c:
                sk.pop()
                k -= 1
            sk.append(c)
        return ''.join(sk[:-k] if k else sk).lstrip('0') or '0'
```
56 ms
