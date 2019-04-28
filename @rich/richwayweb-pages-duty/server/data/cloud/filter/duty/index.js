var FormData = require('form-data');

function FilterAddDutyParametersFun(ctx) {
    const queryInfo = ctx._queryInfo;

    queryInfo.lead = queryInfo.lead[0];
    queryInfo.viceLead = queryInfo.viceLead[0];
    return queryInfo;

    // var form = new FormData();
    // form.append('my_field', 'my value');
    // console.log(666666, form);


    // const arr = [];
    // for (let key in queryInfo) {
    //     if (key !== `lead` || key !== `viceLead` || key !== `member` || key !== `driver`) {
    //         arr.push(`${key}=${queryInfo[key]}`);
    //         //form.append(key, queryInfo[key]);
    //     }
    // }
    // console.log(333333, form);

    // const lead = queryInfo.lead || [];
    // for (const item of lead) {
    //     arr.push(`lead=${item}`);
    //     form.append(`lead`, item);
    // }

    // const viceLead = queryInfo.viceLead || [];
    // for (const item of viceLead) {
    //     arr.push(`viceLead=${item}`);
    //     form.append(`viceLead`, item);
    // }

    // const member = queryInfo.member || [];
    // for (const item of member) {
    //     arr.push(`member=${item}`);
    //     form.append(`member`, item);
    // }

    // const driver = queryInfo.driver || [];
    // for (const item of driver) {
    //     arr.push(`driver=${item}`);
    //     form.append(`driver`, item);
    // }

    // // return arr.join(`&`);
    // console.log(222222, form);
    // return form;

}


module.exports = {
    FilterAddDutyParametersFun
};