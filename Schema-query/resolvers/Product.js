module.exports = {
    prizeWithDiscount(This) {
        if (This.discount) return (This.prize * (1 - This.discount)).toFixed(2);
        else return This.prize;
    }
};