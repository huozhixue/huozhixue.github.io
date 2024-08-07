# 2156：查找给定哈希值的子串（2062 分）


> <u>**[力扣第 278 场周赛第 3 题](https://leetcode.cn/problems/find-substring-with-given-hash-value/)**</u>

## 题目

<p>给定整数 <code>p</code> 和 <code>m</code> ，一个长度为 <code>k</code> 且下标从 <strong>0</strong> 开始的字符串 <code>s</code> 的哈希值按照如下函数计算：</p>

<ul>
<li><code>hash(s, p, m) = (val(s[0]) * p<sup>0</sup> + val(s[1]) * p<sup>1</sup> + ... + val(s[k-1]) * p<sup>k-1</sup>) mod m</code>.</li>
</ul>

<p>其中 <code>val(s[i])</code> 表示 <code>s[i]</code> 在字母表中的下标，从 <code>val('a') = 1</code> 到 <code>val('z') = 26</code> 。</p>

<p>给你一个字符串 <code>s</code> 和整数 <code>power</code>，<code>modulo</code>，<code>k</code> 和 <code>hashValue</code> 。请你返回 <code>s</code> 中 <strong>第一个</strong> 长度为 <code>k</code> 的 <strong>子串</strong> <code>sub</code> ，满足<em> </em><code>hash(sub, power, modulo) == hashValue</code> 。</p>

<p>测试数据保证一定 <strong>存在</strong> 至少一个这样的子串。</p>

<p><strong>子串</strong> 定义为一个字符串中连续非空字符组成的序列。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>s = "leetcode", power = 7, modulo = 20, k = 2, hashValue = 0
<strong>输出：</strong>"ee"
<strong>解释：</strong>"ee" 的哈希值为 hash("ee", 7, 20) = (5 * 1 + 5 * 7) mod 20 = 40 mod 20 = 0 。
"ee" 是长度为 2 的第一个哈希值为 0 的子串，所以我们返回 "ee" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>s = "fbxzaad", power = 31, modulo = 100, k = 3, hashValue = 32
<b>输出：</b>"fbx"
<b>解释：</b>"fbx" 的哈希值为 hash("fbx", 31, 100) = (6 * 1 + 2 * 31 + 24 * 31<sup>2</sup>) mod 100 = 23132 mod 100 = 32 。
"bxz" 的哈希值为 hash("bxz", 31, 100) = (2 * 1 + 24 * 31 + 26 * 31<sup>2</sup>) mod 100 = 25732 mod 100 = 32 。
"fbx" 是长度为 3 的第一个哈希值为 32 的子串，所以我们返回 "fbx" 。
注意，"bxz" 的哈希值也为 32 ，但是它在字符串中比 "fbx" 更晚出现。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= s.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= power, modulo &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= hashValue &lt; modulo</code></li>
<li><code>s</code> 只包含小写英文字母。</li>
<li>测试数据保证一定 <strong>存在</strong> 满足条件的子串。</li>
</ul>


**相似问题：**
- [1316：不同的循环子字符串（1836 分）](/leetcode/1316)


## 分析

典型的滚动哈希。

注意这里定义的哈希值在前面的是低位，和一般的滚动哈希相反。
因此考虑将 s 反向，找最后一个满足要求的子串，然后再反向返回即可。


## 解答

```python
def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
    end, s = None, s[::-1]
    w, bL = 0, pow(power, k, modulo)
    for j, char in enumerate(s):
        w = w*power+ord(char)-ord('a')+1
        if j>=k:
            w -= (ord(s[j-k])-ord('a')+1)*bL
        w %= modulo
        if j>=k-1 and w == hashValue:
            end = j
    return s[end+1-k:end+1][::-1]
```
244 ms
