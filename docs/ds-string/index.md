# 数据结构（二）：字符串



## 最小表示法

- [最小表示法](https://oi.wiki/string/minimal-string)

```python []
def minimal(s):
    n = len(s)
    i,j,a = 0,1,0
    while i<n and j<n and a<n:
        x,y = s[(i+a)%n],s[(j+a)%n]
        if x==y:
            a += 1
        elif x>y:
            i,j,a = j,max(i+a,j)+1,0
        else:
            j,a = j+a+1,0
    return s[i:]+s[:i]
```

## 字符串匹配

- [前缀函数与 KMP 算法](https://oi.wiki/string/kmp/)
- [Manacher](https://oi.wiki/string/manacher/)
- [Z 函数（扩展 KMP）](https://oi.wiki/string/z-func/)
- [字符串哈希](https://oi.wiki/string/hash/)
	- $$hash(W)=\sum_{i=0}^{|W|-1}base^{|W|-(i+1)}*W[i]$$
	-  base 取一个大于 **元素种数** 的 **质数**，mod 取一个大于 **窗口种数^2** 的 **质数**


 正则
- {{< lc "0008" >}} 字符串转换整数 (atoi)
- {{< lc "0044" >}} 通配符匹配
- {{< lc "0065" >}} 有效数字

kmp
- {{< lc "0005" >}} 最长回文子串
- {{< lc "0028" >}} 实现 strStr()
- {{< lc "1392" >}} 最长快乐前缀

macher
- {{< lc "0214" >}} 最短回文串

##  后缀数组

 [后缀数组](https://oi.wiki/string/sa/)
- {{< lc "0187" >}} 重复的DNA序列
- {{< lc "0718" >}} 最长重复子数组
- {{< lc "1044" >}} 最长重复子串
- {{< lc "1316" >}} 不同的循环子字符串
- {{< lc "1923" >}} 最长公共子路径

## 字典树

 [字典树 (Trie)](https://oi.wiki/string/trie/)

```python
# 基于哈希表
T = lambda: defaultdict(T)
trie = T()
for w in words:
	reduce(dict.__getitem__, w, trie)['#'] = w
```

- {{< lc "0208" >}} 实现 Trie (前缀树)
- {{< lc "0212" >}} 单词搜索 II
- {{< lc "0588" >}} 设计内存文件系统
- {{< lc "0642" >}} 设计搜索自动补全系统
- {{< lc "0745" >}} 前缀和后缀搜索

01字典树
- {{< lc "0421" >}} 数组中两个数的最大异或值
- {{< lc "1707" >}} 与数组中元素的最大异或值
- {{< lc "1938" >}} 查询最大基因差

## AC自动机

- [AC自动机](https://oi.wiki/string/ac-automaton/)


