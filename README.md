# minetrix
simple minecraft server widget primarily for matrix with CLI/Web UI

<table>
<tr>
<td style="width: 50%">Web UI in Svelte</td>
<td>CLI</td>
</tr>
<tr>
<td>

![image](https://user-images.githubusercontent.com/73352734/153021745-fb36a260-5aba-4039-95ea-e7f0016ad8a1.png)
  
</td>
<td>

```
❯ curl localhost/cli/mc.myserver.tld
mc.myserver.tld (1.18, 2/20):
⬡ Player1     
⬡ Player2
```

</td></tr></table>

## installation/usage

- install node.js >= 16 and npm
- clone repo && cd into it
- run `npm i`
- run `PORT=[port here] node index`
- point matrix widget to `https://[public url]/?mc.server.tld`
  - or go to the public URL in a browser,
  - or `curl https://[public url]/cli`
