# 力扣总结 数据结构（七）：堆


堆 是一种特别的完全二叉树，每一个节点的值都大于等于或小于等于其孩子节点的值。

堆可以在 O(logN) 时间内插入元素、删除根节点，在 O(1) 时间获得最大值或最小值。一般用于有序弹出元素的场景。

> python 中一般直接用内置库 heapq 表示（list 实现的），默认是小顶堆，即堆顶元素是最小值。

> 额外地，图里面有个重要的 dijkstra 算法常借助堆实现，这里先不涉及。

## 1 基础

### 1.1 设计

- {{< lc "0703" >}} 数据流中的第 K 大元素
- {{< lc "1845" >}} 座位预约管理系统

### 1.2 应用

- {{< lc "0023" >}} 合并K个升序链表
- {{< lc "0692" >}} 前K个高频单词
- {{< lc "1046" >}} 最后一块石头的重量

## 2 进阶

### 2.1 设计

- {{< lc "0295" >}} 数据流的中位数
- {{< lc "0355" >}} 设计推特

### 2.2 应用

- {{< lc "0373" >}} 查找和最小的 K 对数字
- {{< lc "0786" >}} 第 K 个最小的素数分数
- {{< lc "1801" >}} 积压订单中的订单总数
- {{< lc "1834" >}} 单线程 CPU

## 3 挑战

- {{< lc "0407" >}} 接雨水 II
- {{< lc "0857" >}} 雇佣 K 名工人的最低成本
- {{< lc "1439" >}} 有序矩阵中的第 k 个最小数组和

