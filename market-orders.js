if (spawn.room.terminal && (Game.time % 10 == 0)) {
    if (spawn.room.terminal.store[RESOURCE_ENERGY] &gt;= 2000 && spawn.room.terminal.store[RESOURCE_HYDROGEN] &gt;= 2000) {
        var orders = Game.market.getAllOrders(order =&gt; order.resourceType == RESOURCE_HYDROGEN &&
                                              order.type == ORDER_BUY &&
                                              Game.market.calcTransactionCost(200, spawn.room.name, order.roomName) &lt; 400);
        console.log('Hydrogen buy orders found: ' + orders.length);
        orders.sort(function(a,b){return b.price - a.price;});
        console.log('Best price: ' + orders[0].price);
        if (orders[0].price &gt; 0.7) {
            var result = Game.market.deal(orders[0].id, 200, spawn.room.name);
            if (result == 0) {
                console.log('Order completed successfully');
            }
        }
    }
}
