import mongoose from "mongoose";

interface TokenAttributes {
    token: string;
    fileId: string;
}

interface TokenDoc extends mongoose.Document {
    token: string;
    fileId: string;
}

interface TokenModel extends mongoose.Model<TokenDoc> {
    build(attributes: TokenAttributes): TokenDoc;
}

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

tokenSchema.statics.build = (attributes: TokenAttributes) => {
    return new Token(attributes);
};

const Token = mongoose.model<TokenDoc, TokenModel>('Token', tokenSchema);

export { Token };