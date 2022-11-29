# 0647：回文子串（★★）


## 题目


给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。

回文字符串 是正着读和倒过来读一样的字符串。

子字符串 是字符串中的由连续字符组成的一个序列。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

 
示例 1：
    
    输入：s = "abc"
    输出：3
    解释：三个回文子串: "a", "b", "c"
示例 2：
    
    输入：s = "aaa"
    输出：6
    解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
     

提示：
- 1 <= s.length <= 1000
- s 由小写英文字母组成
 
## 分析

### #1

类似 {{< lc "0005" >}}，可以发现在用 区间 dp 或中心扩展法的过程中，即可得到所有的回文子串。

这里用中心扩展法。

```python
def countSubstrings(self, s: str) -> int:
	def expand(s, left, right):
		while left > 0 and right < len(s)-1 and s[left-1] == s[right+1]:
			left -= 1
			right += 1
			self.res += 1
			
	self.res = len(s)
	for i in range(len(s)):
		expand(s, i, i)
		expand(s, i+1, i)
	return self.res
```
时间复杂度 O(N^2)，208 ms

### #2

还可以尝试经典的 Manacher 算法。

## 解答

```python
def countSubstrings(self, s: str) -> int:
    def expand(l, r):
        while l and r<len(ss)-1 and ss[l-1]==ss[r+1]:
            l -= 1
            r += 1
        return (r-l)//2

    res = 0
    pair, ss = (0, 0), '#' + '#'.join(s) + '#'
    A, center, right = [], 0, 0
    for i in range(len(ss)):
        min_arm = min(A[2*center-i], right-i) if right > i else 0
        cur_arm = expand(i-min_arm, i+min_arm)
        A.append(cur_arm)
        if i + cur_arm > right:
            center, right = i, i + cur_arm
        res += (cur_arm+1) // 2
    return res
```
时间复杂度 O(N)，48 ms

