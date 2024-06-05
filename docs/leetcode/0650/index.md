# 0650：两个键的键盘（★）


> <u>**[力扣第 650 题](https://leetcode.cn/problems/2-keys-keyboard/)**</u>

## 题目

<p>最初记事本上只有一个字符 <code>'A'</code> 。你每次可以对这个记事本进行两种操作：</p>

<ul>
<li><code>Copy All</code>（复制全部）：复制这个记事本中的所有字符（不允许仅复制部分字符）。</li>
<li><code>Paste</code>（粘贴）：粘贴<strong> 上一次 </strong>复制的字符。</li>
</ul>

<p>给你一个数字 <code>n</code> ，你需要使用最少的操作次数，在记事本上输出 <strong>恰好</strong> <code>n</code> 个 <code>'A'</code> 。返回能够打印出 <code>n</code> 个 <code>'A'</code> 的最少操作次数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>3
<strong>输出：</strong>3
<strong>解释：</strong>
最初, 只有一个字符 'A'。
第 1 步, 使用 <strong>Copy All</strong> 操作。
第 2 步, 使用 <strong>Paste </strong>操作来获得 'AA'。
第 3 步, 使用 <strong>Paste</strong> 操作来获得 'AAA'。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>


## 分析

操作必然是先复制再粘贴 k 次的形式。而这等价于将个数乘以 k+1。

因此可以将问题转化为，求 n 的一个因数分解形式，使得因数和最小。

根据代数知识可知，质因数分解形式的因数和最小，因此将 n 质因数分解即可。

## 解答

```python
def minSteps(self, n: int) -> int:
    res = 0
    for i in range(2, int(sqrt(n))+1):
        if n%i == 0:
            while n%i==0:
                n //= i
                res += i
    return res + (n if n>1 else 0)
```
40 ms

