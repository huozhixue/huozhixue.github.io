# 0692：前K个高频单词（★）


> <u>**[力扣第 692 题](https://leetcode.cn/problems/top-k-frequent-words/)**</u>

## 题目

<p>给定一个单词列表 <code>words</code> 和一个整数 <code>k</code> ，返回前 <code>k</code><em> </em>个出现次数最多的单词。</p>

<p>返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率， <strong>按字典顺序</strong> 排序。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> words = ["i", "love", "leetcode", "i", "love", "coding"], k = 2
<strong>输出:</strong> ["i", "love"]
<strong>解析:</strong> "i" 和 "love" 为出现次数最多的两个单词，均为2次。
注意，按字母顺序 "i" 在 "love" 之前。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
<strong>输出:</strong> ["the", "is", "sunny", "day"]
<strong>解析:</strong> "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
出现次数依次为 4, 3, 2 和 1 次。
</pre>



<p><strong>注意：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 500</code></li>
<li><code>1 &lt;= words[i] &lt;= 10</code></li>
<li><code>words[i]</code> 由小写英文字母组成。</li>
<li><code>k</code> 的取值范围是 <code>[1, <strong>不同</strong> words[i] 的数量]</code></li>
</ul>



<p><strong>进阶：</strong>尝试以 <code>O(n log k)</code> 时间复杂度和 <code>O(n)</code> 空间复杂度解决。</p>


**相似问题：**
- [0347：前 K 个高频元素](/leetcode/0347)
- [0973：最接近原点的 K 个点（1213 分）](/leetcode/0973)
- [1772：按受欢迎程度排列功能](/leetcode/1772)
- [2284：最多单词数的发件人（1346 分）](/leetcode/2284)
- [2341：数组能形成多少数对（1184 分）](/leetcode/2341)


## 分析

Counter 计数后，用 sort 或者 heapq.nsmallest 即可。

## 解答

```python
def topKFrequent(self, words: List[str], k: int) -> List[str]:
	ct = Counter(words)
	return nsmallest(k, ct, key=lambda x: (-ct[x], x))
```

72 ms

