# 1115：交替打印 FooBar（★）


> <u>**[力扣第 1115 题](https://leetcode.cn/problems/print-foobar-alternately/)**</u>

## 题目

<p>给你一个类：</p>

<pre>
class FooBar {
public void foo() {
for (int i = 0; i &lt; n; i++) {
print("foo");
}
}

public void bar() {
for (int i = 0; i &lt; n; i++) {
print("bar");
}
}
}
</pre>

<p>两个不同的线程将会共用一个 <code>FooBar</code> 实例：</p>

<ul>
<li>线程 A 将会调用 <code>foo()</code> 方法，而</li>
<li>线程 B 将会调用 <code>bar()</code> 方法</li>
</ul>

<p>请设计修改程序，以确保 <code>"foobar"</code> 被输出 <code>n</code> 次。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>"foobar"
<strong>解释：</strong>这里有两个线程被异步启动。其中一个调用 foo() 方法, 另一个调用 bar() 方法，"foobar" 将被输出一次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>"foobarfoobar"
<strong>解释：</strong>"foobar" 将被输出两次。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>


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

