/**

 @Name：richwayui 项目的表单数据接收
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const KoaBody = require(`koa-body`);

module.exports = app => {
    try {
        app.use(KoaBody({
            /**
             * jsonLimit,JSON 数据体的大小限制,String / Integer,1mb
             * formLimit,限制表单请求体的大小,String / Integer,56kb
             * textLimit,限制 text body 的大小,String / Integer,56kb
             * encoding,表单的默认编码,String,utf-8
             * multipart,是否支持,multipart-formdate的表单,Boolean,false
             * urlencoded,是否支持,urlencoded的表单,Boolean,true
             * text,是否解析,text/plain的表单,Boolean,true
             * json,是否解析,json 请求体,Boolean,true
             * jsonStrict,是否使用,json 严格模式，true 会只处理数组和对象,Boolean,true
             * formidable,配置更多的关于,multipart 的选项
             * onError,错误处理,Function,function(){}
             */
            multipart: true, // 支持文件上传
            formidable: {
                /**
                 * maxFields限制字段的数量,Integer,1000
                 * maxFieldsSize限制字段的最大大小,Integer,2 * 1024 * 1024
                 * uploadDir文件上传的文件夹,String,os.tmpDir()
                 * keepExtensions保留原来的文件后缀,Boolean,false
                 * hash如果要计算文件的 hash，则可以选择 md5/sha1,String,false
                 * multipart是否支持多文件上传,Boolean,true
                 * onFileBegin文件上传前的一些设置操作,Function,function(name,file){}
                 */
                uploadDir: path.join(process.cwd(), _richwayKoaConfig.uploadFileDir), // 设置文件上传目录
                keepExtensions: true, // 保持文件的后缀
                maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
                onFileBegin: (name, file) => { // 文件上传前的设置
                    _richwayKoaLog.logInfo(`name: ${name}`);
                    _richwayKoaLog.logInfo(file);
                }
            },
            onError: err => {
                _richwayKoaLog.logError(`KoaBody has err: ${JSON.stringify(err)}`);
            }
        }));

        _richwayKoaLog.logInfo(`Body module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Body module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
