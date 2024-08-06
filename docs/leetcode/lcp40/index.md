# LCP 40：心算挑战


> <u>**[力扣第 LCP 40 题](https://leetcode.cn/problems/uOAnQW/)**</u>

## 题目

「力扣挑战赛」心算项目的挑战比赛中，要求选手从 `N` 张卡牌中选出 `cnt` 张卡牌，若这 `cnt` 张卡牌数字总和为偶数，则选手成绩「有效」且得分为 `cnt` 张卡牌数字总和。
给定数组 `cards` 和 `cnt`，其中 `cards[i]` 表示第 `i` 张卡牌上的数字。 请帮参赛选手计算最大的有效得分。若不存在获取有效得分的卡牌方案，则返回 0。

**示例 1：**
>输入：`cards = [1,2,8,9], cnt = 3`
>
>输出：`18`
>
>解释：选择数字为 1、8、9 的这三张卡牌，此时可获得最大的有效得分 1+8+9=18。

**示例 2：**
>输入：`cards = [3,3,1], cnt = 1`
>
>输出：`0`
>
>解释：不存在获取有效得分的卡牌方案。

**提示：**
- `1 <= cnt <= cards.length <= 10^5`
- `1 <= cards[i] <= 1000`






## 分析

- 分为奇偶两组，显然奇数卡牌只能选偶数个
- 遍历奇数卡牌的个数 i，偶数卡牌个数 cnt-i，显然都取组内最大的一部分数
- 将组内排序并预处理前缀和，即可节省时间

## 解答

```python
class Solution:
    def maxmiumScore(self, cards: List[int], cnt: int) -> int:
        A,B = [0],[0]
        for x in sorted(cards)[::-1]:
            C = A if x%2 else B
            C.append(x+C[-1])
        res = 0
        for i in range(0,cnt+1,2):
            if i<len(A) and cnt-i<len(B):
                res = max(res,A[i]+B[cnt-i])
        return res
```
562 ms
