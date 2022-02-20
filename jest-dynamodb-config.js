module.exports = {
    tables: [
        {
            TableName: 'Admins-Table',
            KeySchema: [
                {
                    AttributeName: 'email',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'email',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};
