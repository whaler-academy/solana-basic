import { FgGreen, FgYellow, TokenMint, connection, payer } from "./lib/vars";
import { buildTransaction } from "./lib/helpers";

import { SendTx } from "./9.SendTx";
import { UpdateTokenMetadata } from "./17.UpdateTokenMetadata";
// 更新Token元数据
(async () => {
  console.log(`${FgGreen}Payer address: ${FgYellow + payer.publicKey.toBase58()}`);
  // 读取保存的Token地址
  let tokenMint = TokenMint();

  //////////////////////////////////////////////////////////////////////////////

  // Token的新设置
  const tokenConfig = {
    name: "New Super Sweet Token",
    symbol: "nSST",
    uri: "https://thisisnot.arealurl/new.json",
  };

  /**
   * 构建在链上存储代币元数据的指令
   * - 派生元数据地址
   * - 创建包含实际元数据的指令
   */
  const updateMetadataInstruction = await UpdateTokenMetadata(
    payer,
    tokenMint,
    tokenConfig.name,
    tokenConfig.symbol,
    tokenConfig.uri,
  );
  /**
   * 构建发送到区块链的交易
   */
  const tx = await buildTransaction({
    connection,
    payer: payer.publicKey,
    signers: [payer],
    instructions: [updateMetadataInstruction],
  });

  await SendTx(tx);
})();
