# 0796：旋转字符串（1167 分）


> <u>**[力扣第 796 题](https://leetcode.cn/problems/rotate-string/)**</u>

## 题目

<p>给定两个字符串, <code>s</code> 和 <code>goal</code>。如果在若干次旋转操作之后，<code>s</code> 能变成 <code>goal</code> ，那么返回 <code>true</code> 。</p>

<p><code>s</code> 的 <strong>旋转操作</strong> 就是将 <code>s</code> 最左边的字符移动到最右边。 </p>

<ul>
<li>例如, 若 <code>s = 'abcde'</code>，在旋转一次之后结果就是<code>'bcdea'</code> 。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> s = "abcde", goal = "cdeab"
<strong>输出:</strong> true
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = "abcde", goal = "abced"
<strong>输出:</strong> false
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length, goal.length &lt;= 100</code></li>
<li><code>s</code> 和 <code>goal</code> 由小写英文字母组成</li>
</ul>


## 分析

每种旋转都等价于 s+s 的一个长为 len(s) 的子串，因此直接判断 goal 是否长 len(s) 且是 s+s 的子串即可。

## 解答

```python
def rotateString(self, s: str, goal: str) -> bool:
    return len(s)==len(goal) and goal in s*2
```
48 ms

