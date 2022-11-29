# 0017：电话号码的字母组合（★）


## 题目

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

示例 1：

    输入：digits = "23"
    输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

示例 2：

    输入：digits = ""
    输出：[]

示例 3：
    
    输入：digits = "2"
    输出：["a","b","c"]

提示：
- 0 <= digits.length <= 4
- digits[i] 是范围 ['2', '9'] 的一个数字。
     
## 分析

可以递推前 i 个字符能代表的组合。

## 解答

```python
def letterCombinations(self, digits: str) -> List[str]:
    d = dict(zip('23456789', ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']))
    res = []
    for x in digits:
        res = [sub+c for c in d[x] for sub in res or ['']]
    return res
```
52 ms
