import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaCalculatorDapp } from "../target/types/solana_calculator_dapp";

describe("solana-calculator-dapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .SolanaCalculatorDapp as Program<SolanaCalculatorDapp>;

  it("Is account created!", async () => {
    const calculatorAccount = anchor.web3.Keypair.generate();
    const message = "Welcome to Solana Calculator";

    const tx = await program.methods
      .create(message)
      .accounts({ calculator: calculatorAccount.publicKey })
      .signers([calculatorAccount])
      .rpc();

    console.log("Your transaction signature", tx);

    const createAccount = await program.account.calculator.fetch(
      calculatorAccount.publicKey
    );

    // make sure it's persisted correctly
    assert.equal(createAccount.greeting, message);
  });
});
