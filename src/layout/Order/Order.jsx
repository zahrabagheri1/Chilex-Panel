import React from 'react';
import Modal from '../Modal/Modal';

function Order(props) {
    return (
        <div>
            <Table data={props.data} sort={props.list} action={props.action} modalhandler={props.modal} />

            <div>
                <Modal />
            </div>
        </div>
    );
}

export default Order;
