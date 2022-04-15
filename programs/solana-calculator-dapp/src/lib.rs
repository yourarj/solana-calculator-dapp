use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatorapp {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn create(ctx: Context<Create>, init_messge: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_messge;
        Ok(())
    }
}
