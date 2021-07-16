# 0862：和至少为 K 的最短子数组（★★★）



## 题目

返回 A 的最短的非空连续子数组的长度，该子数组的和至少为 K 。

如果没有和至少为 K 的非空子数组，返回 -1 。

提示：

- 1 <= A.length <= 50000
- -10 ^ 5 <= A[i] <= 10 ^ 5
- 1 <= K <= 10 ^ 9

 <!--more--> 
 
示例 1：

	输入：A = [1], K = 1
	输出：1

示例 2：

	输入：A = [1,2], K = 4
	输出：-1

示例 3：

	输入：A = [2,-1,2], K = 3
	输出：3
 
 
## 分析

### #1

有关子数组的和的问题，首先想到前缀和。得到前缀数组 pre 后，问题即是求最小的 j-i 使得 pre[i]+K <= pre[j]。

暴力法就是遍历位置 j，在 pre[:j] 中找最大的 i 使得 pre[i] <= pre[j]-K。

注意到如果 x < y 且 pre[x] >= pre[y]，显然 x 不可能是答案。
因此可以维护一个严格递增的列表 A，保存有用的位置和值。
然后每轮在 A 中二分查找最后一个小于等于 pre[j]-K 的位置即可。
	
```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    pre = list(accumulate([0]+nums))
    res, A = float('inf'), []
    for j, val in enumerate(pre):
        while A and A[-1][0]>=val:
            A.pop()
        pos = bisect_right(A, (val-k, float('inf')))-1
        if pos >= 0:
            res = min(res, j-A[pos][1])
        A.append((val, j))
    return res if res < float('inf') else -1
```

568 ms

### #2

还有个巧妙的想法，遍历到 j 时，对于 A 中所有满足 pre[x] <= pre[j]-K 的位置 x，
x 能对应的最短子数组就是 pre[x:j+1]，可以弹出 x。

因此 A 是一个单调队列。

## 解答

```python
def shortestSubarray(self, A: List[int], K: int) -> int:
    pre = list(accumulate([0]+A))
    res, A = float('inf'), deque()
    for j in range(len(pre)):
        while A and pre[A[-1]] >= pre[j]:
            A.pop()
        while A and pre[A[0]] <= pre[j]-K:
            res = min(res, j-A.popleft())
        A.append(j)
    return res if res < float('inf') else -1
```

252 ms

