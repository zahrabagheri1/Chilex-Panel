
import React from "react";
 
function Chatroom(){


    return(
        <div className="chatboxbody">
              <div className="chatmessage">
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
              </div>
            </div>
    )
}

export default Chatroom ;