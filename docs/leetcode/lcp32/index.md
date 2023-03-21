# LCP 32：批量处理任务（★★）


> <u>**[力扣杯 2021 春季个人赛第 5 题](https://leetcode.cn/problems/t3fKg1/)**</u>

## 题目

某实验室计算机待处理任务以 `[start,end,period]` 格式记于二维数组 `tasks`，表示完成该任务的时间范围为起始时间 `start` 至结束时间 `end` 之间，需要计算机投入 `period` 的时长，注意：
1. `period` 可为不连续时间
2. 首尾时间均包含在内

处于开机状态的计算机可同时处理任意多个任务，请返回电脑最少开机多久，可处理完所有任务。

**示例 1：**
>输入：`tasks = [[1,3,2],[2,5,3],[5,6,2]]`
>
>输出：`4`
>
>解释：
>tasks[0] 选择时间点 2、3；
>tasks[1] 选择时间点 2、3、5；
>tasks[2] 选择时间点 5、6；
>因此计算机仅需在时间点 2、3、5、6 四个时刻保持开机即可完成任务。

**示例 2：**
>输入：`tasks = [[2,3,1],[5,5,1],[5,6,2]]`
>
>输出：`3`
>
>解释：
>tasks[0] 选择时间点 2 或 3；
>tasks[1] 选择时间点 5；
>tasks[2] 选择时间点 5、6；
>因此计算机仅需在时间点 2、5、6 或 3、5、6 三个时刻保持开机即可完成任务。

**提示：**
- `2 <= tasks.length <= 10^5`
- `tasks[i].length == 3`
- `0 <= tasks[i][0] <= tasks[i][1] <= 10^9`
- `1 <= tasks[i][2] <= tasks[i][1]-tasks[i][0] + 1`


## 分析

### #1

为了方便，可以先将所有 end 加 1 变为左开右闭区间 [start, end)。

将 tasks 按结束时间 end 排序。直觉上，先结束的任务应该用尽可能晚的时间点，能够最大化地节省后续任务的时间。
简单证明一下：

	假设最优方案的时间点集合为 T，首个任务 (s0, e0, p0) ，在最优方案中的时间点集合为 T0。
	
	将 T0 变为最晚的区间 [e0-p0+1, e0)，任一后续任务 i 依然能完成：
	若 si <= s0 或者 si >= e0		[si, ei] 内的时间点个数不变
	若 s0 < si < e0					[si, ei] 内的时间点个数不变或变多
	
	因此首个任务用尽可能晚的时间点，不会比最优方案差。
	
	后续任务依此类推。

具体实现：

	用 stack 来保存已经确定的时间区间 [x0, y0)、[x1, y1)、[x2, y2)、...。
	
	遍历任务 i，先计算已经完成的时间点 already，
	再从 [si, ei) 中的空隙完成剩下的时间点 extra=max(0, pi-already)。

	因为要尽可能晚，所以从后往前看。先看最后一个区间结尾 stack[-1][1] 和当前边界 cur=ei 之间的空隙够不够。
	
	若空隙足够			新加一个区间	[cur-extra, ei)	
	
	若空隙不够			出栈最后一个区间，更新  extra -= cur - stack[-1][1]，cur = stack[-1][0]
						再重复以上过程
						
	最终计算 stack 中的时间点个数即可。

```python
def processTasks(self, tasks: List[List[int]]) -> int:
	tasks.sort(key=lambda x: x[1])
	stack = []
	for start, end, period in tasks:
		end += 1
		already = sum(y-max(x, start) for x, y in stack if y > start)
		extra = max(0, period-already)
		cur = end
		while stack and cur-stack[-1][1] <= extra:
			x, y = stack.pop()
			extra -= cur-y
			cur = x
		stack.append([cur-extra, end])
	return sum(y-x for x, y in stack)
```

超时了

### #2

超时的原因是每次计算 already 都遍历 stack，最坏时间复杂度 $O(N^2)$。

要优化子数组计算，容易想到前缀和。考虑每次入栈时间区间 [xj, yj) 时，额外保存所有已确定的时间点总数 Sj。
那么计算任务的 already 时:

	先二分查找找到第一个大于 start 的 yj
	
	stack[-1][2] - Sj 就是除了区间 [xj, yj) 以外任务已完成的时间点总数
	
	区间 [xj, yj) 内任务已完成的时间点个数是  yj - max(xj, start)
	
	already = stack[-1][2] - Sj + yj - max(xj, start)
	
最终也无需再遍历 stack 计算，stack[-1][2] 即为所求。

另外，二分查找可以借助 python 的魔法方法节省代码。

## 解答

```python
def processTasks(self, tasks: List[List[int]]) -> int:
	tasks.sort(key=lambda x: x[1])
	self.__class__.__getitem__ = lambda self, i: stack[i][1]>start
	stack = []
	for start, end, period in tasks:
		end += 1
		i = bisect_left(self, True, 0, len(stack))
		already = 0 if i==len(stack) else stack[-1][2]-stack[i][2]+stack[i][1]-max(start, stack[i][0])
		extra = max(0, period-already)
		cur = end
		while stack and cur-stack[-1][1] <= extra:
			x, y, _ = stack.pop()
			extra -= cur-y
			cur = x
		stack.append([cur-extra, end, end-cur+extra + (stack[-1][2] if stack else 0)])
	return stack[-1][2]
```

1712 ms


