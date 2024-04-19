export class ApplicationErrors extends Error{
    constructor(message, code){
        super(message);
        this.code = code;
    }
}