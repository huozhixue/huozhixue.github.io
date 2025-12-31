# 数据结构（八）：区间信息

- 区间静态查询：前缀和、st 表、莫队、猫树
- 区间修改+最终查询：差分
- 单点修改、区间查询：树状数组
- 区间修改、区间查询：线段树、块状数组


单点修改
- {{< lc "0307" >}} [区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)
- {{< lc "2407" >}} [最长递增子序列 II](https://leetcode.cn/problems/longest-increasing-subsequence-ii/)
- {{< lc "2736" >}} [最大和查询](https://leetcode.cn/problems/maximum-sum-queries/)
- {{< lc "0673" >}} [最长递增子序列的个数](https://leetcode.cn/problems/number-of-longest-increasing-subsequence/)
二维
- {{< lc "0308" >}} 二维区域和检索 - 可变

区间修改（赋相同值可用珂朵莉树）
- {{< lc "0699" >}} [掉落的方块](https://leetcode.cn/problems/falling-squares/)
- {{< lc "0715" >}} [Range 模块](https://leetcode.cn/problems/range-module/)
- {{< lc "0732" >}} [我的日程安排表 III](https://leetcode.cn/problems/my-calendar-iii/)
- {{< lc "2276" >}} [统计区间中的整数数目](https://leetcode.cn/problems/count-integers-in-intervals/)
- {{< lc "2569" >}} [更新数组后处理求和查询](https://leetcode.cn/problems/handling-sum-queries-after-update/)
- {{< lc "lcp05" >}} [发 LeetCoin](https://leetcode.cn/problems/coin-bonus/)

区间多个信息
- {{< lc "1157" >}} [子数组中占绝大多数的元素](https://leetcode.cn/problems/online-majority-element-in-subarray/)
- {{< lc "1622" >}} [奇妙序列](https://leetcode.cn/problems/fancy-sequence/)
- {{< lc "2213" >}} [由单个字符重复的最长子字符串](https://leetcode.cn/problems/longest-substring-of-one-repeating-character/)

树上二分
- {{< lc "2286" >}} [以组为单位订音乐会的门票](https://leetcode.cn/problems/booking-concert-tickets-in-groups/)

#### 无旋 treap 

```python []
# 无旋 treap
class Node:
    __slots__ = ('l','r','prio','sz','val','xo','rev')
    def __init__(self, v):
        self.l = self.r = None
        self.prio = random.randrange(1 << 30)
        self.sz = 1
        self.val = v
        self.xo = v
        self.rev = 0

def pull(t):                    # 结构改变后更新信息
    t.sz = 1
    t.xo = t.val
    if t.l:
        t.sz += t.l.sz
        t.xo ^= t.l.xo
    if t.r:
        t.sz += t.r.sz
        t.xo ^= t.r.xo

def push(t):                    # 下传懒标记
    if t and t.rev:
        t.l, t.r = t.r, t.l
        if t.l: t.l.rev ^= 1
        if t.r: t.r.rev ^= 1
        t.rev = 0

def split(t,k):                 # 按前k个节点/剩余节点拆分
    if not t:
        return None,None
    push(t)
    lsz = t.l.sz if t.l else 0
    if lsz >= k:
        L,R = split(t.l,k)
        t.l = R
        pull(t)
        return L,t
    else:
        L,R = split(t.r,k-lsz-1)
        t.r = L
        pull(t)
        return t,R

def merge(u,v):                 # 合并，u中最大值小于v中最小值
    if not u or not v:
        return u or v
    if u.prio<v.prio:
        push(u)
        u.r = merge(u.r, v)
        pull(u)
        return u
    else:
        push(v)
        v.l = merge(u,v.l)
        pull(v)
        return v
```
