# 力扣总结 常见算法（六）：dfs 和 bfs


dfs（深度优先搜索算法）和 bfs（广度优先搜索算法）都是图形搜索方法，
不同的在于 dfs 先尽可能深的搜索一个分支，再尝试别的路径，而 bfs 按离起点的距离一层层搜索。

dfs 常借助递归实现，而 bfs 常借助队列实现。

dfs 的思想就是回溯，是一种暴力通用解法。有时可以提前判断分支不满足要求，提前返回，被称为剪枝。

[树](/algorithm-tree/) 和 [图](/algorithm-graph/) 常常要用到 dfs 或 bfs 来搜索，这里不涉及。

## 1 基础

- {{< lc "0022" >}} 括号生成
- {{< lc "0045" >}} 跳跃游戏 II
- {{< lc "0078" >}} 子集
- {{< lc "0386" >}} 字典序排数

## 2 进阶

- {{< lc "0051" >}} N 皇后
- {{< lc "0079" >}} 单词搜索
- {{< lc "0093" >}} 复原IP地址
- {{< lc "0401" >}} 二进制手表
- {{< lc "0994" >}} 腐烂的橘子

## 3 挑战

- {{< lc "0037" >}} 解数独
- {{< lc "0127" >}} 单词接龙
- {{< lc "0529" >}} 扫雷游戏


