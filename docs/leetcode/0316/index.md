# 0316：去除重复字母（★★★）


## 题目

给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。
需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。


示例 1：

    输入：s = "bcabc"
    输出："abc"

示例 2：

    输入：s = "cbacdcbc"
    输出："acdb"
	
提示：
- 1 <= s.length <= 10^4
- s 由小写英文字母组成
 

## 分析

{{< lc "0402" >}} 的进阶版。如果没有每个字母出现一次的限制，保持字符串升序即可。

为了保证每个字母出现一次:
- 若某个字母已经在栈中，应该跳过它
- 若某个字母后面不再出现，就不能去掉它

	
## 解答

```python
def removeDuplicateLetters(self, s: str) -> str:
    stack, vis, ct = [], set(), Counter(s)
    for c in s:
        ct[c] -= 1
        if c not in vis:
            while stack and stack[-1]>c and ct[stack[-1]]:
                vis.remove(stack.pop())
            stack.append(c)
            vis.add(c)
    return ''.join(stack)
```
32 ms
