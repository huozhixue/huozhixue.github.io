# 1226：哲学家进餐（★）


> <u>**[力扣第 1226 题](https://leetcode.cn/problems/the-dining-philosophers/)**</u>

## 题目

<p>5 个沉默寡言的哲学家围坐在圆桌前，每人面前一盘意面。叉子放在哲学家之间的桌面上。（5 个哲学家，5 根叉子）</p>

<p>所有的哲学家都只会在思考和进餐两种行为间交替。哲学家只有同时拿到左边和右边的叉子才能吃到面，而同一根叉子在同一时间只能被一个哲学家使用。每个哲学家吃完面后都需要把叉子放回桌面以供其他哲学家吃面。只要条件允许，哲学家可以拿起左边或者右边的叉子，但在没有同时拿到左右叉子时不能进食。</p>

<p>假设面的数量没有限制，哲学家也能随便吃，不需要考虑吃不吃得下。</p>

<p>设计一个进餐规则（并行算法）使得每个哲学家都不会挨饿；也就是说，在没有人知道别人什么时候想吃东西或思考的情况下，每个哲学家都可以在吃饭和思考之间一直交替下去。</p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/23/an_illustration_of_the_dining_philosophers_problem.png" style="height: 415px; width: 400px;"></p>

<p><em>问题描述和图片来自维基百科 <a href="https://en.wikipedia.org/wiki/Dining_philosophers_problem" target="_blank">wikipedia.org</a></em></p>



<p>哲学家从 <strong>0</strong> 到 <strong>4</strong> 按 <strong>顺时针</strong> 编号。请实现函数 <code>void wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork)</code>：</p>

<ul>
<li><code>philosopher</code> 哲学家的编号。</li>
<li><code>pickLeftFork</code> 和 <code>pickRightFork</code> 表示拿起左边或右边的叉子。</li>
<li><code>eat</code> 表示吃面。</li>
<li><code>putLeftFork</code> 和 <code>putRightFork</code> 表示放下左边或右边的叉子。</li>
<li>由于哲学家不是在吃面就是在想着啥时候吃面，所以思考这个方法没有对应的回调。</li>
</ul>

<p>给你 5 个线程，每个都代表一个哲学家，请你使用类的同一个对象来模拟这个过程。在最后一次调用结束之前，可能会为同一个哲学家多次调用该函数。</p>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>[[4,2,1],[4,1,1],[0,1,1],[2,2,1],[2,1,1],[2,0,3],[2,1,2],[2,2,2],[4,0,3],[4,1,2],[0,2,1],[4,2,2],[3,2,1],[3,1,1],[0,0,3],[0,1,2],[0,2,2],[1,2,1],[1,1,1],[3,0,3],[3,1,2],[3,2,2],[1,0,3],[1,1,2],[1,2,2]]
<strong>解释:</strong>
n 表示每个哲学家需要进餐的次数。
输出数组描述了叉子的控制和进餐的调用，它的格式如下：
output[i] = [a, b, c] (3个整数)
- a 哲学家编号。
- b 指定叉子：{1 : 左边, 2 : 右边}.
- c 指定行为：{1 : 拿起, 2 : 放下, 3 : 吃面}。
如 [4,2,1] 表示 4 号哲学家拿起了右边的叉子。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 60</code></li>
</ul>




## 分析

典型的并发问题，可以用互斥锁+信号量解决。

为了防止死锁，最多允许 4 个哲学家同时拿叉子。考虑到效率，可以设置最多 3 个哲学家同时拿叉子。

## 解答

```python
from threading import Lock, Semaphore
class DiningPhilosophers:
    def __init__(self,):
        self.limit = Semaphore(3)
        self.forks = [Lock() for _ in range(5)] 

    # call the functions directly to execute, for example, eat()
    def wantsToEat(self,
                   philosopher: int,
                   pickLeftFork: 'Callable[[], None]',
                   pickRightFork: 'Callable[[], None]',
                   eat: 'Callable[[], None]',
                   putLeftFork: 'Callable[[], None]',
                   putRightFork: 'Callable[[], None]') -> None:
        lf, rf = philosopher, (philosopher+1)%5
        self.limit.acquire()
        self.forks[lf].acquire()
        self.forks[rf].acquire()
        pickLeftFork()
        pickRightFork()
        eat()
        putLeftFork()
        putRightFork()
        self.forks[lf].release()
        self.forks[rf].release()
        self.limit.release()
```
76 ms

