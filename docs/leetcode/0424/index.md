# 0424：替换后的最长重复字符（★）


> <u>**[力扣第 424 题](https://leetcode.cn/problems/longest-repeating-character-replacement/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个整数 <code>k</code> 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 <code>k</code> 次。</p>

<p>在执行上述操作后，返回 <em>包含相同字母的最长子字符串的长度。</em></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ABAB", k = 2
<strong>输出：</strong>4
<strong>解释：</strong>用两个'A'替换为两个'B',反之亦然。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "AABABBA", k = 1
<strong>输出：</strong>4
<strong>解释：</strong>
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
可能存在其他的方法来得到同样的结果。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 仅由大写英文字母组成</li>
<li><code>0 &lt;= k &lt;= s.length</code></li>
</ul>


## 分析

### #1

典型的滑动窗口问题，维护窗口内的计数即可。

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        res,i = 0,0
        ct = defaultdict(int)
        for j,x in enumerate(s):
            ct[x] += 1
            while j-i+1-max(ct.values())>k:
                ct[s[i]]-=1
                i += 1
            res = max(res,j-i+1)
        return res
```
140 ms

### #2

还有个剪枝技巧：
- 因为是求最大长度，所以窗口无需缩小，不满足时移动一步即可
- 窗口不会缩小，那么返回最终窗口大小即可


```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        i,j = 0,0
        ct = defaultdict(int)
        for j,x in enumerate(s):
            ct[x] += 1
            if j-i+1-max(ct.values())>k:
                ct[s[i]]-=1
                i += 1
        return j-i+1
```
92 ms

### #3

还可以优化掉字符种类的时间
- 上述过程中，窗口有两种变化，一种是右边不断扩大，一种是滑动
- 注意到每次从滑动状态切换到扩大状态时，一定是新加入的字母 a 为众数
	- 否则，假如此时窗口是 [i,j]，字母 b 为满足条件的众数
	- 那么对于 [i-1,j]，字母 b 也是满足条件的众数
	- 那么上一步的窗口 [i-1,j-1] 就应该扩大，而不是滑动了，矛盾
- 因此，只要用新加入的字母维护众数个数 ma 即可
## 解答

```python
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        i,j = 0,0
        ct = defaultdict(int)
        ma = 0
        for j,x in enumerate(s):
            ct[x] += 1
            ma = max(ma,ct[x])
            if j-i+1-ma>k:
                ct[s[i]]-=1
                i += 1
        return j-i+1
```
70 ms


