# 1195. 交替打印字符串（★★）



## 题目

编写一个可以从 1 到 n 输出代表这个数字的字符串的程序，但是：
- 如果这个数字可以被 3 整除，输出 "fizz"。
- 如果这个数字可以被 5 整除，输出 "buzz"。
- 如果这个数字可以同时被 3 和 5 整除，输出 "fizzbuzz"。

例如，当 n = 15，输出： 1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz。

假设有这么一个类：

    class FizzBuzz {
      public FizzBuzz(int n) { ... }               // constructor
      public void fizz(printFizz) { ... }          // only output "fizz"
      public void buzz(printBuzz) { ... }          // only output "buzz"
      public void fizzbuzz(printFizzBuzz) { ... }  // only output "fizzbuzz"
      public void number(printNumber) { ... }      // only output the numbers
    }

请你实现一个有四个线程的多线程版  FizzBuzz， 同一个 FizzBuzz 实例会被如下四个线程使用：
- 线程A将调用 fizz() 来判断是否能被 3 整除，如果可以，则输出 fizz。
- 线程B将调用 buzz() 来判断是否能被 5 整除，如果可以，则输出 buzz。
- 线程C将调用 fizzbuzz() 来判断是否同时能被 3 和 5 整除，如果可以，则输出 fizzbuzz。
- 线程D将调用 number() 来实现输出既不能被 3 整除也不能被 5 整除的数字。
 

提示：
- 本题已经提供了打印字符串的相关方法，如 printFizz() 等，具体方法名请参考答题模板中的注释部分。


 
## 分析

典型的并发问题，可以用互斥锁解决。

## 解答

```python
from threading import Lock
class FizzBuzz:
    def __init__(self, n: int):
        self.n = n
        self.lock_f = Lock()
        self.lock_b = Lock()
        self.lock_fb = Lock()
        self.lock_n = Lock()
        self.lock_f.acquire()
        self.lock_b.acquire()
        self.lock_fb.acquire()

    # printFizz() outputs "fizz"
    def fizz(self, printFizz: 'Callable[[], None]') -> None:
        for i in range(3, self.n+1, 3):
            if i%5:
                self.lock_f.acquire()
                printFizz()
                self.lock_n.release()
    	
    # printBuzz() outputs "buzz"
    def buzz(self, printBuzz: 'Callable[[], None]') -> None:
        for i in range(5, self.n+1, 5):
            if i%3:
                self.lock_b.acquire()
                printBuzz()
                self.lock_n.release()
    	
    # printFizzBuzz() outputs "fizzbuzz"
    def fizzbuzz(self, printFizzBuzz: 'Callable[[], None]') -> None:
        for i in range(15, self.n+1, 15):
            self.lock_fb.acquire()
            printFizzBuzz()
            self.lock_n.release()
        
    # printNumber(x) outputs "x", where x is an integer.
    def number(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(1, self.n+1):
            self.lock_n.acquire()
            if i%3 and i%5:
                printNumber(i)
                self.lock_n.release()
            elif i%15==0:
                self.lock_fb.release()
            elif i%3==0:
                self.lock_f.release()
            else:
                self.lock_b.release()
```
32 ms

