const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', ()=>{

    let transaction,wallet,recipient,amount;

    beforeEach(()=>{
        wallet=new Wallet();
        amount=50;
        recipient='r3c1p13nt';
        transaction=Transaction.newTransaction(wallet,recipient,amount);
    });

    it('outputs the `amount` subtracted from the senders wallet balance',()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });
    
    it('outputs the `amount` added to the recipients wallet balance',()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });
    
    it('inputs the balance of the wallet',()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });
    
    it('validates a valid transaction',()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });
    
    it('invalidates a corrupt transaction',()=>{
        transaction.outputs[0].amount=5000000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });
    
    
    describe('Transaction amount exceeds senders balance', ()=>{
    
        beforeEach(()=>{
            amount=500000;
            transaction=Transaction.newTransaction(wallet,recipient,amount);
        });
        
          it('does not create the tansaction',()=>{
            expect(transaction).toEqual(undefined);
        });
        
    });
});