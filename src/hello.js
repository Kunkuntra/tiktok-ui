import React from 'react'
function Hello(){
    console.log('re-render');
    return (
        <h1>Xin chao anh em</h1>
    )

}
export default React.memo(Hello)
