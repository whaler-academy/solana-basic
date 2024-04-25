import { Keypair } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction } from "@solana/spl-token";
import { connection, payer, FgGreen, FgYellow } from "./lib/vars";
import { buildTransaction, savePublicKeyToFile } from "./lib/helpers";
import { CreateAccountIx } from "./5.CreateAccountIx";
import { SendTx } from "./9.SendTx";
import { CreateTokenWithMetadata } from "./13.CreateTokenWithMetadata";

// 定义Token设置
const tokenConfig = {
  // 小数点精度
  decimals: 2,
  // Token名称
  name: "Test Token 1",
  // Token缩写
  symbol: "TT",
  // 链接uri
  uri: "https://thisisnot.arealurl/info.json",
};

(async () => {
  console.log(`${FgGreen}Payer address: ${FgYellow + payer.publicKey.toBase58()}`);
  const tokenKeypair = Keypair.generate();
  console.log(`${FgGreen}Token Keypair address: ${FgYellow + tokenKeypair.publicKey.toBase58()}`);
  
  // 1. 创建Token账户的ix
  const createMintAccountInstruction = await CreateAccountIx(
    payer,
    tokenKeypair.publicKey,
    connection,
    TOKEN_PROGRAM_ID,
    MINT_SIZE,
  );
  // 2. 初始化Token账户
  const initializeMintInstruction = createInitializeMint2Instruction(
    tokenKeypair.publicKey, // Token账户地址
    tokenConfig.decimals, //Token精度
    payer.publicKey, // 铸造账户
    payer.publicKey, //冻结权限
  );

  // 3. 创建元数据账户
  const createMetadataInstruction = await CreateTokenWithMetadata(
    payer, //支付账户
    tokenKeypair.publicKey, // Token账户地址
    tokenConfig.name, // Token名称
    tokenConfig.symbol, // Token缩写
    tokenConfig.uri, // Token uri
  );
  // 4. 创建交易
  const tx = await buildTransaction({
    connection, // 网络链接
    payer: payer.publicKey, // 支付账户地址
    signers: [payer, tokenKeypair], // 签名人
    instructions: [ // 3个交易
      createMintAccountInstruction,
      initializeMintInstruction,
      createMetadataInstruction,
    ],
  });

  // 保存Token账户地址
  savePublicKeyToFile("token", tokenKeypair.publicKey);
  await SendTx(tx);
})();
