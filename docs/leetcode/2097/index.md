# 2097：合法重新排列数对（★★★）


> **第 270 场周赛第 4 题**

## 题目

给你一个下标从 0 开始的二维整数数组 pairs ，其中 pairs[i] = [starti, endi] 。
如果 pairs 的一个重新排列，满足对每一个下标 i （ 1 <= i < pairs.length ）都有 endi-1 == starti ，
那么我们就认为这个重新排列是 pairs 的一个 合法重新排列 。

请你返回 任意一个 pairs 的合法重新排列。

注意：数据保证至少存在一个 pairs 的合法重新排列。

示例 1：

    输入：pairs = [[5,1],[4,5],[11,9],[9,4]]
    输出：[[11,9],[9,4],[4,5],[5,1]]
    解释：
    输出的是一个合法重新排列，因为每一个 endi-1 都等于 starti 。
    end0 = 9 == 9 = start1 
    end1 = 4 == 4 = start2
    end2 = 5 == 5 = start3

示例 2：

    输入：pairs = [[1,3],[3,2],[2,1]]
    输出：[[1,3],[3,2],[2,1]]
    解释：
    输出的是一个合法重新排列，因为每一个 endi-1 都等于 starti 。
    end0 = 3 == 3 = start1
    end1 = 2 == 2 = start2
    重新排列后的数组 [[2,1],[1,3],[3,2]] 和 [[3,2],[2,1],[1,3]] 都是合法的。

示例 3：

    输入：pairs = [[1,2],[1,3],[2,1]]
    输出：[[1,2],[2,1],[1,3]]
    解释：
    输出的是一个合法重新排列，因为每一个 endi-1 都等于 starti 。
    end0 = 2 == 2 = start1
    end1 = 1 == 1 = start2
 

提示：
- 1 <= pairs.length <= 10^5
- pairs[i].length == 2
- 0 <= starti, endi <= 10^9
- starti != endi
- pairs 中不存在一模一样的数对。
- 至少 存在 一个合法的 pairs 重新排列。

 
## 分析

将 start，end 看作点，pair 看作边，那么就是典型的欧拉通路问题。

数据保证存在欧拉通路，那么先找到起始节点

    若存在点的出度比入度多 1，该点即是起始节点
    否则任一点都可作为起始节点

然后用 Hierholzer 算法即可。


## 解答

```python
def validArrangement(self, pairs: List[List[int]]) -> List[List[int]]:
    def dfs(u):
        while nxt[u]:
            dfs(nxt[u].pop())
        stack.append(u)
    
    nxt, ct = defaultdict(list), Counter()
    for u, v in pairs:
        nxt[u].append(v)
        ct[u] += 1
        ct[v] -= 1
    A = [u for u, _ in pairs if ct[u]==1]
    stack, start = [], A.pop() if A else pairs[0][0]
    dfs(start)
    return [[stack[i], stack[i-1]] for i in range(len(stack)-1, 0, -1)]
```
时间复杂度 O(N)，712 ms
