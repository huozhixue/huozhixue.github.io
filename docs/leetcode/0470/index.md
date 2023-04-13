# 0470：用 Rand7() 实现 Rand10()（★）


> <u>**[力扣第 470 题](https://leetcode.cn/problems/implement-rand10-using-rand7/)**</u>

## 题目

<p>给定方法 <code>rand7</code> 可生成 <code>[1,7]</code> 范围内的均匀随机整数，试写一个方法 <code>rand10</code> 生成 <code>[1,10]</code> 范围内的均匀随机整数。</p>

<p>你只能调用 <code>rand7()</code> 且不能调用其他方法。请不要使用系统的 <code>Math.random()</code> 方法。</p>

<ol>
</ol>

<p>每个测试用例将有一个内部参数 <code>n</code>，即你实现的函数 <code>rand10()</code> 在测试时将被调用的次数。请注意，这不是传递给 <code>rand10()</code> 的参数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>1
<strong>输出: </strong>[2]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>2
<strong>输出: </strong>[2,8]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>3
<strong>输出: </strong>[3,8,10]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶:</strong></p>

<ul>
<li><code>rand7()</code>调用次数的 <a href="https://en.wikipedia.org/wiki/Expected_value" target="_blank">期望值</a> 是多少 ?</li>
<li>你能否尽量少调用 <code>rand7()</code> ?</li>
</ul>


## 分析

典型的拒绝抽样。
- 调用两次 rand7，等价于 rand49
- 然后 1 到 40 对 10 取模即可等价于 rand10
- 如果大于 40，就重新抽样

## 解答

```python
def rand10(self):
    while True:
        res = (rand7() - 1) * 7 + rand7()
        if res <= 40:
            return res % 10 + 1
```

340 ms


