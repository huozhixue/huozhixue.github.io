# 0468：验证IP地址（★）


> <u>**[力扣第 468 题](https://leetcode.cn/problems/validate-ip-address/)**</u>

## 题目

<p>给定一个字符串 <code>queryIP</code>。如果是有效的 IPv4 地址，返回 <code>"IPv4"</code> ；如果是有效的 IPv6 地址，返回 <code>"IPv6"</code> ；如果不是上述类型的 IP 地址，返回 <code>"Neither"</code> 。</p>

<p><strong>有效的IPv4地址</strong> 是 <code>“x1.x2.x3.x4”</code> 形式的IP地址。 其中 <code>0 &lt;= x<sub>i</sub> &lt;= 255</code> 且 <code>x<sub>i</sub></code> <strong>不能包含</strong> 前导零。例如: <code>“192.168.1.1”</code> 、 <code>“192.168.1.0”</code> 为有效IPv4地址， <code>“192.168.01.1”</code> 为无效IPv4地址; <code>“192.168.1.00”</code> 、 <code>“192.168@1.1”</code> 为无效IPv4地址。</p>

<p><strong>一个有效的IPv6地址 </strong>是一个格式为<code>“x1:x2:x3:x4:x5:x6:x7:x8”</code> 的IP地址，其中:</p>

<ul>
<li><code>1 &lt;= x<sub>i</sub>.length &lt;= 4</code></li>
<li><code>x<sub>i</sub></code> 是一个 <strong>十六进制字符串</strong> ，可以包含数字、小写英文字母( <code>'a'</code> 到 <code>'f'</code> )和大写英文字母( <code>'A'</code> 到 <code>'F'</code> )。</li>
<li>在 <code>x<sub>i</sub></code> 中允许前导零。</li>
</ul>

<p>例如 <code>"2001:0db8:85a3:0000:0000:8a2e:0370:7334"</code> 和 <code>"2001:db8:85a3:0:0:8A2E:0370:7334"</code> 是有效的 IPv6 地址，而 <code>"2001:0db8:85a3::8A2E:037j:7334"</code> 和 <code>"02001:0db8:85a3:0000:0000:8a2e:0370:7334"</code> 是无效的 IPv6 地址。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>queryIP = "172.16.254.1"
<strong>输出：</strong>"IPv4"
<strong>解释：</strong>有效的 IPv4 地址，返回 "IPv4"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
<strong>输出：</strong>"IPv6"
<strong>解释：</strong>有效的 IPv6 地址，返回 "IPv6"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>queryIP = "256.256.256.256"
<strong>输出：</strong>"Neither"
<strong>解释：</strong>既不是 IPv4 地址，又不是 IPv6 地址
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>queryIP</code> 仅由英文字母，数字，字符 <code>'.'</code> 和 <code>':'</code> 组成。</li>
</ul>


**相似问题：**
- [0751：IP 到 CIDR（2025 分）](/leetcode/0751)
- [2299：强密码检验器 II（1241 分）](/leetcode/2299)


## 分析

先分割，再对每一段判断即可。

## 解答


```python
class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        A = queryIP.split('.')
        def check(a):
            return a.isdigit() and 0<=int(a)<=255 and (a=='0' or a[0]!='0')
        if len(A)==4 and all(check(a) for a in A):
            return 'IPv4'
        A = queryIP.split(':')
        def check(a):
            return re.match('[0-9a-fA-F]{1,4}$',a)
        if len(A)==8 and all(check(a) for a in A):
            return 'IPv6'
        return 'Neither'
```
37 ms
