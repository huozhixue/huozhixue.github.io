# 1095：山脉数组中查找目标值（1827 分）


> <u>**[力扣第 142 场周赛第 3 题](https://leetcode.cn/problems/find-in-mountain-array/)**</u>

## 题目

<p>（这是一个 <strong>交互式问题 </strong>）</p>

<p>你可以将一个数组 <code>arr</code> 称为 <strong>山脉数组 </strong>当且仅当：</p>

<ul>
<li><code>arr.length &gt;= 3</code></li>
<li>存在一些 <code>0 &lt; i &lt; arr.length - 1</code> 的 <code>i</code> 使得：
<ul>
<li><code>arr[0] &lt; arr[1] &lt; ... &lt; arr[i - 1] &lt; arr[i]</code></li>
<li><code>arr[i] &gt; arr[i + 1] &gt; ... &gt; arr[arr.length - 1]</code></li>
</ul>
</li>
</ul>

<p>给定一个山脉数组 <code>mountainArr</code> ，返回 <strong>最小</strong> 的 <code>index</code> 使得 <code>mountainArr.get(index) == target</code>。如果不存在这样的 <code>index</code>，返回 <code>-1</code> 。</p>

<p><strong>你无法直接访问山脉数组</strong>。你只能使用 <code>MountainArray</code> 接口来访问数组：</p>

<ul>
<li><code>MountainArray.get(k)</code> 返回数组中下标为 <code>k</code> 的元素（从 0 开始）。</li>
<li><code>MountainArray.length()</code> 返回数组的长度。</li>
</ul>

<p>调用 <code>MountainArray.get</code> 超过 <code>100</code> 次的提交会被判定为错误答案。此外，任何试图绕过在线评测的解决方案都将导致取消资格。</p>

<ol>
</ol>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>array = [1,2,3,4,5,3,1], target = 3
<strong>输出：</strong>2
<strong>解释：</strong>3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>array = [0,1,2,4,2,1], target = 3
<strong>输出：</strong>-1
<strong>解释：</strong>3 在数组中没有出现，返回 -1。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= mountain_arr.length() &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= target &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= mountain_arr.get(index) &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0852：山脉数组的峰顶索引（1181 分）](/leetcode/0852)
- [1671：得到山形数组的最少删除次数（1912 分）](/leetcode/1671)
- [2100：适合野炊的日子（1702 分）](/leetcode/2100)


## 分析

可以先二分查找到山顶坐标 mid（第一个满足 A[i]>A[i+1] 的 i)，然后 [0, mid], [mid, n-1] 区间都是单调的，
可以分别二分查找 target。

## 解答

```python
def findInMountainArray(self, target: int, mountain_arr: 'MountainArray') -> int:
    n = mountain_arr.length()
    self.__class__.__getitem__ = lambda self, i: mountain_arr.get(i)>mountain_arr.get(i+1)
    mid = bisect_left(self, True, 1, n-2)
    self.__class__.__getitem__ = lambda self, i: mountain_arr.get(i)>=target
    i = bisect_left(self, True, 0, mid)
    if mountain_arr.get(i) == target:
        return i
    self.__class__.__getitem__ = lambda self, i: mountain_arr.get(i)<=target
    j = bisect_left(self, True, mid, n-1)
    if mountain_arr.get(j) == target:
        return j
    return -1
```
32 ms
