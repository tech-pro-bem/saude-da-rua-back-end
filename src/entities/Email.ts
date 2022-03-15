type TEmailPorps = {
    to: string;
    subject: string;
    htmlMessage: string;
};

class Email {
    public readonly to: string;

    public readonly subject: string;

    public readonly html: string;

    constructor(props: TEmailPorps) {
        Object.assign(this, props);
    }
}

export default Email;
