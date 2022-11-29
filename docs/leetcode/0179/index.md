# 0179：最大数（★★★）


## 题目

给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。

注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。


示例 1：

	输入：nums = [10,2]
	输出："210"

示例 2：

	输入：nums = [3,30,34,5,9]
	输出："9534330"

提示：
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 10^9


## 分析

首先想到按字典序降序拼接，但是某些情况并不适用。
- 例如 [3,30,34,5,9] 的字典序降序为 [9,5,34,30,3]，但正确的顺序应该是 [9,5,34,3,30]。

因此需要重新定义优先顺序。这里有个巧妙的想法，只要 $\overline{AB}>\overline{BA}$，
就认为 A 的优先级更高，应该排在前面。直觉告诉我们这样很可能是正确的，不过需要证明一下。

采用反证法：
- 假设最大结果 res 中存在 $\overline{AB}>\overline{BA}$ 但 B 排在 A 的前面。
- 显然 B 和 A 不可能是相邻的，否则直接交换就得到更大的结果了。
故res 是 $\overline{...BCA...}$ 的形式。
- 同理，应该有 $\overline{BC} \geq \overline{CB}，\overline{CA} \geq \overline{AC}$。
否则交换下就得到更大的结果。
- 设 A、B、C 对应的字符串长度分别为 x、y、z，那么由 $\overline{BC} \geq \overline{CB}，
\overline{CA} \geq \overline{AC}$ 可以推得：
$$ B * 10^z + C \geq C * 10^y + B \quad ; \quad C * 10^x + A \geq A * 10^z + C $$
$$ B * (10^z-1) \geq C * (10^y-1) \quad ; \quad C * (10^x-1) \geq A * (10^z-1) $$
$$ B * C * (10^z-1) * (10^x-1) \geq C * A * (10^y-1) * (10^z-1) $$
$$ B * (10^x-1) \geq A * (10^y-1) $$
$$ B * 10^x + A \geq A * 10^y + B $$
$$ \overline{BA} \geq \overline{AB} $$

矛盾。

故对于任意 $\overline{AB}>\overline{BA}$，应该将 A 排在 B 的前面。

## 解答

```python
def largestNumber(self, nums: List[int]) -> str:
    compare = lambda x,y: 1 if x+y<y+x else -1 if x+y>y+x else 0
    res = ''.join(sorted(map(str, nums), key=cmp_to_key(compare)))
    return res.lstrip('0') or '0'
```
时间复杂度 $O(N*log_N)$，44 ms



