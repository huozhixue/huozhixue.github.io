# 0841：钥匙和房间（★）


> <u>**[力扣第 86 场周赛第 2 题](https://leetcode.cn/problems/keys-and-rooms/)**</u>

## 题目

<p>有 <code>n</code> 个房间，房间按从 <code>0</code> 到 <code>n - 1</code> 编号。最初，除 <code>0</code> 号房间外的其余所有房间都被锁住。你的目标是进入所有的房间。然而，你不能在没有获得钥匙的时候进入锁住的房间。</p>

<p>当你进入一个房间，你可能会在里面找到一套不同的钥匙，每把钥匙上都有对应的房间号，即表示钥匙可以打开的房间。你可以拿上所有钥匙去解锁其他房间。</p>

<p>给你一个数组 <code>rooms</code> 其中 <code>rooms[i]</code> 是你进入 <code>i</code> 号房间可以获得的钥匙集合。如果能进入 <strong>所有</strong> 房间返回 <code>true</code>，否则返回 <code>false</code>。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>rooms = [[1],[2],[3],[]]
<strong>输出：</strong>true
<strong>解释：</strong>
我们从 0 号房间开始，拿到钥匙 1。
之后我们去 1 号房间，拿到钥匙 2。
然后我们去 2 号房间，拿到钥匙 3。
最后我们去了 3 号房间。
由于我们能够进入每个房间，我们返回 true。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>rooms = [[1,3],[3,0,1],[2],[0]]
<strong>输出：</strong>false
<strong>解释：</strong>我们不能进入 2 号房间。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == rooms.length</code></li>
<li><code>2 &lt;= n &lt;= 1000</code></li>
<li><code>0 &lt;= rooms[i].length &lt;= 1000</code></li>
<li><code>1 &lt;= sum(rooms[i].length) &lt;= 3000</code></li>
<li><code>0 &lt;= rooms[i][j] &lt; n</code></li>
<li>所有 <code>rooms[i]</code> 的值 <strong>互不相同</strong></li>
</ul>


## 分析

房间看作顶点，钥匙看作有向边，问题转为：判断顶点 0 出发能否达到所有顶点。

顶点 0 开始遍历即可。

## 解答

```python
def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
    queue, vis = deque([0]), {0}
    while queue:
        u = queue.popleft()
        for v in rooms[u]:
            if v not in vis:
                vis.add(v)
                queue.append(v)
    return len(vis)==len(rooms)
```
16 ms

