# 1114：按序打印


> <u>**[力扣第 1114 题](https://leetcode.cn/problems/print-in-order/)**</u>

## 题目

<p>给你一个类：</p>

<pre>
public class Foo {
public void first() { print("first"); }
public void second() { print("second"); }
public void third() { print("third"); }
}</pre>

<p>三个不同的线程 A、B、C 将会共用一个 <code>Foo</code> 实例。</p>

<ul>
<li>线程 A 将会调用 <code>first()</code> 方法</li>
<li>线程 B 将会调用 <code>second()</code> 方法</li>
<li>线程 C 将会调用 <code>third()</code> 方法</li>
</ul>

<p>请设计修改程序，以确保 <code>second()</code> 方法在 <code>first()</code> 方法之后被执行，<code>third()</code> 方法在 <code>second()</code> 方法之后被执行。</p>

<p><strong>提示：</strong></p>

<ul>
<li>尽管输入中的数字似乎暗示了顺序，但是我们并不保证线程在操作系统中的调度顺序。</li>
<li>你看到的输入格式主要是为了确保测试的全面性。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>"firstsecondthird"
<strong>解释：</strong>
有三个线程会被异步启动。输入 [1,2,3] 表示线程 A 将会调用 first() 方法，线程 B 将会调用 second() 方法，线程 C 将会调用 third() 方法。正确的输出是 "firstsecondthird"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,3,2]
<strong>输出：</strong>"firstsecondthird"
<strong>解释：</strong>
输入 [1,3,2] 表示线程 A 将会调用 first() 方法，线程 B 将会调用 third() 方法，线程 C 将会调用 second() 方法。正确的输出是 "firstsecondthird"。</pre>



<ul>
</ul>
<strong>提示：</strong>

<ul>
<li><code>nums</code> 是 <code>[1, 2, 3]</code> 的一组排列</li>
</ul>


**相似问题：**
- [1115：交替打印 FooBar](/leetcode/1115)


## 分析

典型的并发问题，最常用的是互斥锁。

## 解答

```python
from threading import Lock
class Foo:
    def __init__(self):
        self.lock1 = Lock()
        self.lock2 = Lock()
        self.lock1.acquire()
        self.lock2.acquire()

    def first(self, printFirst: 'Callable[[], None]') -> None:
        printFirst()
        self.lock1.release()

    def second(self, printSecond: 'Callable[[], None]') -> None:
        with self.lock1:
            printSecond()
            self.lock2.release()

    def third(self, printThird: 'Callable[[], None]') -> None:
        with self.lock2:
            printThird()
```
48 ms

