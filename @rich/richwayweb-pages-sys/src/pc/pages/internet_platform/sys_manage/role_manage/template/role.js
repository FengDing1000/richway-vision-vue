class Role {
    constructor(info = {}) {
        this.roleId = info.roleId || ``;
        this.roleCode = info.roleCode || ``;
        this.roleName = info.roleName || ``;
        this.roleDesc = info.roleDesc || ``;
        this.roleOrder = info.roleOrder || ``;
        this.updDt = info.updDt || ``;
        this.crtDt = info.crtDt || ``;
    }
}


export default Role;
