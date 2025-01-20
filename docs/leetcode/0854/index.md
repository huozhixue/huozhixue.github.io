# 0854：相似度为 K 的字符串（2377 分）


> <u>**[力扣第 89 场周赛第 4 题](https://leetcode.cn/problems/k-similar-strings/)**</u>

## 题目

<p>对于某些非负整数 <code>k</code> ，如果交换 <code>s1</code> 中两个字母的位置恰好 <code>k</code> 次，能够使结果字符串等于 <code>s2</code> ，则认为字符串 <code>s1</code> 和 <code>s2</code> 的<strong> 相似度为 </strong><code>k</code><strong> </strong><strong>。</strong></p>

<p>给你两个字母异位词 <code>s1</code> 和 <code>s2</code> ，返回 <code>s1</code> 和 <code>s2</code> 的相似度 <code>k</code><strong> </strong>的最小值。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s1 = "ab", s2 = "ba"
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s1 = "abc", s2 = "bca"
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s1.length &lt;= 20</code></li>
<li><code>s2.length == s1.length</code></li>
<li><code>s1</code> 和 <code>s2</code>  只包含集合 <code>{'a', 'b', 'c', 'd', 'e', 'f'}</code> 中的小写字母</li>
<li><code>s2</code> 是 <code>s1</code> 的一个字母异位词</li>
</ul>


**相似问题：**
- [0765：情侣牵手（1999 分）](/leetcode/0765)


## 分析

- 按 s1 最后一个字符和哪个位置交换即可递归
- 可以先把 s1 和 s2 相同的部分去掉，节省时间

## 解答

```python
class Solution:
    def kSimilarity(self, s1: str, s2: str) -> int:
        @cache
        def dfs(s1,s2):
            if not s1:
                return 0
            if s1[0]==s2[0]:
                return dfs(s1[1:],s2[1:])
            res = inf
            for i in range(1,len(s2)):
                if s2[i]==s1[0]:
                    res = min(res, 1+dfs(s1[1:],s2[1:i]+s2[0]+s2[i+1:]))
            return res
        A,B = [],[]
        for a,b in zip(s1,s2):
            if a!=b:
                A.append(a)
                B.append(b)
        s1,s2 =''.join(A),''.join(B)
        return dfs(s1,s2)
```
127 ms

