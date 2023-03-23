# 0320：列举单词的全部缩写（★）


> <u>**[力扣第 320 题](https://leetcode.cn/problems/generalized-abbreviation/)**</u>

## 题目

<p>单词的 <strong>广义缩写词</strong> 可以通过下述步骤构造：先取任意数量的 <strong>不重叠、不相邻</strong> 的子字符串，再用它们各自的长度进行替换。</p>

<ul>
<li>例如，<code>"abcde"</code> 可以缩写为：

<ul>
<li><code>"a3e"</code>（<code>"bcd"</code> 变为 <code>"3"</code> ）</li>
<li><code>"1bcd1"</code>（<code>"a"</code> 和 <code>"e"</code> 都变为 <code>"1"</code>）<meta charset="UTF-8" /></li>
<li><code>"5"</code> (<code>"abcde"</code> 变为 <code>"5"</code>)</li>
<li><code>"abcde"</code> (没有子字符串被代替)</li>
</ul>
</li>
<li>然而，这些缩写是 <strong>无效的</strong> ：
<ul>
<li><code>"23"</code>（<code>"ab"</code> 变为 <code>"2"</code> ，<code>"cde"</code> 变为 <code>"3"</code> ）是无效的，因为被选择的字符串是相邻的</li>
<li><meta charset="UTF-8" /><code>"22de"</code> (<code>"ab"</code> 变为 <code>"2"</code> ， <code>"bc"</code> 变为 <code>"2"</code>)  是无效的，因为被选择的字符串是重叠的</li>
</ul>
</li>
</ul>

<p>给你一个字符串 <code>word</code> ，返回 <em>一个由</em> <code>word</code> 的<em>所有可能 <strong>广义缩写词</strong> 组成的列表</em> 。按 <strong>任意顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>word = "word"
<strong>输出：</strong>["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>word = "a"
<strong>输出：</strong>["1","a"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= word.length &lt;= 15</code></li>
<li><code>word</code> 仅由小写英文字母组成</li>
</ul>


## 分析

每个广义缩写词即对应一种缩写位置的集合，因此遍历 word 的子集并缩写即可。

可以用状态压缩来表示集合。

## 解答

```python
def generateAbbreviations(self, word: str) -> List[str]:
    def gen(st):
        res, cnt = '', 0
        for c, bit in zip(word, bin(st)[2:].zfill(n)):
            if bit == '1':
                res += str(cnt or '') + c
                cnt = 0
            else:
                cnt += 1
        return res + str(cnt or '')

    n = len(word)
    return [gen(st) for st in range(1<<n)]
```
204 ms



