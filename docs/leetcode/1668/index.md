# 1668：最大重复子字符串（★）


> <u>**[力扣第 40 场双周赛第 1 题](https://leetcode.cn/problems/maximum-repeating-substring/)**</u>

## 题目

<p>给你一个字符串 <code>sequence</code> ，如果字符串 <code>word</code> 连续重复 <code>k</code> 次形成的字符串是 <code>sequence</code> 的一个子字符串，那么单词 <code>word</code> 的 <strong>重复值为 <code>k</code></strong><strong> </strong>。单词 <code>word</code> 的 <strong>最</strong><strong>大重复值</strong> 是单词 <code>word</code> 在 <code>sequence</code> 中最大的重复值。如果 <code>word</code> 不是 <code>sequence</code> 的子串，那么重复值 <code>k</code> 为 <code>0</code> 。</p>

<p>给你一个字符串 <code>sequence</code> 和 <code>word</code> ，请你返回 <strong>最大重复值 <code>k</code> </strong>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>sequence = "ababc", word = "ab"
<b>输出：</b>2
<strong>解释：</strong>"abab" 是 "<strong>abab</strong>c" 的子字符串。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>sequence = "ababc", word = "ba"
<b>输出：</b>1
<strong>解释：</strong>"ba" 是 "a<strong>ba</strong>bc" 的子字符串，但 "baba" 不是 "ababc" 的子字符串。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>sequence = "ababc", word = "ac"
<b>输出：</b>0
<strong>解释：</strong>"ac" 不是 "ababc" 的子字符串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= sequence.length <= 100</code></li>
<li><code>1 <= word.length <= 100</code></li>
<li><code>sequence</code> 和 <code>word</code> 都只包含小写英文字母。</li>
</ul>


## 分析

### #1

设 sequence 长度 m，word 长度 n，显然 k 不超过 m//n，从大到小遍历判断即可。

```python
def maxRepeating(self, sequence: str, word: str) -> int:
    m, n = len(sequence), len(word)
    for x in range(m//n, 0, -1):
        if word*x in sequence:
            return x
    return 0
```
32 ms

### #2

令 check(x) 代表 x*word 是否为 sequence 的子串。显然 check(x) 具有单调性，因此可以用二分查找优化时间。

## 解答

```python
def maxRepeating(self, sequence: str, word: str) -> int:
    self.__class__.__getitem__ = lambda self, x: word*x not in sequence
    return bisect_left(self, True, 1, len(sequence)//len(word)+1)-1
```
32 ms


