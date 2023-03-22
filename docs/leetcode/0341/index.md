# 0341：扁平化嵌套列表迭代器（★）


> <u>**[力扣第 341 题](https://leetcode.cn/problems/flatten-nested-list-iterator/)**</u>

## 题目

<p>给你一个嵌套的整数列表 <code>nestedList</code> 。每个元素要么是一个整数，要么是一个列表；该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。</p>

<p>实现扁平迭代器类 <code>NestedIterator</code> ：</p>

<ul>
<li><code>NestedIterator(List&lt;NestedInteger&gt; nestedList)</code> 用嵌套列表 <code>nestedList</code> 初始化迭代器。</li>
<li><code>int next()</code> 返回嵌套列表的下一个整数。</li>
<li><code>boolean hasNext()</code> 如果仍然存在待迭代的整数，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
</ul>

<p>你的代码将会用下述伪代码检测：</p>

<pre>
initialize iterator with nestedList
res = []
while iterator.hasNext()
append iterator.next() to the end of res
return res</pre>

<p>如果 <code>res</code> 与预期的扁平化列表匹配，那么你的代码将会被判为正确。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nestedList = [[1,1],2,[1,1]]
<strong>输出：</strong>[1,1,2,1,1]
<strong>解释：</strong>通过重复调用 <em>next </em>直到 <em>hasNex</em>t 返回 false，<em>next </em>返回的元素的顺序应该是: <code>[1,1,2,1,1]</code>。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nestedList = [1,[4,[6]]]
<strong>输出：</strong>[1,4,6]
<strong>解释：</strong>通过重复调用 <em>next </em>直到 <em>hasNex</em>t 返回 false，<em>next </em>返回的元素的顺序应该是: <code>[1,4,6]</code>。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nestedList.length &lt;= 500</code></li>
<li>嵌套列表中的整数值在范围 <code>[-10<sup>6</sup>, 10<sup>6</sup>]</code> 内</li>
</ul>


## 分析

### #1

可以直接递归将 nextedList 转为一维列表，然后迭代返回即可。

为了方便，可以用转为队列，不断弹出首位元素即可。

```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        def dfs(nest):
            if nest.isInteger():
                return [nest.getInteger()]
            return [x for sub in nest.getList() for x in dfs(sub)]
        self.A = deque(x for sub in nestedList for x in dfs(sub))
    
    def next(self) -> int:
        return self.A.popleft()

    def hasNext(self) -> bool:
        return bool(self.A)
```
64 ms

### #2

还可以边迭代边转换：
- 如果队首是列表，就拆为元素加到队首
- 循环操作直到队首是整数，再弹出即可
- 为了方便，在 hasNext() 中完成转换，从而判断是否为空

## 解答


```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.A = deque(nestedList)

    def next(self) -> int:
        return self.A.popleft().getInteger()

    def hasNext(self) -> bool:
        while self.A and not self.A[0].isInteger():
            self.A.extendleft(self.A.popleft().getList()[::-1])
        return bool(self.A)
```
72 ms


