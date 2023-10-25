import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../Modal/Modal';

function Order(props) {
    return (
        <div>
            <ScrollContainer>
                <Table data={props.data} sort={props.list} action={props.action} modalhandler={props.modal} />
            </ScrollContainer>

            <div>
                <Modal/>
            </div>
        </div>
    );
}

export default Order;
