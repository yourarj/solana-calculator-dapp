import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaCalculatorDapp } from "../target/types/solana_calculator_dapp";

describe("solana-calculator-dapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .SolanaCalculatorDapp as Program<SolanaCalculatorDapp>;
  const calculatorAccount = anchor.web3.Keypair.generate();

  it("Is account created!", async () => {
    const message = "Welcome to Solana Calculator";

    const tx = await program.methods
      .create(message)
      .accounts({ calculator: calculatorAccount.publicKey })
      .signers([calculatorAccount])
      .rpc();

    console.log("Your transaction signature", tx);

    const calculatorAcc = await program.account.calculator.fetch(
      calculatorAccount.publicKey
    );

    // make sure it's persisted correctly
    assert.equal(message, calculatorAcc.greeting);
  });

  it("Numbers added correctly", async () => {
    const tx = await program.methods
      .add(new anchor.BN(100), new anchor.BN(500))
      .accounts({ calculator: calculatorAccount.publicKey })
      .rpc();

    console.log("Your addition transaction signature", tx);

    const calculatorAcc = await program.account.calculator.fetch(
      calculatorAccount.publicKey
    );

    // make sure it's persisted correctly
    assert.ok(new anchor.BN(600).eq(calculatorAcc.result));
  });
});
