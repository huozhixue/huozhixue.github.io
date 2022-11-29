# 1172：餐盘栈（★★★）


> **第 151 场周赛第 4 题**

## 题目

我们把无限数量 ∞ 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 capacity 都相同。

实现一个叫「餐盘」的类 DinnerPlates：
- DinnerPlates(int capacity) - 给出栈的最大容量 capacity。
- void push(int val) - 将给出的正整数 val 推入 从左往右第一个 没有满的栈。
- int pop() - 返回 从右往左第一个 非空栈顶部的值，并将其从栈中删除；如果所有的栈都是空的，请返回 -1。
- int popAtStack(int index) - 返回编号 index 的栈顶部的值，并将其从栈中删除；
如果编号 index 的栈是空的，请返回 -1。

提示：
- 1 <= capacity <= 20000
- 1 <= val <= 20000
- 0 <= index <= 100000
- 最多会对 push，pop，和 popAtStack 进行 200000 次调用。

示例：

    输入： 
    ["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
    [[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
    输出：
    [null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]
    
    解释：
    DinnerPlates D = DinnerPlates(2);  // 初始化，栈最大容量 capacity = 2
    D.push(1);
    D.push(2);
    D.push(3);
    D.push(4);
    D.push(5);         // 栈的现状为：    2  4
                                        1  3  5
                                        ﹈ ﹈ ﹈
    D.popAtStack(0);   // 返回 2。栈的现状为：      4
                                              1  3  5
                                              ﹈ ﹈ ﹈
    D.push(20);        // 栈的现状为：  20  4
                                       1  3  5
                                       ﹈ ﹈ ﹈
    D.push(21);        // 栈的现状为：  20  4 21
                                       1  3  5
                                       ﹈ ﹈ ﹈
    D.popAtStack(0);   // 返回 20。栈的现状为：       4 21
                                                1  3  5
                                                ﹈ ﹈ ﹈
    D.popAtStack(2);   // 返回 21。栈的现状为：       4
                                                1  3  5
                                                ﹈ ﹈ ﹈ 
    D.pop()            // 返回 5。栈的现状为：        4
                                                1  3 
                                                ﹈ ﹈  
    D.pop()            // 返回 4。栈的现状为：    1  3 
                                               ﹈ ﹈   
    D.pop()            // 返回 3。栈的现状为：    1 
                                               ﹈   
    D.pop()            // 返回 1。现在没有栈。
    D.pop()            // 返回 -1。仍然没有栈。
 


## 分析

考虑用数组 A 动态维护所有栈的信息（保证末尾是非空栈），那么 pop 时：

    若 len(A[-1]) > 1，直接 pop A[-1] 即可
    若 len(A[-1]) == 1，pop A[-1] 并去掉末尾所有空栈
    每个非末尾的空栈至少对应了一个 push 和 popAtStack 操作
    因此平摊下来 pop 时间复杂度 O(1)

然后为了方便 push，考虑用堆 pq 维护没有满的栈下标集合，那么：

    若 pq 空或 pq[0]>=len(A)
        说明 A 中的栈的都满了，末尾添加一个栈并 push
    否则
        得到没有满的最小下标 i=pq[0]，往 A[i] push

> 注意在所有操作中都要维护 pq，不过去掉空栈时可以采用延迟删除的技巧，从而节省时间。

## 解答

```python
class DinnerPlates:

    def __init__(self, capacity: int):
        self.size = capacity
        self.pq = []
        self.A = []

    def push(self, val: int) -> None:
        if not self.pq or self.pq[0] >= len(self.A):
            self.A.append([val])
            self.pq = [len(self.A)-1] if self.size > 1 else []
        else:
            i = self.pq[0]
            self.A[i].append(val)
            if len(self.A[i]) == self.size:
                heappop(self.pq)

    def pop(self) -> int:
        return -1 if not self.A else self.popAtStack(len(self.A)-1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.A) or not self.A[index]:
            return -1
        val = self.A[index].pop()
        if len(self.A[index]) == self.size - 1:
            heappush(self.pq, index)
        while self.A and not self.A[-1]:
            self.A.pop()
        return val
```
时间复杂度 O(N*logN)，648 ms

