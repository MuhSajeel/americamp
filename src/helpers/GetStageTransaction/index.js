export default (Transactions, id) => {
    const res = Transactions.find(({ stage_id }) => stage_id === id);
    return res || null;
}