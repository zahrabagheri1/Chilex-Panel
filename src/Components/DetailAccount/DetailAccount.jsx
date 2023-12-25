import React from 'react';
import './DetailAccount.scss';
import user from '../../Assets/image/user.jpg';
const props = {
    name: 'Zohre',
    img: user,
    status: true,
    lastseen: '2 hours ago',
    data: {
        email: 'zahar@gamil.com',
        phone: '093154869',
        age: 23,
        tickets: 52,
        created: 'June 15 2020',
        role: 'Gold',
        payment: '452',
        fulname: 'zahra ganbari',
    }
}
function DetailAccount() {
    return (
        <div className='detailAccount'>

            <div className="detailAccountImgBox">
                <img className='detailAccountImg' src={props.img ? props.img : user} alt={`img of user ${props.name}`} />
                <div className="detailAccountName">{props.data.fulname}</div>
            </div>
            <div className="detailAccountTitle">Informations</div>
            <div className="detailAccountInformation">
                {
                    Object.entries(props.data).map(([key, value], index) => (
                        <div className="detailAccountifo">
                            <div className="detailAccountSubTitle">{key}:</div>
                            <div className="detailAccountText">{value}</div>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default DetailAccount