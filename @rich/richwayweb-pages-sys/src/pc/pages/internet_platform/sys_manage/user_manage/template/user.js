class User {
    constructor(info ={}) {
        this.userAccount = info.userAccount || ``;
        this.userName = info.userName || ``;
        this.mobileNo = info.mobileNo || ``;
        this.email = info.email || ``;
        this.sex = info.sex || `1`;
        this.qq = info.qq || ``;
        this.address = info.address || ``;
        this.birthday = info.birthday || ``;
        this.fax = info.fax || ``;

        this.adCd = info.adCd || ``;
        this.adCdNm = info.adCdNm || info.adnm || ``;

        this.layout = info.layout || ``;

        this.isUser = info.isUser || ``;

        this.nt = info.nt || ``;
    }
}

export default User;
