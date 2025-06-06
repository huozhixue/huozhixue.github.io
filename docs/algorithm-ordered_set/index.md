# 力扣总结 数据结构进阶（二）：有序集合


很多问题需要维护一个有序的集合，根据操作不同，可以选择更优的数据结构。

|             | 访问    |  搜索     | 插入     | 删除    | 访问最值   | 插入最值 | 删除最值 |
| ------      | ----   | ----    | ----     | ----    | ----     |  ----      |----    |
| 数组 list    | O(1)   | O(logN) | O(N)     | O(N)    |  O(1)    | O(1)       | O(1)   | 
| 队列 deque   | O(N)   | O(N)    | O(N)     | O(N)    |  O(1)    | O(1)       | O(1)   | 
| 堆  heapq    | O(N)   | O(N)    | O(logN)  | O(N)    |  O(1)    | O(logN)    | O(logN) |
| AVL/红黑树   | O(logN) | O(logN) | O(logN)  | O(logN) |  O(logN) | O(logN)   | O(logN) |

- 若只需搜索操作，用 [数组](/algorithm-array) 即可。
- 若只需最值相关的操作，用 [栈/队列](/algorithm-stack) 即可。
一些问题可以用进阶的技巧 [单调栈/队列](/algorithm-monotonic_stack) ，使得只需要操作最值。
- 如果插入时可能无序，但只删除某一边的最值，考虑用 [堆](/algorithm-heap) 。
- 如果插入和删除都无序，考虑用 AVL/红黑树。

> 从表格可知，AVL/红黑树 是一个很平衡的方案，除非要求某项时间 O(1)，否则都是可行的。

> python 中可以直接调用 sortedcontainers.SortedList 来实现 AVL/红黑树。
> SortedList 可以指定排序的 key
> 有时还可以用 SortedDict，保存有序的键值

## 1 基础

- {{< lc "0239" >}} 滑动窗口最大值
- {{< lc "0295" >}} 数据流的中位数

## 2 进阶

- {{< lc "0218" >}} 天际线问题
- {{< lc "0220" >}} 存在重复元素 III


## 3 挑战


