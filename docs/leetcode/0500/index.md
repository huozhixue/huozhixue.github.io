# 0500：键盘行


> <u>**[力扣第 500 题](https://leetcode.cn/problems/keyboard-row/)**</u>

## 题目

<p>给你一个字符串数组 <code>words</code> ，只返回可以使用在 <strong>美式键盘</strong> 同一行的字母打印出来的单词。键盘如下图所示。</p>

<p><strong>美式键盘</strong> 中：</p>

<ul>
<li>第一行由字符 <code>"qwertyuiop"</code> 组成。</li>
<li>第二行由字符 <code>"asdfghjkl"</code> 组成。</li>
<li>第三行由字符 <code>"zxcvbnm"</code> 组成。</li>
</ul>

<p><img alt="American keyboard" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/keyboard.png" style="width: 100%; max-width: 600px" /></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["Hello","Alaska","Dad","Peace"]
<strong>输出：</strong>["Alaska","Dad"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["omk"]
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>words = ["adsdf","sfd"]
<strong>输出：</strong>["adsdf","sfd"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= words.length <= 20</code></li>
<li><code>1 <= words[i].length <= 100</code></li>
<li><code>words[i]</code> 由英文字母（小写和大写字母）组成</li>
</ul>


## 分析

遍历判断每个单词的字符集合是否是某一行的子集即可。

注意单词可能有大写，要先全转为小写。

## 解答

```python
def findWords(self, words: List[str]) -> List[str]:
	return [w for w in words if any(set(w.lower())<=set(s) for s in ["qwertyuiop", "asdfghjkl", "zxcvbnm"])]
```
32 ms
