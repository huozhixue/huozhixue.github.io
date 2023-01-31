# 1116：打印零与奇偶数（★★）




## 题目

现有函数 printNumber 可以用一个整数参数调用，并输出该整数到控制台。
- 例如，调用 printNumber(7) 将会输出 7 到控制台。

给你类 ZeroEvenOdd 的一个实例，该类中有三个函数：zero、even 和 odd 。ZeroEvenOdd 的相同实例将会传递给三个不同线程：
- 线程 A：调用 zero() ，只输出 0
- 线程 B：调用 even() ，只输出偶数
- 线程 C：调用 odd() ，只输出奇数

修改给出的类，以输出序列 "010203040506..." ，其中序列的长度必须为 2n 。

实现 ZeroEvenOdd 类：
- ZeroEvenOdd(int n) 用数字 n 初始化对象，表示需要输出的数。
- void zero(printNumber) 调用 printNumber 以输出一个 0 。
- void even(printNumber) 调用printNumber 以输出偶数。
- void odd(printNumber) 调用 printNumber 以输出奇数。

示例 1：
    
    输入：n = 2
    输出："0102"
    解释：三条线程异步执行，其中一个调用 zero()，另一个线程调用 even()，
    最后一个线程调用odd()。正确的输出为 "0102"。

示例 2：
    
    输入：n = 5
    输出："0102030405"
 

提示：
- 1 <= n <= 1000



## 分析

典型的并发问题，最常用的是互斥锁。

## 解答

```python
from threading import Lock
class ZeroEvenOdd:
    def __init__(self, n):
        self.n = n
        self.lock0 = Lock()
        self.lock1 = Lock()
        self.lock2 = Lock()
        self.lock1.acquire()
        self.lock2.acquire()
        
    def zero(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(self.n):
            self.lock0.acquire()
            printNumber(0)
            self.lock1.release() if i%2==0 else self.lock2.release()

    def even(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(2, self.n+1, 2):
            self.lock2.acquire()
            printNumber(i)
            self.lock0.release()
        
    def odd(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(1, self.n+1, 2):
            self.lock1.acquire()
            printNumber(i)
            self.lock0.release()
```
32 ms

