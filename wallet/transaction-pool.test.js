const Transaction = require('./transaction');
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('TransactionPool', ()=>{

    let tp,wallet,recipient;

    beforeEach(()=>{
        tp = new TransactionPool();
        wallet=new Wallet();
        transaction=Transaction.newTransaction(wallet,'tpool',30);
        tp.updateOrAddTransaction(transaction);
    });

    it('adds a transation to the pool',()=>{
        expect(tp.transactions.find(t=>t.id===transaction.id)).toEqual(transaction);
    });

    it('updates a transation in the pool',()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet,'foo-address',40);
        tp.updateOrAddTransaction(newTransaction);
        expect(JSON.stringify(tp.transactions.find(t=>t.id===newTransaction.id))).not.toEqual(oldTransaction);
    });

});