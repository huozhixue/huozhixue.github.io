# 1996：游戏中弱角色的数量（★★）


> **第 257 场周赛第 2 题**

## 题目

你正在参加一个多角色游戏，每个角色都有两个主要属性：攻击 和 防御 。给你一个二维整数数组 properties ，
其中 properties[i] = [attacki, defensei] 表示游戏中第 i 个角色的属性。

如果存在一个其他角色的攻击和防御等级 都严格高于 该角色的攻击和防御等级，则认为该角色为 弱角色 。
更正式地，如果认为角色 i 弱于 存在的另一个角色 j ，
那么 attackj > attacki 且 defensej > defensei 。

返回 弱角色 的数量。

提示：
- 2 <= properties.length <= 10^5
- properties[i].length == 2
- 1 <= attacki, defensei <= 10^5

示例 1：
    
    输入：properties = [[5,5],[6,3],[3,6]]
    输出：0
    解释：不存在攻击和防御都严格高于其他角色的角色。

示例 2：
    
    输入：properties = [[2,2],[3,3]]
    输出：1
    解释：第一个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。

示例 3：

    输入：properties = [[1,5],[10,4],[4,3]]
    输出：1
    解释：第三个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。
 

## 分析

将角色按攻击排序，若攻击相同则防御较高的排前面。

令 A 代表排序后的防御数组，那么 A[i] 是弱角色等价于后面后面有角色的防御更高，即 A[i]<max(A[i+1:])。

那么倒序遍历 i 并维护 max(A[i+1:])，即可在 O(N) 时间得到弱角色数量。

## 解答

```python
def numberOfWeakCharacters(self, properties: List[List[int]]) -> int:
    A = sorted(properties, key=lambda x: (x[0],-x[1]))
    res, M = 0, float('-inf')
    for _, x in A[::-1]:
        res += int(x < M)
        M = max(M, x)
    return res
```
时间复杂度 O(N*logN)，600 ms

