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

经典的贪心问题：
- 遍历 num，如果当前数字比上一个数字小，可以移除上一个数字
- 移除后若还是比上一个数字小，可以继续移除
- 循环操作，直到当前数字大于等于上一个数字，或者 k 用完了
- 如果最终 k 还有剩余，说明剩下的数字是升序的，去掉最后几位即可

在遍历过程中，每一步能减小的最高位就是上一位，因此这样得到的数就是最小的。


## 解答

```python
def removeKdigits(self, num: str, k: int) -> str:
    stack, n = [], len(num)-k
    for char in num:
        while k and stack and stack[-1] > char:
            stack.pop()
            k -= 1
        stack.append(char)
    return ''.join(stack[:n]).lstrip('0') or '0'
```
36 ms
