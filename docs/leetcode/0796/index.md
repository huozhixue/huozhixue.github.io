# 0796：旋转字符串（★★）


> **第 75 场双周赛第 1 题****

## 题目

给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。

s 的 旋转操作 就是将 s 最左边的字符移动到最右边。 

例如, 若 s = 'abcde'，在旋转一次之后结果就是'bcdea' 。
 

示例 1:

    输入: s = "abcde", goal = "cdeab"
    输出: true
示例 2:
    
    输入: s = "abcde", goal = "abced"
    输出: false
 

提示:
- 1 <= s.length, goal.length <= 100
- s 和 goal 由小写英文字母组成


## 分析

每种旋转都等价于 s+s 的一个长为 len(s) 的子串，因此直接判断 goal 是否长 len(s) 且是 s+s 的子串即可。

## 解答

```python
def rotateString(self, s: str, goal: str) -> bool:
    return len(s)==len(goal) and goal in s*2
```
48 ms

