import React from 'react';

/* date and time for last_watered in milliseconds
used in UnitContent.js and AddUnit.js */
 function CurrentTime() {
    const timeNow = new Date();
    const dateNow = timeNow.getTime();
    return dateNow;
}

export default CurrentTime;