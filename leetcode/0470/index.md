# 0470：用 Rand7() 实现 Rand10()（★）


## 题目

已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。

不要使用系统的 Math.random() 方法。

提示:

- rand7 已定义。
- 传入参数: n 表示 rand10 的调用次数。
 
 <!--more--> 
 
示例 1:

    输入: 1
    输出: [7]

示例 2:

    输入: 2
    输出: [8,4]

示例 3:

    输入: 3
    输出: [8,1,10]


## 分析

典型的拒绝抽样。调用两次 rand7，可以等价于 rand49，然后 1 到 40 均匀分为 10 份即可等价于 rand10。
如果大于 40，就重新抽样。

## 解答

```python
def rand10(self):
    while True:
        res = (rand7() - 1) * 7 + rand7()
        if res <= 40:
            return res % 10 + 1
```

340 ms


