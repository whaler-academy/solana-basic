# Solana 编程第一章 基础编程
### 安装
1. 安装Solana客户端
详细安装文档：
https://docs.solanalabs.com/cli/install
```
sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"
solana --version
```
2. 安装Rust https://rustup.rs/
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
3. 安装SPL客户端
```
cargo install spl-token-cli
```
4. 配置RPC节点
- 查询当前配置
```
$ solana config get
Config File: ${HOME}/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: ${HOME}/.config/solana/id.json
```
- 设置RPC节点地址
```
solana config set --url https://api.devnet.solana.com
```
5. 克隆教学仓库
```
git clone https://github.com/Fankouzu/solana-basic.git
npm install
```
------------
## 第一章 基础编程

### 1. 创建密钥对
- JS
```
npm run demo scripts/1.Keypair.ts
```
- CLI
```
solana-keygen pubkey
```

### 2. 幸运账号
```
npm run demo scripts/2.LuckyAccount.ts
```

### 3. 创建支付账号
```
npm run demo scripts/3.Payer.ts
```
### 4. 获取最小租金豁免数额
[./scripts/4.MinimumBalanceForRentExemption.ts](./scripts/4.MinimumBalanceForRentExemption.ts)
### 5. 创建账号IX
[./scripts/5.CreateAccountIx.ts](./scripts/5.CreateAccountIx.ts)
### 6. 创建发送交易
[./scripts/6.Transfer.ts](./scripts/6.Transfer.ts)
### 7. 创建版本化交易
[./scripts/7.CreateVersionedTx.ts](./scripts/7.CreateVersionedTx.ts)
### 8. 签署交易
[./scripts/8.SignTx.ts](./scripts/8.SignTx.ts)
### 9. 发送交易
[./scripts/8.SendTx.ts](./scripts/9.SendTx.ts)
### 10. 发送简单交易
```
npm run demo scripts/10.SendSimpleTx.ts
```
### 11. 发送复杂交易
```
npm run demo scripts/11.SendComplexTx.ts
```
### 12. 创建Token
```
npm run demo scripts/12.CreateMint.ts
```
### 13. ATA账户
[./scripts/13.ATA.ts](./scripts/13.ATA.ts)
### 14. 铸造Token
```
npm run demo scripts/14.MintTokens.ts
```
### Token Cli 
  1. 创建Token
```
spl-token create-token
```
  2. 查询总量
```
spl-token supply AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM
```
  3. 创建账户
```
spl-token create-account AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM
```
  4. 查询余额
```
spl-token balance AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM
```
  5. 铸造Token
```
spl-token mint AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM 100
```


### 15. 查询账户下所有Token
```
npm run demo scripts/15.GetTokenAccountsByOwner.ts
```
### 16. 包装SOL

### 17. 解包装SOL

### 18. 发送Token

### 19. 创建NFT

### 20. 多签用例

### 21. 使用多签铸造Token

### 22. 离线签名

# Solana编程第二章 高级Token应用
### FT
### NFT
# Solana编程第三章 Defi应用
### Swap交易所
### Lending借贷平台
### Staking质押