# 0395：至少有K个重复字符的最长子串（★★）


第 3 场周赛第 4 题

## 题目

给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 
要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

提示：

- 1 <= s.length <= 10^4
- s 仅由小写英文字母组成
- 1 <= k <= 10^5

 <!--more--> 
 
示例 1：
    
    输入：s = "aaabb", k = 3
    输出：3
    解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。

示例 2：

    输入：s = "ababbc", k = 2
    输出：5
    解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 



## 分析

若某字符 char 在 s 中出现的次数小于 k，显然子串 T 就不能含有 char。

将 s 按所有频数小于 k 的字符分割，即可转为递归子问题。

若不存在频数小于 k 的字符，显然 s 即为所求。

## 解答

```python
def longestSubstring(self, s: str, k: int) -> int:
    stops = [char for char, freq in Counter(s).items() if freq < k]
    if not stops:
        return len(s)
    return max(self.longestSubstring(sub, k) for sub in re.split('|'.join(stops), s))
```

60 ms


