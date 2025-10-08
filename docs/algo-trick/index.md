# 算法（八）：技巧

## 根号

- 根号分治
- 根号限制
	- 总和为 n 的若干个数，最多只有 $\sqrt n$   种
	- 将边的方向定为从度数小的点连向度数大的点（度数相等可以比较标号），边的出度最多 $O(\sqrt m)$  
- 分块思想：
	- 块状数组、 莫队

- {{< lc "1761" >}} [一个图中连通三元组的最小度数](https://leetcode.cn/problems/minimum-degree-of-a-connected-trio-in-a-graph/)


## 增量

遍历统计时考虑只计算增量，节省时间

- {{< lc "1830" >}} [使字符串有序的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-string-sorted/) （2620分）
- {{< lc "2484" >}} [统计回文子序列数目](https://leetcode.cn/problems/count-palindromic-subsequences/)
- {{< lc "3395" >}} [唯一中间众数子序列 I](https://leetcode.cn/problems/subsequences-with-a-unique-middle-mode-i/)

## log trick


