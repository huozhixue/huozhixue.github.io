# 0744：寻找比目标字母大的最小字母


> <u>**[力扣第 744 题](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/)**</u>

## 题目

<p>给你一个字符数组 <code>letters</code>，该数组按<strong>非递减顺序</strong>排序，以及一个字符 <code>target</code>。<code>letters</code> 里<strong>至少有两个不同</strong>的字符。</p>

<p>返回 <code>letters</code> 中大于 <code>target</code> 的最小的字符。如果不存在这样的字符，则返回 <code>letters</code> 的第一个字符。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong>letters = ["c", "f", "j"]，target = "a"
<strong>输出:</strong> "c"
<strong>解释：</strong>letters 中字典上比 'a' 大的最小字符是 'c'。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> letters = ["c","f","j"], target = "c"
<strong>输出:</strong> "f"
<strong>解释：</strong>letters 中字典顺序上大于 'c' 的最小字符是 'f'。</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> letters = ["x","x","y","y"], target = "z"
<strong>输出:</strong> "x"
<strong>解释：</strong>letters 中没有一个字符在字典上大于 'z'，所以我们返回 letters[0]。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= letters.length &lt;= 10<sup>4</sup></code></li>
<li><code>letters[i]</code> 是一个小写字母</li>
<li><code>letters</code> 按<strong>非递减顺序</strong>排序</li>
<li><code>letters</code> 最少包含两个不同的字母</li>
<li><code>target</code> 是一个小写字母</li>
</ul>


**相似问题：**
- [2148：元素计数（1201 分）](/leetcode/2148)


## 分析

### #1

遍历找到第一个比 target 大的字母即可。如果都比 target 小，那么按照循环应该返回 letters[0]。

```python
def nextGreatestLetter(self, letters: List[str], target: str) -> str:
	for letter in letters:
		if letter > target:
			return letter
	return letters[0]
```

124 ms

### #2

也可以二分查找从最右边将 target 插入 nums 的位置 i。如果 i == len(letters)，那么应该返回 letters[0]。

## 解答

```python
def nextGreatestLetter(self, letters: List[str], target: str) -> str:
	return letters[bisect_right(letters, target) % (len(letters))]
```

124 ms

