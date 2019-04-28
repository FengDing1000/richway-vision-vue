class Dept {
    constructor(info = {}) {
        this.deptCd = info.deptCd || ``;
        this.deptNm = info.deptNm || ``;
        this.deptParent = info.deptParent || ``;
        this.addr = info.addr || ``;
        // 机构
        this.orgShnm = info.orgShnm || ``;
        // 法人代表
        this.lrNm = info.lrNm || ``;
        // 机构规格
        this.orgScal = info.orgScal || ``;
        this.orgScalStr = info.orgScalStr || ``;
        // 隶属关系
        this.menb = info.menb || ``;
        // 网址
        this.web = info.web|| ``;
        // 邮箱
        this.eMail = info.eMail || ``;
        // 邮编
        this.zip = info.zip || ``;
        // 办公电话
        this.tel = info.tel || ``
        // 传真电话
        this.fax = info.fax || ``;
        this.updDt = info.updDt || ``;
        this.crtDt = info.crtDt || ``;
        this.adlCd = info.adlCd || ``;
    }
}

export default Dept;
