# 力扣总结 数据结构进阶（六）：线段树


线段树（Segment Tree）是一种二叉树形数据结构。多用于区间查询。

相比于 [前缀和](/algorithm-prefix_sum) 和
[树状数组](/algorithm-binary_indexed_tree)，
线段树更复杂，也更通用。

> 线段树可以区间修改、区间查询。而且线段树不仅能维护区间的和，还可以维护区间的
>最小值、最大值、总和、最大公约数、最小公倍数等。

[:(far fa-hand-point-right fa-fw):详解](//zhuanlan.zhihu.com/p/106118909)


## 1 单点更新区间查询

- {{< lc "0307" >}} [区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)
- {{< lc "2407" >}} [最长递增子序列 II](https://leetcode.cn/problems/longest-increasing-subsequence-ii/)
- {{< lc "2736" >}} [最大和查询](https://leetcode.cn/problems/maximum-sum-queries/)

## 2 区间更新区间查询

- {{< lc "0699" >}} [掉落的方块](https://leetcode.cn/problems/falling-squares/)
- {{< lc "0715" >}} [Range 模块](https://leetcode.cn/problems/range-module/)
- {{< lc "0732" >}} [我的日程安排表 III](https://leetcode.cn/problems/my-calendar-iii/)
- {{< lc "2276" >}} [统计区间中的整数数目](https://leetcode.cn/problems/count-integers-in-intervals/)
- {{< lc "2569" >}} [更新数组后处理求和查询](https://leetcode.cn/problems/handling-sum-queries-after-update/)
- {{< lc "lcp05" >}} [发 LeetCoin](https://leetcode.cn/problems/coin-bonus/)
## 3  区间多个信息

- {{< lc "1157" >}} [子数组中占绝大多数的元素](https://leetcode.cn/problems/online-majority-element-in-subarray/)
- {{< lc "1622" >}} [奇妙序列](https://leetcode.cn/problems/fancy-sequence/)
- {{< lc "2213" >}} [由单个字符重复的最长子字符串](https://leetcode.cn/problems/longest-substring-of-one-repeating-character/)

## 4 树上二分

- {{< lc "2286" >}} [以组为单位订音乐会的门票](https://leetcode.cn/problems/booking-concert-tickets-in-groups/)


