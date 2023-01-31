# 1115：交替打印 FooBar（★★）




## 题目

给你一个类：

    class FooBar {
      public void foo() {
        for (int i = 0; i < n; i++) {
          print("foo");
        }
      }
    
      public void bar() {
        for (int i = 0; i < n; i++) {
          print("bar");
        }
      }
    }

两个不同的线程将会共用一个 FooBar 实例：
- 线程 A 将会调用 foo() 方法，而
- 线程 B 将会调用 bar() 方法

请设计修改程序，以确保 "foobar" 被输出 n 次。

示例 1：
    
    输入：n = 1
    输出："foobar"
    解释：这里有两个线程被异步启动。其中一个调用 foo() 方法, 
    另一个调用 bar() 方法，"foobar" 将被输出一次。

示例 2：

    输入：n = 2
    输出："foobarfoobar"
    解释："foobar" 将被输出两次。
     

提示：
- 1 <= n <= 1000



## 分析

典型的并发问题，最常用的是互斥锁。

## 解答

```python
from threading import Lock
class FooBar:
    def __init__(self, n):
        self.n = n
        self.lock1 = Lock()
        self.lock2 = Lock()
        self.lock2.acquire()


    def foo(self, printFoo: 'Callable[[], None]') -> None:
        for i in range(self.n):
            self.lock1.acquire()
            printFoo()
            self.lock2.release()

    def bar(self, printBar: 'Callable[[], None]') -> None:
        for i in range(self.n):
            self.lock2.acquire()
            printBar()
            self.lock1.release()
```
56 ms

