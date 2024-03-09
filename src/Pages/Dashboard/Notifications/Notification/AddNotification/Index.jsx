import React from 'react'

function Index() {
  return (
    <div className='modalNotif'>
    {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
    }
    <div className="mainNotif">
        <div className="titleNotif">Ban User</div>
        <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <Input name={'userId'} type={'text'} title={'userId'} changeInputValue={updateInputData} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <SelectOption readOnly={false} name={'type'} defaultValue={'type'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'Player name is offensive' },
                        { id: 1, status: 'inactive' },
                        { id: 1, status: 'chating' },
                        { id: 1, status: 'voice chat is offensive' },
                    ]}
                />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <Input name={'description'} type={'text'} title={'description'} changeInputValue={updateInputData} />
            </div>
        </div>

        <div className="notifbtn">
            <ButtonActionGray title={'Cancel'} handler={handlerClose} />
            <ButtonActionBlue title={'Ban User'} handler={notif} />
        </div>


    </div>
</div>
  )
}

export default Index