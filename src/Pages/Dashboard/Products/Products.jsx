import React, { useState } from 'react';
import './Products.scss';
import Select from '../../../Components/Select/Select';
import Input from '../../../Components/Input/Input';

function Products() {
    const [value, setValue] = useState(1);

    return (
        <div>
            <from>
                <Select
                    dataKey="id"
                    type="price"
                    textField="price type"
                    value={value}
                    defaultValue={1}
                    onChange={(nextValue) => setValue(nextValue.id)}
                    data={[
                        { id: 0, price: "gemBundle" },
                        { id: 1, price: "coinBundle" },
                        { id: 2, price: "Item" },
                    ]}
                />
                <Input type="text" />
                <Input type="text" />
            </from>
        </div>
    );
}

export default Products;

// {
//     "stuffType": 0,
//     "name": "string",
//     "sku": "string",
//     "amount": 0,
//     "image": "string",
//     "prices": [
//       "string"
//     ],
//     "expireTime": "string",
//     "game": 0,
//     "status": true
//   }


