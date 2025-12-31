# 算法（九）：技巧

## 差分

- {{< lc "0391" >}} 完美矩形
- {{< lc "0759" >}} 员工空闲时间
- {{< lc "0798" >}} 得分最高的最小轮调
## 逆向

- {{< lc "0458" >}} 可怜的小猪
- {{< lc "0780" >}} 到达终点

## 折半搜索

- {{< lc "0805" >}} 数组的均值分割
## 剪枝

- {{< lc "0488" >}} 祖玛游戏

收敛：n 足够大时，答案与收敛值的差可以忽略不计，因此只需要考虑 n 较小的情形
- {{< lc "0808" >}} 分汤]

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




## 其它优化

一些比赛中无意义的trick

空间
- {{< lc "0041" >}} 缺失的第一个正数
时间
- {{< lc "0164" >}} 最大间距
- {{< lc "0272" >}} 最接近的二叉搜索树值 II
